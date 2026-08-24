import type { NavItem, NavItemWithChildren } from '@rspress/core';
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

const VERSION_LABELS: Record<string, string> = {
  home: '首页',
  legacy: 'Legacy',
  v2: 'V2',
};

function getVersionLabel(version: string) {
  return VERSION_LABELS[version] ?? version;
}

function getVersionActiveMatch(version: string, defaultVersion: string) {
  if (version === defaultVersion) {
    return '^/(?:index\\.html)?$';
  }

  const escapedVersion = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return `^/${escapedVersion}/`;
}

function normalizeNavLink(link: string) {
  if (!link.startsWith('/') || link.startsWith('//')) {
    return link;
  }

  try {
    const url = new URL(link, 'https://rspress.local');
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return link;
  }
}

function normalizeNavItem(item: NavItem): NavItem {
  const normalizedItem = { ...item } as NavItem;

  if ('link' in normalizedItem && typeof normalizedItem.link === 'string') {
    normalizedItem.link = normalizeNavLink(normalizedItem.link);
  }

  if ('items' in normalizedItem) {
    normalizedItem.items = normalizedItem.items.map(normalizeNavItem);
  }

  return normalizedItem;
}

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

  const isVersionRoot = parts.length === 0;
  if (targetVersion !== defaultVersion && !isVersionRoot) {
    parts.unshift(targetVersion);
  }

  let route = isVersionRoot && targetVersion !== defaultVersion
    ? cleanUrls
      ? `${targetVersion}/`
      : `${targetVersion}/index.html`
    : parts.join('/');
  if (!route) route = '/';

  const candidate = normalizeHrefInRuntime(addLeadingSlash(route));
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
      ? normalizeHrefInRuntime('/')
      : normalizeHrefInRuntime(`/${targetVersion}/`);
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
            '.rp-hover-group__item__link, a.rp-nav-screen-versions-group__item, a.rp-nav-screen-menu-item',
          )
          .forEach(link => {
            const versionLabel = getVersionLabel(version);
            const linkText = link.textContent?.trim();
            const isHoverVersionLink =
              link.getAttribute('aria-label') === version ||
              link.getAttribute('aria-label') === versionLabel;
            const isScreenVersionLink =
              (linkText === version || linkText === versionLabel) &&
              (link.classList.contains('rp-nav-screen-versions-group__item') ||
                link.classList.contains('rp-nav-screen-menu-item'));
            if (isHoverVersionLink || isScreenVersionLink) {
              link.href = href;
            }
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
    text: getVersionLabel(version),
    activeMatch: getVersionActiveMatch(version, defaultVersion),
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
    text: getVersionLabel(version),
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
      menuItem={{ text: getVersionLabel(currentVersion), items }}
      activeMatcher={item => item.text === getVersionLabel(currentVersion)}
    />
  );
}

function Nav(props: NavProps) {
  const { beforeNavTitle, afterNavTitle, beforeNavMenu, afterNavMenu, navTitle } = props;
  const navList = useNav().map(normalizeNavItem);
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
