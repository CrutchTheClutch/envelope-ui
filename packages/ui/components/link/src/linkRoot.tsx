import { Component, IComponentPropsWithoutRef } from "@clutchd/component";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { UrlObject } from "node:url";
import * as React from "react";

/**
 * Type to define `LinkRoot` element.
 */
type ILinkRoot = React.ElementRef<typeof Component.a>;

/**
 * Type to define `LinkRoot` props.
 */
interface ILinkRootProps extends Omit<NextLinkProps, "href"> {
  /**
   * The path or URL to navigate to. It can also be an object.
   * @see https://nextjs.org/docs/api-reference/next/link#with-url-object
   */
  href: string | UrlObject;
}

/**
 * Type to define `LinkRoot` props with html attributes.
 */
interface ILinkRootHtmlProps
  extends ILinkRootProps,
    Omit<IComponentPropsWithoutRef<typeof Component.a>, "asChild" | "href"> {}

/**
 * `LinkRoot` - The root link component, built with next/link.
 * @param props `ILinkRootHtmlProps` used to render this `LinkRoot`.
 * @returns `LinkRoot` component.
 */
const LinkRoot = React.forwardRef<ILinkRoot, ILinkRootHtmlProps>(
  ({ href, children, ...props }, forwardedRef) => {
    return (
      <Component.a asChild {...props}>
        <NextLink href={href} ref={forwardedRef}>
          {children}
        </NextLink>
      </Component.a>
    );
  },
);

LinkRoot.displayName = "LinkRoot";

export { LinkRoot };
export type { ILinkRoot, ILinkRootHtmlProps, ILinkRootProps };
