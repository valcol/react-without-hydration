/**
 * @jest-environment node
 */

import React from "react";
import ReactDOMServer from "react-dom/server";
import withoutHydration from "../../src";

const Component = ({ label }) => <div className="label">{label}</div>;

test("Render correctly server side ", () => {
    const ComponentwithoutHydrationSRR = withoutHydration()(Component);

    const component = ReactDOMServer.renderToString(
        <ComponentwithoutHydrationSRR label="some content server side" />
    );
    expect(component).toMatchSnapshot();
});
