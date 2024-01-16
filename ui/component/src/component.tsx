import { Slot } from "@clutchd/slot";
import * as React from "react";

/**
 * Import `@clutchd/twx` if it exists, otherwise no processing classNames
 */
try {
  var tx = require("@clutchd/twx").twx;
} catch (e) {
  tx = false;
}

/**
 * Supported `Component` nodes
 */
const NODES = [
  "a",
  "blockquote",
  "button",
  "div",
  "em",
  "fieldset",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "input",
  "label",
  "main",
  "small",
  "strong",
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
  twx?: Function;
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
      { asChild, twx = tx, ...props }: IComponentPropsWithRef<typeof node>,
      forwardedRef: any,
    ) => {
      if (tx && props?.className) props.className = twx(props.className);
      const Comp: any = asChild ? Slot : node;
      return <Comp ref={forwardedRef} {...props} />;
    },
  );

  Node.displayName = `Component.${node}`;

  return { ...tag, [node]: Node };
}, {} as Components);

export { Component };
export type { IComponentPropsWithRef, IComponentPropsWithoutRef };
