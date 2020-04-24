// Based on https://github.com/john-doherty/swiped-events
import { PureComponent } from "react";
import PropTypes from "prop-types";

// TODO: Rewrite using Hooks
export default class Swipeable extends PureComponent {
  constructor(props) {
    super(props);

    this.el = null;
    this.touchStartedTime = null;
    this.x = null;
    this.y = null;
    this.xDiff = null;
    this.yDiff = null;

  }

  componentDidMount() {
    this.el.addEventListener("touchstart", this.handleTouchStart);
    this.el.addEventListener("touchmove", this.handleTouchMove);
    this.el.addEventListener("touchend", this.handleTouchEnd);
  }

  componentWillUnmount() {
    this.el.removeEventListener("touchstart", this.handleTouchStart);
    this.el.removeEventListener("touchmove", this.handleTouchMove);
    this.el.removeEventListener("touchend", this.handleTouchEnd);
  }

  handleTouchStart = (e) => {
    this.touchStartedTime = Date.now();
    this.x = e.touches[0].clientX;
    this.y = e.touches[0].clientY;
    this.xDiff = 0;
    this.yDiff = 0;
  }

  handleTouchMove = (e) => {
    if (this.x && this.y) {
      this.xDiff = this.x - e.touches[0].clientX;
      this.yDiff = this.y - e.touches[0].clientY;
    }
  }

  handleTouchEnd = (e) => {
    const {
      minDistance = 20,
      maxDistance = Infinity,
      timeout = 500,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown
    } = this.props;

    const timeDiff = Date.now() - this.touchStartedTime;
    const xDiffAbs = Math.abs(this.xDiff);
    const yDiffAbs = Math.abs(this.yDiff);

    // Horizontal swipe
    if (xDiffAbs > yDiffAbs) {
      if (
        xDiffAbs >= minDistance &&
        xDiffAbs <= maxDistance &&
        timeDiff <= timeout
      ) {
        // Prevent other swipeables
        e.stopPropagation();
        if (this.xDiff > 0) {
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
        if (this.yDiff > 0) {
          onSwipeUp && onSwipeUp();
        } else {
          onSwipeDown && onSwipeDown();
        }
      }
    }
  }

  render() {
    const { children } = this.props;

    return children(el => {
      this.el = el;
    });
  }
}

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
