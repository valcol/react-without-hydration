/**
 * @jest-environment node
 */

import React from "react";
import ReactDOMServer from "react-dom/server";
import withoutHydrate from "../../src";

const Component = ({ label }) => <div className="label">{label}</div>;

test("Render correctly server side ", () => {
    const ComponentWithoutHydrateSRR = withoutHydrate()(Component);

    const component = ReactDOMServer.renderToString(
        <ComponentWithoutHydrateSRR label="some content server side" />
    );
    expect(component).toMatchSnapshot();
});
