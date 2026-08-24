import type { NavItemWithChildren } from '@rspress/core';
import type { PageData } from '@rspress/shared';
import {
  addLeadingSlash,
  normalizeHrefInRuntime,
  removeBase,
  useLocation,
  useI18n,
  useNav,
  usePage,
  usePages,
  useSite,
  useVersion,
} from '@rspress/core/runtime';
import {
  IconSmallMenu,
  NavTitle,
  Search,
  SocialLinks,
  SvgWrapper,
  SwitchAppearance,
  useHoverGroup,
} from '@rspress/core/theme-original';
import type { NavProps } from '@rspress/core/theme-original';
import {
  NavLangs,
  NavMenu,
  NavMenuDivider,
  NavMenuItemWithChildren,
} from '@rspress/core/dist/theme/components/Nav/NavMenu.js';
import { NavScreen, NavScreenDivider } from '@rspress/core/dist/theme/components/NavScreen/index.js';
import { NavScreenAppearance } from '@rspress/core/dist/theme/components/NavScreen/NavScreenAppearance.js';
import { NavScreenMenuItemWithChildren } from '@rspress/core/dist/theme/components/NavScreen/NavScreenMenuItem.js';
import { NavScreenLangs } from '@rspress/core/dist/theme/components/NavScreen/NavScreenLangs.js';
import { useNavScreen } from '@rspress/core/dist/theme/components/NavHamburger/useNavScreen.js';
import { isDarkModeSwitchEnabled } from '@rspress/shared';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import './index.css';

function getVersionHref(
  pathname: string,
  currentVersion: string,
  targetVersion: string,
  defaultVersion: string,
  cleanUrls: boolean,
  isPageNotFound: boolean,
  pages?: PageData['pages'],
) {
  let url = removeBase(pathname);
  if (!url || isPageNotFound) {
    url = normalizeHrefInRuntime('/');
  }

  const parts = url.split('/').filter(Boolean);
  if (currentVersion !== defaultVersion && parts[0] === currentVersion) {
    parts.shift();
  }

  if (targetVersion !== defaultVersion) {
    parts.unshift(targetVersion);
  }

  let route = parts.join('/');
  if (targetVersion !== defaultVersion && !route) {
    route = cleanUrls ? 'index' : 'index.html';
  }

  const candidate = addLeadingSlash(route);
  if (
    pages &&
    !pages.some(
      page =>
        page.version === targetVersion &&
        normalizeRouteForComparison(page.routePath) ===
          normalizeRouteForComparison(candidate),
    )
  ) {
    return targetVersion === defaultVersion
      ? '/'
      : `/${targetVersion}/${cleanUrls ? 'index' : 'index.html'}`;
  }

  return candidate;
}

function normalizeRouteForComparison(route: string) {
  const normalized = route
    .replace(/\.html$/i, '')
    .replace(/\/index$/i, '')
    .replace(/\/$/, '');
  return normalized || '/';
}

function VersionHrefNormalizer() {
  const { pathname } = useLocation();
  const { page } = usePage();
  const { pages } = usePages();
  const { site } = useSite();
  const currentVersion = useVersion();
  const versions = site.multiVersion.versions || [];
  const defaultVersion = site.multiVersion.default || '';
  const cleanUrls = site.route?.cleanUrls || false;

  useEffect(() => {
    const normalizeLinks = () => {
      for (const version of versions) {
        const href = getVersionHref(
          pathname,
          currentVersion,
          version,
          defaultVersion,
          cleanUrls,
          page.pageType === '404',
          pages,
        );
        document
          .querySelectorAll<HTMLAnchorElement>(
            `.rp-hover-group__item__link[aria-label="${version}"]`,
          )
          .forEach(link => {
            link.href = href;
          });
      }
    };

    normalizeLinks();
    const observer = new MutationObserver(normalizeLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [cleanUrls, currentVersion, defaultVersion, page.pageType, pages, pathname, versions]);

  return null;
}

function FixedNavScreenVersions() {
  const { pathname } = useLocation();
  const { page } = usePage();
  const { pages } = usePages();
  const { site } = useSite();
  const t = useI18n();
  const currentVersion = useVersion();
  const defaultVersion = site.multiVersion.default || '';
  const versions = site.multiVersion.versions || [];
  const cleanUrls = site.route?.cleanUrls || false;

  if (versions.length < 2) {
    return null;
  }

  const items: NavItemWithChildren['items'] = versions.map(version => ({
    text: version,
    link: getVersionHref(
      pathname,
      currentVersion,
      version,
      defaultVersion,
      cleanUrls,
      page.pageType === '404',
      pages,
    ),
  }));

  return (
    <NavScreenMenuItemWithChildren
      menuItem={{ text: t('versionsText'), items }}
    />
  );
}

function FixedNavHamburger() {
  const items = (
    <div className="rp-nav-hamburger__md__hover-group">
      <NavScreenAppearance />
      <FixedNavScreenVersions />
      <NavScreenLangs />
      <NavScreenDivider />
      <SocialLinks />
    </div>
  );
  const { isScreenOpen, toggleScreen } = useNavScreen();
  const { handleMouseEnter, handleMouseLeave, hoverGroup } =
    // Keep the generated mobile menu consistent with the desktop version menu.
    // The original Rspress component uses the buggy default-version path helper.
    useHoverGroup({
      position: 'right',
      customChildren: (
        <div className="rp-nav-menu__others-mobile__container">{items}</div>
      ),
    });

  return (
    <>
      {isScreenOpen &&
        createPortal(
          <NavScreen isScreenOpen={isScreenOpen} toggleScreen={toggleScreen} />,
          document.getElementById('__rspress_modal_container')!,
        )}
      <button
        onClick={toggleScreen}
        aria-label="mobile hamburger"
        className={clsx('rp-nav-hamburger', 'rp-nav-hamburger__sm', {
          'rp-nav-hamburger--active': isScreenOpen,
        })}
      >
        <SvgWrapper icon={IconSmallMenu} />
      </button>
      <button
        aria-label="mobile hamburger"
        className={clsx('rp-nav-hamburger', 'rp-nav-hamburger__md', {
          'rp-nav-hamburger--active': isScreenOpen,
        })}
        onClick={handleMouseEnter}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SvgWrapper icon={IconSmallMenu} />
        {hoverGroup}
      </button>
    </>
  );
}

function FixedNavVersions() {
  const { pathname } = useLocation();
  const { page } = usePage();
  const { pages } = usePages();
  const { site } = useSite();
  const currentVersion = useVersion();
  const defaultVersion = site.multiVersion.default || '';
  const versions = site.multiVersion.versions || [];
  const cleanUrls = site.route?.cleanUrls || false;

  if (versions.length < 2) {
    return null;
  }

  const items: NavItemWithChildren['items'] = versions.map(version => ({
    text: version,
    link: getVersionHref(
      pathname,
      currentVersion,
      version,
      defaultVersion,
      cleanUrls,
      page.pageType === '404',
      pages,
    ),
  }));

  return (
    <NavMenuItemWithChildren
      menuItem={{ text: currentVersion, items }}
      activeMatcher={item => item.text === currentVersion}
    />
  );
}

function Nav(props: NavProps) {
  const { beforeNavTitle, afterNavTitle, beforeNavMenu, afterNavMenu, navTitle } = props;
  const navList = useNav();
  const { site } = useSite();
  const hasAppearanceSwitch = isDarkModeSwitchEnabled(site.themeConfig.darkMode);

  return (
    <header className="rp-nav">
      <div className="rp-nav__left">
        {beforeNavTitle}
        {navTitle ?? <NavTitle />}
        <NavMenu menuItems={navList} position="left" />
        {afterNavTitle}
      </div>
      <div className="rp-nav__right">
        {beforeNavMenu}
        <Search />
        <NavMenu menuItems={navList} position="right" />
        <div className="rp-nav__others">
          <NavMenuDivider />
          <NavLangs />
          <FixedNavVersions />
          {hasAppearanceSwitch && <SwitchAppearance />}
          <SocialLinks />
        </div>
        <FixedNavHamburger />
        {afterNavMenu}
        <VersionHrefNormalizer />
      </div>
    </header>
  );
}

export * from '@rspress/core/theme-original';
export { Nav };
