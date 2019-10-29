# react-without-hydration

Skip the hydration step on the client for a component rendered server side.

## Install

#### npm

```
npm install react-without-hydration --save
```

#### yarn

```
yarn add react-without-hydration
```

## How to use

```js
import withoutHydration from "react-without-hydration";
import Card from "../Card";

const CardwithoutHydration = withoutHydration()(Card);

export default class App extends React.Component {
    render() {
        return <CardwithoutHydration title="my card" />;
    }
}
```

### What if my component is also used client side only ?

If the component isn't rendered server side, it will render and behave normally. You can disable this by setting `disableFallback` at `true`.

### What if I don't want to hydrate but still want to update the DOM ?

You can use `onUpdate` to update the DOM after a props update.

## Options

#### onUpdate

A function to update the DOM after a props update.

Receives `props` and `ref` which are the props passed to the component and its ref which represent the Dom node of the component.

```js
import withoutHydration from "react-without-hydration";
import Card from "../Card";

const CardwithoutHydration = withoutHydration({
    onUpdate: ({ title }, ref) => {
        ref.getElementsByClassName("title")[0].innerHTML = label;
    }
})(Card);
```

#### disableFallback

A boolean set at `false` by default.

Allows you to disable the server-side rendering check, which means that the component will **never be rendered**, even if it has not been rendered on the server side. Can be usefull if you don't render a component wrapped by `withoutHydration` server side, but you do client side. Be cautious.

```js
import withoutHydration from "react-without-hydration";
import Card from "../Card";

const CardwithoutHydration = withoutHydration({
    disableFallback: true
})(Card);
```
