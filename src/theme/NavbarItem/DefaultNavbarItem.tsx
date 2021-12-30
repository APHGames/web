/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { NavLinkProps, DesktopOrMobileNavBarItemProps, Props } from '@theme/NavbarItem/DefaultNavbarItem';
import isInternalUrl from '@docusaurus/isInternalUrl';

export function NavLink({
	activeBasePath, activeBaseRegex,
	to,
	href,
	label,
	activeClassName = '',
	prependBaseUrlToHref,
	...props
}: NavLinkProps): JSX.Element {
	// TODO all this seems hacky
	// {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
	const toUrl = useBaseUrl(to);
	const activeBaseUrl = useBaseUrl(activeBasePath);
	const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
	const isExternalLink = label && href && !isInternalUrl(href);

	return (
		<Link
			{...(href ? {
				href: prependBaseUrlToHref ? normalizedHref : href,
			} : {
				isNavLink: true,
				activeClassName: !props.className?.includes(activeClassName) ? activeClassName : '',
				to: toUrl,
				...(activeBasePath || activeBaseRegex
					? {
						isActive: (_match, location) => (activeBaseRegex
							? new RegExp(activeBaseRegex).test(location.pathname)
							: location.pathname.startsWith(activeBaseUrl)),
					} : null),
			})}
			{...props}
		>
			{isExternalLink ? (<span>{label}</span>) : (label)}
		</Link>
	);
}

function DefaultNavbarItemDesktop({
	className,
	isDropdownItem = false,
	...props
}: DesktopOrMobileNavBarItemProps) {
	const element = (
		<NavLink
			className={clsx(isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link', className)}
			{...props}
		/>
	);

	if (isDropdownItem) {
		return <li>{element}</li>;
	}

	return element;
}

function DefaultNavbarItemMobile({
	className,
	isDropdownItem: _isDropdownItem,
	...props
}: DesktopOrMobileNavBarItemProps) {
	return (
		<li className="menu__list-item">
			<NavLink className={clsx('menu__link', className)} {...props} />
		</li>
	);
}

function DefaultNavbarItem({
	mobile = false,
	position: _position, // Need to destructure position from props so that it doesn't get passed on.
	...props
}: Props): JSX.Element {
	const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
	return (
		<Comp
			{...props}
			activeClassName={props.activeClassName}
		/>
	);
}

export default DefaultNavbarItem;
