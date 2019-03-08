### WordPress 安全固化

#### 什么是安全

安全不是绝对的，安全是一个持续不断的过程，你需要不断的调整、检查问题来**降低**安全风险。

#### 安全措施

##### 采用不同防御深度的安全解决方案

没有任何一个解决方案可以处理所有安全问题，我们需要使用多种不同的解决方案搭配使用来解决不同深度的安全问题，在多层次的解决方案处理下，即使某一层的解决方案出现了故障，整个系统仍然处于保护之下.

##### 限制访问权限

对于一些有特殊安全需要站点，要尽可能的减少能够访问到站点的人数，尽可能的减少外部入口的展示。

##### 选择靠谱的主机商

选择靠谱的主机商，或者自己建设 VPS。

在选择主机商时，尽可能选择那些历史悠久、风评比较好的。免费、廉价的主机随时可能遇见风险。而比较新的主机商可能在安全问题上无法做到很好的预防，你自己虽然安全做的非常棒，但是在主机商那里出了问题，也是不可以的。

##### 遵守最小权限原则

在配置 WordPress 时，应当授予其满足其需要的最小权限。官方的建议是给目录`755`权限，给文件`644`权限。

##### 设置目录/文件的权限

1.wp-admin 目录

使用 Web Server 的 Basic Auth 来为 wp-admin 的设置一层验证，从而让别人无法直接对你的后台进行爆破。

2.wp-includes 目录

在网站根目录中的 `.htaccess` 中添加如下代码，可以实现对 wp-includes 目录的保护，让这些文件无法被直接访问。

```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^wp-admin/includes/ - [F,L]
RewriteRule !^wp-includes/ - [S=3]
RewriteRule ^wp-includes/[^/]+\.php$ - [F,L]
RewriteRule ^wp-includes/js/tinymce/langs/.+\.php - [F,L]
RewriteRule ^wp-includes/theme-compat/ - [F,L]
</IfModule>
```

3.wp-content/uploads 目录

在 .htaccess 文件的顶部添加如下代码，可以禁止 uploads 目录下的 PHP 执行权限，会减少大部分的麻烦。

```
<Files ~ "\.ph(?:p[345]?|t|tml)$">
   deny from all
</Files>
```

4.wp-config.php

在 .htaccess 文件的顶部添加如下代码，可以让配置文件更加的安全。

```
<files wp-config.php>
order allow,deny
deny from all
</files>
```

##### 关闭文件的修改功能

在 wp-config.php 文件中添加如下代码，可以关闭在线的文件编辑，这样可以保证不会因为账户密码丢失导致的被在主题和插件中植入恶意代码。

```
define('DISALLOW_FILE_EDIT', true);
```

##### 监控网站的文件变动

可以使用 iThemes Security 或 [Wordfence](https://wordpress.org/plugins/wordfence/) 来监控 WordPress 的文件变动。

文件的变动情况也会帮助你更好的认识自己的网站状态。

#### 不同站点进行功能隔离

避免在用一个虚拟主机账户下安装多个应用程序，以免受到其他应用的波及。对每一个应用程序应该设置一个独立的账户，以保证其安全。

#### 为博客使用不同的数据库

如果一个主机上有多个程序，最好为每个程序创建一个数据库和数据库用户，这样不会导致你的一个应用程序被攻破连累其他程序也被攻破。

#### 日常备份

为你的站点做备份，并且要经常验证你的备份是否有效（不要忘了 gitlab 丢数据结果备份也失效的惨剧）。

给站点做一个恢复清单，并时常演习，一旦出了出了问题，直接按照计划进行即可。

#### 从可信的源获取代码

不要使用不受信任的源代码，最好是从 WordPress 官方插件仓库、或者是开发者主页下载相关的代码。网上流传的破解主题和插件可能会加入一些恶意的代码，给网站留下隐患。

但是这个安全只是相对的，因为按照经验，WordPress 官方只会审查第一版，后续的版本都是开发者自行更新的。如果开发者加入了恶意代码，第一时间是没有人审查的，所以除了从官方源下载，还要选择一些知名的插件。

#### 在服务端使用最新的软件

对于使用 VPS、云主机的用户，建议使用最新版本的软件（包括操作系统、Web Server、 PHP、 MySQL 等）。

如果使用的是虚拟主机，一般来说虚拟主机商会帮你搞定这些事情，只需要使用即可。

#### 使用最新版本的 WordPress

一些用户在使用时会选择锁死 WordPress 的版本，这样会导致你无法及时获得 WordPress 的安全更新。出于安全起见，建议将站点实时更新，或者定期进行更新，不要锁死在一个版本上。

在 wp-config.php 中加入如下的代码，可以开启 WordPress 核心的自动更新：

```
define( 'WP_AUTO_UPDATE_CORE', true );
```

#### 使用最新的插件、主题

大部分安全漏洞都来自你安装的主题、插件，所以尽可能的使用最新的插件和主题。这些漏洞可能只是开发者的一时疏忽，所以一旦插件发布了安全更新，还是早升级为妙。

如果一个插件/主题长期不更新的话，最好考虑一下是否还使用整个插件，看看能否换为其他的同类项的插件/主题，尽量避免使用无人维护的插件。

在主题的`functions.php`中添加如下代码，可以开启插件和主题的自动更新：

```
add_filter( 'auto_update_plugin', '__return_true' );
add_filter( 'auto_update_theme', '__return_true' );
```

#### 关闭错误输出

在 wp-config.php 中加入如下代码即可：

```
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_DEBUG_LOG', true );
```

#### 使用 SSL

给站点加入 HTTPS，并设置强制SSL，在 wp-config.php 中加入如下代码即可：

```
define('FORCE_SSL_ADMIN', true);
```

#### 修改数据库默认前缀 `wp_`

在安装时，修改数据库的默认前缀，不要使用`wp_`，如果已经安装好了，可以试试[`Change Table Prefix`](https://wordpress.org/plugins/change-table-prefix/)插件。

#### 修改默认的用户名 Admin

在安装时，不要使用 Admin 作为用户名（如果已经使用，可以登录到 phpMyAdmin 去修改），后台个人资料中的“公开显示为”也要使用昵称，而不是用户名。

#### 使用邮箱登陆

相比于更短的用户名，用一个更长的邮件地址作为登录名会更加的安全。

可以通过安装一个插件来实现**[Email Login](https://wordpress.org/plugins/wp-email-login/)**

#### 隐藏 WordPress 版本信息

在主题的`functions.php`中添加如下代码，可以关闭 `head`部分中的版本输出，至少可以让黑客不知道你使用的是哪个版本的 WP，会更加安全一些。

```
/* Hide WP version strings from scripts and styles
 * @return {string} $src
 * @filter script_loader_src
 * @filter style_loader_src
 */
function fjarrett_remove_wp_version_strings( $src ) {
 global $wp_version;
 parse_str(parse_url($src, PHP_URL_QUERY), $query);
 if ( !empty($query['ver']) && $query['ver'] === $wp_version ) {
 $src = remove_query_arg('ver', $src);
 }
 return $src;
}
add_filter( 'script_loader_src', 'fjarrett_remove_wp_version_strings' );
add_filter( 'style_loader_src', 'fjarrett_remove_wp_version_strings' );

/* Hide WP version strings from generator meta tag */
add_filter( 'the_generator', '__return_empty_string' );
```

#### 经常关注安全新闻和更新

经常关注最新的安全新闻和漏洞数据库，比如可以订阅 WordPress 官方的[安全新闻](https://wordpress.org/news/category/security/)，或者是 [WPVulnDB](https://wpvulndb.com/)

#### 确保本地环境的安全

确保电脑、浏览器、路由器使用的是最新的、没有恶意代码的软件。如果使用的是公共 WiFi 热点，最好对通信过程进行加密。如果使用手机、平板电脑管理你的站点，同样也要保持更新。

#### 使用 SFTP 替代 FTP

SFTP 使用加密传输认证信息和传输数据，相对来说会更安全。所以尽可能使用安全度更高的 SFTP 来传输数据。

#### 使用复杂密码，经常更换密码

密码的目标就是让其他人难以猜测，并且很难被暴力破解，其中的关键就是让其变得复杂、无序。建议对所有密码都使用密码生成器。

默认情况下，WordPress 会提供一个密码生成器，当更改密码时，会自动生成一个高强度密码。如果记不住这个密码，可以考虑使用诸如 1Password 、LastPass 这样的服务来存储密码。同时，还可以安装 `Force Strong Passwords` 插件来强制你必须使用更加复杂的密码。

#### 为程序引入两步验证（Two Step Authentication）

使用两步验证能够让站点更加的安全，我们在前面的常用插件中已经加入了 Google Authenticator 的使用说明，就不再重复安装过程了。如果需要接入，可以回到第 5 课去看具体的内容。

#### 安装安全插件处理安全问题

**BulletProof Security**

这个插件会提供 防火墙、登录保护、数据库备份等一些功能。如果有问题还可以通过电子邮件通知处理，还可以阻止一些 IP 的访问。

**Login LockDown**

这个插件可以封禁掉想要暴力破解你网站的 IP 地址。

#### 关闭掉 XML-RPC 

在 .htaccess 中添加如下代码，可以封掉 XML-RPC 请求：

```
<Files xmlrpc.php>
order deny,allow
deny from all
allow from 123.123.123.123
</Files>
```

对于大多数用户来说，用不到 XML-RPC，可以使用上述代码关掉该功能。此外，如果需要使用，只要用你自己的 IP 替换`123.123.123.123`即可。

#### 关掉 JSON Rest API

在主题的 functions.php 中添加如下代码，可以关闭 Rest API 输出。

```
add_filter('json_enabled', '__return_false');
add_filter('json_jsonp_enabled', '__return_false');
```

大部分人是用不到 WordPress 的 Rest API 的，所以可以在主题的 functions.php 中添加上述代码，关闭掉 REST API。

#### 封禁垃圾请求

在 .htaccess 中添加如下代码，可以封掉一些毫无意义的请求：

```
<ifModule mod_rewrite.c>
RewriteCond %{QUERY_STRING} enter|separated|query|strings|here [NC]
RewriteRule .* http://www.%{HTTP_HOST}/$1? [R=301,L]
</ifModule>
```

#### 禁止机器人的请求

在 .htaccess 中添加如下代码，可以封掉机器人的请求：

```
<IfModule mod_rewrite.c>
RewriteCond %{REQUEST_METHOD} POST
RewriteCond %{REQUEST_URI} .wp-comments-post\.php*
RewriteCond %{HTTP_REFERER} !.wordpress.dev.* [OR]
RewriteCond %{HTTP_USER_AGENT} ^$
RewriteRule (.*) ^http://%{REMOTE_ADDR}/$ [R=301,L]
</IfModule>
```

#### 禁止包含 SQL 查询的请求

在 .htaccess 中添加如下代码，可以封掉包含 SQL 查询的请求：

```
<IfModule mod_rewrite.c>
RewriteBase /
RewriteCond %{REQUEST_METHOD} ^(HEAD|TRACE|DELETE|TRACK) [NC]
RewriteRule ^(.*)$ - [F,L]
RewriteCond %{QUERY_STRING} \.\.\/ [NC,OR]
RewriteCond %{QUERY_STRING} boot\.ini [NC,OR]
RewriteCond %{QUERY_STRING} tag\= [NC,OR]
RewriteCond %{QUERY_STRING} ftp\:  [NC,OR]
RewriteCond %{QUERY_STRING} http\:  [NC,OR]
RewriteCond %{QUERY_STRING} https\:  [NC,OR]
RewriteCond %{QUERY_STRING} (\|%3E) [NC,OR]
RewriteCond %{QUERY_STRING} mosConfig_[a-zA-Z_]{1,21}(=|%3D) [NC,OR]
RewriteCond %{QUERY_STRING} base64_encode.*\(.*\) [NC,OR]
RewriteCond %{QUERY_STRING} ^.*(\[|\]|\(|\)||ê|"|;|\?|\*|=$).* [NC,OR]
RewriteCond %{QUERY_STRING} ^.*("|'|<|>|\|{||).* [NC,OR]
RewriteCond %{QUERY_STRING} ^.*(%24&x).* [NC,OR]
RewriteCond %{QUERY_STRING} ^.*(%0|%A|%B|%C|%D|%E|%F|127\.0).* [NC,OR]
RewriteCond %{QUERY_STRING} ^.*(globals|encode|localhost|loopback).* [NC,OR]
RewriteCond %{QUERY_STRING} ^.*(request|select|insert|union|declare).* [NC]
RewriteCond %{HTTP_COOKIE} !^.*wordpress_logged_in_.*$
RewriteRule ^(.*)$ - [F,L]
</IfModule>
```

#### 推荐阅读

如果觉得还不够，建议去读一读道哥（吴翰清）的[《白帽子讲 Web 安全》](https://book.douban.com/subject/10546925/)。
