<div align="center">
  <h1>
    <br/>
    <br/>
    ☔
    <br />
    react-without-hydration
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/react-without-hydration">
       <img src="https://img.shields.io/github/actions/workflow/status/valcol/react-without-hydration/main.yml" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/react-without-hydration">
       <img src="https://img.shields.io/bundlephobia/minzip/react-without-hydration" alt="dep size" />
    </a>
    <a href="https://www.npmjs.com/package/react-without-hydration">
      <img src="https://img.shields.io/npm/v/react-without-hydration" alt="version" />
    </a>
    <br />
  </sup>
   <h3>Skip the hydration step on the client for a component rendered server side.<h3>
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/react-without-hydration">react-without-hydration</a></pre>
  <pre>yarn add <a href="https://www.npmjs.com/package/react-without-hydration">react-without-hydration</a></pre>
  <br />
  <br />
</div>

## How to use

```js
import withoutHydration from "react-without-hydration";
import Card from "../Card";

const CardWithoutHydration = withoutHydration()(Card);

export default class App extends React.Component {
    render() {
        return <CardWithoutHydration title="my card" />;
    }
}
```

## FAQ

### What if my component is also used client side only ?

If the component isn't rendered server side, it will render and behave normally. You can disable this by setting `disableFallback` at `true`.

### What if I don't want to hydrate but still want to update the DOM ?

You can use `onUpdate` to update the DOM after a props update.

## Props

#### `forceHydration`

Pass `forceHydration` at true to force hydration even if the component was rendered server side.

```js
import withoutHydration from "react-without-hydration";
import Card from "../Card";

const CardWithoutHydration = withoutHydration()(Card);

export default class App extends React.Component {
    render() {
        return <CardWithoutHydration title="my card" forceHydration />;
    }
}
```

## Options

#### `onUpdate`

A function to update the DOM after a props update.

Receives `props` and `ref` which are the props passed to the component and its ref which represent the Dom node of the component.

```js
import withoutHydration from "react-without-hydration";
import Card from "../Card";

const CardWithoutHydration = withoutHydration({
    onUpdate: ({ title }, ref) => {
        ref.getElementsByClassName("title")[0].innerHTML = label;
    }
})(Card);
```

#### `disableFallback`

A boolean set at `false` by default.

Allows you to disable the server-side rendering check, which means that the component will **never be rendered**, even if it has not been rendered on the server side. Can be usefull if you don't render a component wrapped by `withoutHydration` server side, but you do client side. Be cautious.

```js
import withoutHydration from "react-without-hydration";
import Card from "../Card";

const CardWithoutHydration = withoutHydration({
    disableFallback: true
})(Card);
```
