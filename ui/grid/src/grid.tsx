import { Component, IComponentPropsWithoutRef } from "@clutchd/component";
import { WithGap, WithGridCols } from "@clutchd/tailwind";
import * as React from "react";

/**
 * Type to define `Grid` element
 */
type IGrid = React.ElementRef<typeof Component.div>;

/**
 * Type to define `Grid` props
 */
interface IGridProps extends WithGridCols, WithGap {}

/**
 * Type to define `Grid` props with html attributes
 */
interface IGridHtmlProps
  extends IGridProps,
    IComponentPropsWithoutRef<typeof Component.div> {}

/**
 * `Grid` - A primitive grid container that powers various layouts
 * @param props `IGridProps` used to render this `Grid`
 * @returns `Grid` component
 */
const Grid = React.forwardRef<IGrid, IGridHtmlProps>(
  (
    {
      className,
      gap = "gap-6",
      gridCols = "grid-cols-1",
      gridColsSm,
      gridColsMd,
      gridColsLg,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Component.div
        className={[
          "grid h-full w-full",
          gap,
          gridCols,
          gridColsSm,
          gridColsMd,
          gridColsLg,
          className,
        ].join(" ")}
        ref={forwardedRef}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

export { Grid };
export type { IGrid, IGridProps, IGridHtmlProps };
