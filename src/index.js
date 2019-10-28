import React, { useState, useRef, useLayoutEffect } from "react";
import exenv from "exenv";

const isClientSide = exenv.canUseDOM;

const withoutHydrateServerSide = Component => props => (
    <section data-no-hydrate={true}>
        <Component {...props} />
    </section>
);

const withoutHydrateClientSide = ({
    onUpdate = null,
    disableFallback = false
}) => Component => props => {
    const rootRef = useRef(null);
    const [wasRenderedServerSide, setWasRenderedServerSide] = useState(
        undefined
    );

    useLayoutEffect(() => {
        setWasRenderedServerSide(
            !!rootRef.current.getAttribute("data-no-hydrate")
        );
    }, [rootRef]);

    useLayoutEffect(() => {
        if (!wasRenderedServerSide || !onUpdate) return;
        onUpdate(props, rootRef.current);
    });

    if (
        isClientSide &&
        (wasRenderedServerSide === undefined ||
            wasRenderedServerSide ||
            disableFallback)
    )
        return (
            <section
                ref={rootRef}
                dangerouslySetInnerHTML={{ __html: "" }}
                suppressHydrationWarning
            />
        );

    return <Component {...props} />;
};

const withoutHydrate = (options = {}) => {
    if (isClientSide) return withoutHydrateClientSide(options);

    return withoutHydrateServerSide;
};

export default withoutHydrate;
