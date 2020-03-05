# swipeable-react

React component to handle swiping on touch devices.

## Install

```
yarn add --save swipeable-react
```

&nbsp;
## Usage

```jsx
import Swipeable from "swipeable-react";
...

class YourOwnComponent extends Component {
  render() {
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
}
```

&nbsp;
### Notes

 - Supports both vertical and horizontal swiping.

 - `<Swipeable />` accepts a single child which must be a function.

 - Multiple nested Swipeables are also supported.

 Note that in this scenario successful inner swipe will prevent parent swipeables. The preventing is done by calling `stopPropagation()` in the `touchend` handler.

&nbsp;
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

&nbsp;
## Development

The project is built on node `v10.15.1`. Set as default in `.nvmrc`
```
yarn
```

Tests run in jest watch mode:
```
yarn test
```

Deploying by:
```
yarn build
```
That will create `lib/` folder with `index.js` file containing transpiled code from the `src/Swipeable.js` component

&nbsp;
### Credits

Non-react [swiped-events](https://github.com/john-doherty/swiped-events)

&nbsp;
## License

[MIT License](LICENSE)
