/**
 * @jest-environment jsdom
 */

import React from "react";
import ReactDom from "react-dom";
import withoutHydration from "../../src";

const Component = ({ label }) => <div className="label">{label}</div>;
const SSRhtml =
    '<section data-no-hydrate="true"><div class="label">some content sever side</div></section>';

describe("With SSR", () => {
    test("Render correctly client side, no option ", () => {
        const elem = document.createElement("div");
        elem.innerHTML = SSRhtml;

        const ComponentwithoutHydrationClient = withoutHydration()(Component);

        ReactDom.hydrate(
            <ComponentwithoutHydrationClient label="some content client side" />,
            elem
        );

        expect(elem).toMatchSnapshot();
    });

    test("Render correctly client side, onUpdate ", () => {
        const elem = document.createElement("div");
        elem.innerHTML = SSRhtml;
        const onUpdate = jest.fn(({ label }, domNode) => {
            domNode.getElementsByClassName("label")[0].innerHTML = label;
        });

        const ComponentwithoutHydrationClient = withoutHydration({
            onUpdate
        })(Component);

        ReactDom.hydrate(
            <ComponentwithoutHydrationClient label="some content set client side via onUpdate" />,
            elem
        );

        expect(onUpdate).toHaveBeenCalled();
        expect(elem).toMatchSnapshot();
    });

    test("Render correctly client side, forceHydration ", () => {
        const elem = document.createElement("div");
        elem.innerHTML = SSRhtml;

        const ComponentwithoutHydrationClient = withoutHydration()(Component);

        ReactDom.hydrate(
            <ComponentwithoutHydrationClient
                label="some content client side"
                forceHydration
            />,
            elem
        );

        expect(elem).toMatchSnapshot();
    });
});

describe("Without SSR", () => {
    test("Render correctly client side, no option ", () => {
        const elem = document.createElement("div");

        const ComponentwithoutHydrationClient = withoutHydration()(Component);

        ReactDom.hydrate(
            <ComponentwithoutHydrationClient label="some content client side" />,
            elem
        );

        expect(elem).toMatchSnapshot();
    });

    test("Render correctly client side, onUpdate ", () => {
        const elem = document.createElement("div");
        const onUpdate = jest.fn();

        const ComponentwithoutHydrationClient = withoutHydration({
            onUpdate
        })(Component);

        ReactDom.hydrate(
            <ComponentwithoutHydrationClient label="some content client side" />,
            elem
        );

        expect(onUpdate).not.toHaveBeenCalled();
        expect(elem).toMatchSnapshot();
    });

    test("Render correctly client side, disableFallback at true", () => {
        const elem = document.createElement("div");

        const ComponentwithoutHydrationClient = withoutHydration({
            disableFallback: true
        })(Component);

        ReactDom.hydrate(
            <ComponentwithoutHydrationClient label="some content client side" />,
            elem
        );

        expect(elem).toMatchSnapshot();
    });
});
