import React, { useState, useRef, useLayoutEffect } from "react";
import exenv from "exenv";

const isClientSide = exenv.canUseDOM;

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

const withoutHydrationServerSide = WrappedComponent => props => (
    <section data-no-hydrate={true}>
        <WrappedComponent {...props} />
    </section>
);

const withoutHydrationClientSide = ({
    onUpdate = null,
    disableFallback = false
}) => WrappedComponent => {
    const WithoutHydration = props => {
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

        return <WrappedComponent {...props} />;
    };

    WithoutHydration.displayName = `WithoutHydration(${getDisplayName(
        WrappedComponent
    )})`;

    return WithoutHydration;
};
const withoutHydration = (options = {}) => {
    if (isClientSide) return withoutHydrationClientSide(options);

    return withoutHydrationServerSide;
};

export default withoutHydration;
