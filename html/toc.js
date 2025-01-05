// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">本书介绍</a></li><li class="chapter-item expanded affix "><a href="changelog.html">更新记录</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="intro.html">导读</a></li><li class="chapter-item expanded affix "><li class="part-title">WordPress 部署</li><li class="chapter-item expanded "><a href="development-env.html"><strong aria-hidden="true">1.</strong> WordPress 的部署</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="deployment/windows-dev.html"><strong aria-hidden="true">1.1.</strong> Windows 开发环境配置</a></li><li class="chapter-item expanded "><a href="deployment/mac-dev.html"><strong aria-hidden="true">1.2.</strong> macOS 开发环境配置</a></li><li class="chapter-item expanded "><a href="deployment/cpanel-production.html"><strong aria-hidden="true">1.3.</strong> cPanel 生产环境配置</a></li><li class="chapter-item expanded "><a href="deployment/wanwang-production.html"><strong aria-hidden="true">1.4.</strong> 万网虚拟主机环境配置</a></li><li class="chapter-item expanded "><a href="deployment/bt-linux-production.html"><strong aria-hidden="true">1.5.</strong> 宝塔 Linux 环境配置</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">WordPress 使用</li><li class="chapter-item expanded "><a href="basic-usage.html"><strong aria-hidden="true">2.</strong> 基本使用</a></li><li class="chapter-item expanded "><a href="basic-config.html"><strong aria-hidden="true">3.</strong> 基本设置</a></li><li class="chapter-item expanded "><a href="basic-plugin-1.html"><strong aria-hidden="true">4.</strong> 常用插件使用说明（一）</a></li><li class="chapter-item expanded "><a href="basic-plugin-2.html"><strong aria-hidden="true">5.</strong> 常用插件使用说明（二）</a></li><li class="chapter-item expanded "><a href="resources.html"><strong aria-hidden="true">6.</strong> 相关资源站点</a></li><li class="chapter-item expanded "><a href="optimize-1.html"><strong aria-hidden="true">7.</strong> 站点性能优化 （一）：动静分离</a></li><li class="chapter-item expanded "><a href="optimize-2.html"><strong aria-hidden="true">8.</strong> 站点性能优化 （二）：服务器优化</a></li><li class="chapter-item expanded "><a href="optimize-3.html"><strong aria-hidden="true">9.</strong> 站点性能优化 （三）：WordPress 缓存</a></li><li class="chapter-item expanded "><a href="optimize-4.html"><strong aria-hidden="true">10.</strong> 站点性能优化 （四）：程序优化</a></li><li class="chapter-item expanded "><a href="security.html"><strong aria-hidden="true">11.</strong> 安全固化</a></li><li class="chapter-item expanded affix "><li class="part-title">WordPress 主题</li><li class="chapter-item expanded "><a href="theme/usage.html"><strong aria-hidden="true">12.</strong> WP 主题使用</a></li><li class="chapter-item expanded "><a href="theme/intro.html"><strong aria-hidden="true">13.</strong> WP 主题开发：快速入门</a></li><li class="chapter-item expanded "><a href="theme/struct.html"><strong aria-hidden="true">14.</strong> WP 主题开发：文件结构</a></li><li class="chapter-item expanded "><a href="theme/custom-page.html"><strong aria-hidden="true">15.</strong> WP 主题开发：一些特殊的页面</a></li><li class="chapter-item expanded "><a href="theme/is-function.html"><strong aria-hidden="true">16.</strong> WP 主题开发: 条件语法</a></li><li class="chapter-item expanded "><a href="theme/options-framework.html"><strong aria-hidden="true">17.</strong> WP 主题开发：接入 Options Framework</a></li><li class="chapter-item expanded "><a href="theme/tips.html"><strong aria-hidden="true">18.</strong> WP 主题开发：一些 WordPress 开发的小技巧</a></li><li class="chapter-item expanded "><a href="theme/uploads.html"><strong aria-hidden="true">19.</strong> WP 主题开发：提交主题到 WordPress 官方仓库</a></li><li class="chapter-item expanded affix "><li class="part-title">WordPress 插件</li><li class="chapter-item expanded "><a href="plugin/usage.html"><strong aria-hidden="true">20.</strong> WP 插件使用</a></li><li class="chapter-item expanded "><a href="plugin/run.html"><strong aria-hidden="true">21.</strong> WP 插件的运行机制</a></li><li class="chapter-item expanded "><a href="plugin/create.html"><strong aria-hidden="true">22.</strong> WP 插件的创建</a></li><li class="chapter-item expanded "><a href="plugin/admin.html"><strong aria-hidden="true">23.</strong> WP 插件后台设计与开发</a></li><li class="chapter-item expanded "><a href="plugin/create-widget.html"><strong aria-hidden="true">24.</strong> 开发一个 WordPress Widget</a></li><li class="chapter-item expanded "><a href="plugin/create-shortcode.html"><strong aria-hidden="true">25.</strong> 开发一个短代码插件</a></li><li class="chapter-item expanded "><a href="plugin/uploads.html"><strong aria-hidden="true">26.</strong> 提交你的插件到 WordPress 官方仓库</a></li><li class="chapter-item expanded affix "><li class="part-title">WordPress 多语言</li><li class="chapter-item expanded "><a href="i18n/theme.html"><strong aria-hidden="true">27.</strong> WP 主题开发：为你的主题/插件实现国际化</a></li><li class="chapter-item expanded "><a href="i18n/wpml.html"><strong aria-hidden="true">28.</strong> 使用 WPML 插件建设一个多语言站点</a></li><li class="chapter-item expanded "><a href="i18n/polylang.html"><strong aria-hidden="true">29.</strong> 使用 Polylang 插件建设一个多语言站点</a></li><li class="chapter-item expanded affix "><li class="part-title">WordPress 实战</li><li class="chapter-item expanded "><a href="opt/wpdb.html"><strong aria-hidden="true">30.</strong> WordPress 数据库操作 WPDB 指南</a></li><li class="chapter-item expanded "><a href="opt/custom-author.html"><strong aria-hidden="true">31.</strong> 动手开发插件： Custom Author 插件开发实战</a></li><li class="chapter-item expanded "><a href="opt/sendmail.html"><strong aria-hidden="true">32.</strong> 轻松玩转 WP：如何使用 WordPress 的邮件发文功能</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">答疑</li><li class="chapter-item expanded "><a href="qa/20171130.html"><strong aria-hidden="true">33.</strong> 答疑 20171130</a></li><li class="chapter-item expanded "><a href="qa/20171201.html"><strong aria-hidden="true">34.</strong> 答疑 20171201</a></li><li class="chapter-item expanded "><a href="qa/20171206.html"><strong aria-hidden="true">35.</strong> 答疑 20171206</a></li><li class="chapter-item expanded "><a href="qa/20171216.html"><strong aria-hidden="true">36.</strong> 答疑 20171216</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
