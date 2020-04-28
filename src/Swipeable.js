import { useEffect, useRef, forwardRef, useCallback } from "react";
import PropTypes from "prop-types";

const Swipeable = forwardRef(function Swipeable(props, ref) {
  const {
    children,
    minDistance = 20,
    maxDistance = Infinity,
    timeout = 500,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown
  } = props;

  const instanceRef = useRef({
    el: null,
    touchStartedTime: null,
    x: null,
    y: null,
    xDiff: null,
    yDiff: null
  });

  const handleTouchStart = useCallback(function handleTouchStart(e) {
    instanceRef.current.touchStartedTime = Date.now();
    instanceRef.current.x = e.touches[0].clientX;
    instanceRef.current.y = e.touches[0].clientY;
    instanceRef.current.xDiff = 0;
    instanceRef.current.yDiff = 0;
  }, []);

  const handleTouchMove = useCallback(function handleTouchMove(e) {
    if (instanceRef.current.x && instanceRef.current.y) {
      instanceRef.current.xDiff = instanceRef.current.x - e.touches[0].clientX;
      instanceRef.current.yDiff = instanceRef.current.y - e.touches[0].clientY;
    }
  }, []);

  const handleTouchEnd = useCallback(
    function handleTouchEnd(e) {
      const timeDiff = Date.now() - instanceRef.current.touchStartedTime;
      const xDiffAbs = Math.abs(instanceRef.current.xDiff);
      const yDiffAbs = Math.abs(instanceRef.current.yDiff);

      // Horizontal swipe
      if (xDiffAbs > yDiffAbs) {
        if (
          xDiffAbs >= minDistance &&
          xDiffAbs <= maxDistance &&
          timeDiff <= timeout
        ) {
          // Prevent other swipeables
          e.stopPropagation();
          if (instanceRef.current.xDiff > 0) {
            onSwipeLeft && onSwipeLeft();
          } else {
            onSwipeRight && onSwipeRight();
          }
        }
        // Vertical swipe
      } else {
        if (
          yDiffAbs >= minDistance &&
          yDiffAbs <= maxDistance &&
          timeDiff <= timeout
        ) {
          // Prevent other swipeables
          e.stopPropagation();
          if (instanceRef.current.yDiff > 0) {
            onSwipeUp && onSwipeUp();
          } else {
            onSwipeDown && onSwipeDown();
          }
        }
      }
    },
    [
      minDistance,
      maxDistance,
      timeout,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown
    ]
  );

  instanceRef.current = {
    ...instanceRef.current,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
  if (ref) {
    ref.current = instanceRef.current;
  }

  useEffect(() => {
    if (!instanceRef.current || !instanceRef.current.el) {
      return;
    }
    let { el } = instanceRef.current;
    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      instanceRef.current = null;
      if (ref) ref.current = null;
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, ref]);

  return children(el => {
    instanceRef.current.el = el;
  });
});

Swipeable.propTypes = {
  children: PropTypes.func.isRequired,
  minDistance: PropTypes.number,
  maxDistance: PropTypes.number,
  timeout: PropTypes.number,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
  onSwipeUp: PropTypes.func,
  onSwipeDown: PropTypes.func
};

Swipeable.displayName = "Swipeable";

export default Swipeable;
