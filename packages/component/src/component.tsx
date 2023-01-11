import * as React from "react";
import { Slot } from "./slot";

/**
 * Supported `Component` nodes
 */
const NODES = [
  "a",
  "button",
  "div",
  "fieldset",
  "footer",
  "form",
  "header",
  "input",
  "label",
  "main",
  "optgroup",
  "option",
  "output",
  "p",
  "select",
  "span",
  "textarea",
] as const;

/**
 * Type to define generic `Component` props
 */
type IComponentProps = {
  asChild?: boolean;
};

/**
 * Type to define `Component` props with the 'ref' prop
 */
type IComponentPropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & IComponentProps;

/**
 * Type to define `Component` props without the 'ref' prop
 */
type IComponentPropsWithoutRef<E extends React.ElementType> =
  React.ComponentPropsWithoutRef<E> & IComponentProps;

/**
 * Type to define `Component` as a forwarded ref component
 */
interface IForwardRefComponent<E extends React.ElementType>
  extends React.ForwardRefExoticComponent<IComponentPropsWithRef<E>> {}

/**
 * Type to define the supported `Component` nodes
 */
type Components = { [E in (typeof NODES)[number]]: IForwardRefComponent<E> };

/**
 * `Component` - a higher-order component that extends standard html tags
 */
const Component = NODES.reduce((tag, node) => {
  const Node = React.forwardRef(
    (
      { asChild, ...props }: IComponentPropsWithRef<typeof node>,
      forwardedRef: any
    ) => {
      const Comp: any = asChild ? Slot : node;

      React.useEffect(() => {
        (window as any)[Symbol.for("clutchd")] = true;
      }, []);

      return <Comp {...props} ref={forwardedRef} />;
    }
  );

  Node.displayName = `Component.${node}`;

  return { ...tag, [node]: Node };
}, {} as Components);

export { Component };
export type { IComponentPropsWithRef, IComponentPropsWithoutRef };
