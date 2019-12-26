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
  const WithoutHydration = ({ forceHydration = false, ...props }) => {
    const rootRef = useRef(null);
    const [shouldHydrate, setShouldHydrate] = useState(undefined);

    useLayoutEffect(() => {
      if (shouldHydrate) return;
      const wasRenderedServerSide = !!rootRef.current.getAttribute(
        "data-no-hydrate"
      );
      setShouldHydrate(
        (!wasRenderedServerSide && !disableFallback) || forceHydration
      );
    });

    useLayoutEffect(() => {
      if (shouldHydrate || shouldHydrate === undefined || !onUpdate) return;
      onUpdate(props, rootRef.current);
    });

    if (!shouldHydrate)
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
