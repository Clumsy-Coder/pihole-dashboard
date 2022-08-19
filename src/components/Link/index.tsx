import * as React from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';

/* eslint-disable react/require-default-props */

// A custom adapter component for Link from Material UI and NextJS
// obtained from
// https://github.com/mui/material-ui/blob/master/examples/nextjs-with-typescript/src/Link.tsx
//
// check
// https://mui.com/material-ui/guides/routing/#next-js

// ############################################################################################## //

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

type CustomAnchorLink = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
type CustomNextjsLink = Omit<
  NextLinkProps,
  'href' | 'as' | 'onClick' | 'onMouseEnter' | 'onTouchStart'
>;
interface NextLinkComposedProps extends CustomAnchorLink, CustomNextjsLink {
  /**
   * Where to navigate to.
   *
   * Alias to 'href'.
   * @see https://mui.com/material-ui/guides/routing/#next-js
   */
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

/**
 * Unstyled version of Link component.
 * Responsible for handling navigation.
 *
 * @example
 * ```javascript
 * import Button from '@mui/material/Button';
 * import { NextLinkComposed } from '@components/Link';
 *
 * export default function Index() {
 *   return (
 *     <Button
 *       component={NextLinkComposed}
 *       to={{
 *         pathname: '/about',
 *         query: { name: 'test' },
 *       }}
 *     >
 *       Button link
 *     </Button>
 *   );
 * }
 *
 * ```
 *
 * @see https://mui.com/material-ui/guides/routing/#next-js
 */
export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    );
  },
);

// ############################################################################################## //

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  /**
   * URL to navigate.
   *
   * Can be external link (Ex: https://github.com) or internal link (ex: navigate to About page)
   *
   * @see https://mui.com/material-ui/guides/routing/#next-js
   */
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
  noLinkStyle: boolean | false;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

/**
 * A styled version of the Next.js Link component:
 *
 * @example
 * ```javascript
 * import Link from '@components/Link';
 *
 * export default function Index() {
 *   return (
 *     <Link
 *       href={{
 *         pathname: '/about',
 *         query: { name: 'test' },
 *       }}
 *     >
 *       Link
 *     </Link>
 *   );
 * }
 *
 * ```
 * @see https://nextjs.org/docs/api-reference/next/link
 * @see https://mui.com/material-ui/guides/routing/#next-js
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = { to: href, linkAs, replace, scroll, shallow, prefetch, locale };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      className={className}
      ref={ref}
      {...nextjsProps}
      {...other}
    />
  );
});

export default Link;
