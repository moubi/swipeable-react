<div align="center">
<h1>SwipeableReact</h1>

**Compact react component to detect swiping on touch devices**

[![moubi](https://img.shields.io/circleci/build/gh/moubi/swipeable-react?label=circleci&style=flat-square)](https://circleci.com/gh/moubi/swipeable-react) [![moubi](https://img.shields.io/npm/v/swipeable-react?style=flat-square)](https://www.npmjs.com/package/swipeable-react) [![moubi](https://img.shields.io/github/license/moubi/swipeable-react?style=flat-square)](LICENSE)

Detecting horizontal/vertical swiping &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; What you could achieve &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<img alt="A preview what swipeable-react is for" src="src/assets/swipeable_react_preview.gif" width="300" height="424" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img alt="A preview of what can be achieved with swipeable-react" src="src/assets/product_card_preview.gif" width="299" height="424" />

[Live demo for touch!](https://u49lp.csb.app/) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Live demo for touch!](https://htntm.csb.app/)

[That example's codesandbox](https://codesandbox.io/s/swipeable-view-u49lp?fontsize=14&hidenavigation=1&theme=dark) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [That example's codesandbox](https://codesandbox.io/s/swipeable-product-card-htntm?fontsize=14&hidenavigation=1&theme=dark)
</div>

## Install
```
yarn add --save swipeable-react
```

## Usage
```jsx
import Swipeable from "swipeable-react";
...

function YourOwnComponent(props) {
  return (
    <Swipeable
      onSwipeLeft={() => { console.log("swiped left"); }}
      onSwipeRight={() => { console.log("swiped right"); }}
    >
      {innerRef => (
        <div ref={innerRef}>
          I will detect swiping!
        </div>
      )}
    </Swipeable>
  );
}
```
Then it's **up to you** on how to react on these swiping events.

## API
| Prop          | Type          | Default  | Description |
| ------------- | ------------- | -------- | ----------- |
| children      | function      |          | Function that passes the ref down to the DOM element which will get touch events attached to. |
| minDistance   | number        | 20       | min distance in px between touchstart and touchend |
| maxDistance   | number        | Infinity | max distance in px between touchstart and touchend |
| timeout       | number        | 500      | the time in ms between touchstart and touchend     |
| onSwipeLeft   | function      |          | handler for successful swipe left                  |
| onSwipeRight  | function      |          | handler for successful swipe right                 |
| onSwipeUp     | function      |          | handler for successful swipe up                    |
| onSwipeDown   | function      |          | handler for successful swipe down                  |

  \* All props are optional except the **children**.

### Notes
 - Supports both vertical and horizontal swiping.
 - Uses `touchstart`, `touchmove` and `touchend` events
 - Multiple nested Swipeables are supported.

 In the last scenario successful nested swipe will prevent triggering parent swipeables. That is done by calling `stopPropagation()` in the `touchend` handler.

## Development
The code is built on node `v10.15.1`. Set as default in `.nvmrc` for nvm users.
```
nvm use
yarn
```

Tests run in jest --watch mode:
```
yarn test
```

Deploying by:
```
yarn build
```
That will create a `lib/` folder with `index.js` file containing transpiled code from the `src/Swipeable.js` component

## Credits
Non-react [swiped-events](https://github.com/john-doherty/swiped-events) by [John Doherty](https://github.com/john-doherty)

[Product card design](https://codepen.io/virgilpana/pen/RNYQwB) by [Virgil Pana](https://dribbble.com/virgilpana)

## License
[MIT License](LICENSE)
