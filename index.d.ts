import * as React from "react";
type ms = number;

interface PartialProps {
  minDistance: ms;
  timeout: ms;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
}

export type SwipeableProps = {
  children: (innerRef) => React.ReactNode;
} & Partial<PartialProps>;
