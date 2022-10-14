import {
  Component,
  IComponent,
  ReactPropsWithoutRef,
} from "@clutchd/component";
import { clsx } from "@clutchd/clsx";
import { BuildStyle, ILayoutProps } from "./layout";

/**
 * Type to define `Container` component
 */
type IContainer = typeof Container;

/**
 * Type to define `Container` props
 */
interface IContainerProps
  extends ILayoutProps,
    ReactPropsWithoutRef<IComponent["div"]> {}

/**
 * `Container` - A generic flex container used to create consistent layouts
 * @param props `IContainerProps` used to render this `Container`
 * @returns `Container` component
 */
function Container({
  col = false,
  padding = false,
  row = false,
  ...props
}: IContainerProps) {
  const className = clsx(
    "flex flex-1",
    BuildStyle({ col, padding, row }),
    props.className
  );
  return <Component.div {...props} className={className} />;
}

export { Container };
export type { IContainer, IContainerProps };
