/**
 * @jest-environment jsdom
 */

import React from "react";
import ReactDom from "react-dom";
import withoutHydrate from "../../src";

const Component = ({ label }) => <div className="label">{label}</div>;
const SSRhtml =
    '<section data-no-hydrate="true"><div class="label">some content sever side</div></section>';

test("Render correctly client side, with SSR, no option ", () => {
    const elem = document.createElement("div");
    elem.innerHTML = SSRhtml;

    const ComponentWithoutHydrateClient = withoutHydrate()(Component);

    ReactDom.hydrate(
        <ComponentWithoutHydrateClient label="some content client side" />,
        elem
    );

    expect(elem).toMatchSnapshot();
});

test("Render correctly client side, with SSR, onUpdate ", () => {
    const elem = document.createElement("div");
    elem.innerHTML = SSRhtml;

    const ComponentWithoutHydrateClient = withoutHydrate({
        onUpdate: ({ label }, domNode) => {
            domNode.getElementsByClassName("label")[0].innerHTML = label;
        }
    })(Component);

    ReactDom.hydrate(
        <ComponentWithoutHydrateClient label="some content set client side via onUpdate" />,
        elem
    );

    expect(elem).toMatchSnapshot();
});

test("Render correctly client side, without SSR, no option ", () => {
    const elem = document.createElement("div");

    const ComponentWithoutHydrateClient = withoutHydrate({
        onUpdate: ({ label }, domNode) => {
            domNode.getElementsByClassName("label")[0].innerHTML = label;
        }
    })(Component);

    ReactDom.hydrate(
        <ComponentWithoutHydrateClient label="some content client side" />,
        elem
    );

    expect(elem).toMatchSnapshot();
});

test("Render correctly client side, without SSR, disableFallback at true", () => {
    const elem = document.createElement("div");

    const ComponentWithoutHydrateClient = withoutHydrate({
        disableFallback: true
    })(Component);

    ReactDom.hydrate(
        <ComponentWithoutHydrateClient label="some content client side" />,
        elem
    );

    expect(elem).toMatchSnapshot();
});
