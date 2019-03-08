### WordPress 性能优化：缓存

#### 加速：加入缓存机制

WordPress 本身提供了一种叫做 WordPress Object Cache 的对象缓存机制，它是把需要缓存的内容按照 Key-Value 这样的模式进行缓存。Key-Value 形式的数据，要远比我们在数据库中查询要快的多。

#### WordPress 的三种缓存机制

文件缓存：文件缓存是把 WordPress 默认的对象缓存的对象存储为文件，对外提供服务时，WordPress 直接读取文件中的缓存来进行渲染和输出。但是此类缓存对硬盘的 I/O 要求极高，所以自 WordPress 2.5 就被弃用。不过如果虚拟主机无法正常运行后面两种缓存，也可以试试文件缓存，通过安装 [WP File Cache](https://wordpress.org/plugins/wp-file-cache/) 来启用文件缓存。

内存缓存：内存缓存是把 WordPress 默认的对象缓存的对象保存到内存中去，下一次访问的时候，直接到内存中获取内容，这样就没有了文件缓存的 I/O 操作，并且 SQL 查询也减少了很多，整个系统都能变快很多。

内存缓存和文件缓存一个相同的地方也是网站的动态内容根据功能分成很多个部分，分别对每个部分缓存，而不是把这个页面当作一个整体缓存了，所以访问一个页面还是需要从内存中读取多个内容。

HTML 静态缓存：HTML 静态缓存可以把 WordPress 页面缓存一个静态的 HTML 页面存到服务器上，下次访问该页面的时候，不需要再次运行 PHP 代码，直接从服务器返回这个 HTML 文件即可，这样就大大降低了 CPU 的占用率，但是使用 HTML 静态化缓存插件，也有一个不好的地方，比如日志流量、最新日志，这些动态的内容不会时时更新。

##### 内存缓存：使用 Memcached 和 Batcache 进行缓存

我们可以安装 Memcached 来实现数据查询的缓存，在启用了 Memcached 缓存后，WordPress 会将在数据库中查询到的数据以对象的形式缓存进入内存中。我们每次访问时，WordPress 就会访问内存中的缓存，将对象读取出来进行页面渲染，可以有效的减少数据库的查询。

而 BatCache 则是将页面整个缓存进入到内存中，用户进入后，WordPress 直接读取缓存中的页面，并返回给访客，能够再次进行提速。

##### 安装 Memcached 和 Batcache

安装 Memcached 和 BatCache 是有要求的，一般来说，要求使用的是独立的主机而非虚拟主机（需要有 SSH 权限），不过国外的一些 cPanel 主机也提供了 Memcached 的服务，也可以使用，具体可以咨询一下你的虚拟主机提供商。

**首先，在服务器上安装 Memcached**

在主机上使用命令安装 Memcached：`yum -y install memcached`或`apt-get -y install memcached`。

**编译 PHP 的 Memcached 的支持**

为 PHP 编译 `Memcached` 拓展。

**下载 Memecached 插件**

到 [https://wordpress.org/plugins/memcached/](https://wordpress.org/plugins/memcached/) 下载 WordPress 官方提供的 Memcached 插件，解压后将其中的 `object-cache.php` 移动到  `wp-content` 目录下（此处注意，不是 `wp-content/plugins/`目录）。

**下载 BatCache 插件**

到 [http://wordpress.org/extend/plugins/batcache/](http://wordpress.org/extend/plugins/batcache/) 下载 WordPress 官方提供的 BatCache 插件，解压后，将其中的 advanced-cache.php 移动到 `/wp-content/` 目录。

**开启缓存**

在 wp-config.php 文件中加入如下代码，开启缓存：

```
define('WP_CACHE', true);
```

##### HTML 静态缓存：使用 WP Super Cache 进行缓存

除了使用 Memcached 进行缓存，我们还可以使用 WP Super Cache 来进行缓存。WP Super Cache 把整个网页直接生成 HTML 文件，这样 Web 服务器就不用解析 PHP 脚本，通过使用这个插件，能使得你的 WordPress 博客将显著的提速。

##### 安装 WP Super Cache

**安装 WP Super Cache**

到 [https://wordpress.org/plugins/wp-super-cache/](https://wordpress.org/plugins/wp-super-cache/) 下载插件，并上传到后台进行安装、启用。

**开启缓存**

插件安装完成后，会在设置中多一个 WP Super Cache 的设置页面，单击进入设置页面，进入 “通用” TAB，勾选**启用缓存功能**选项。

![](https://postimg.aliavv.com/2018/i5bmp.png)

再到“高级” TAB 中勾选所有的推荐选项。这样会帮助我们自动针对未登录用户启用缓存、并对所有页面加入 Gzip 压缩。

![](https://postimg.aliavv.com/2018/n8kvc.png)

**CDN 选项**

如果需要开启 CDN，可以在 CDN 页面中进行配置，勾选启用 CDN，并设置 CDN 域名即可：

![](https://postimg.aliavv.com/2018/ov2ca.png)

##### 清除缓存

当我们的内容发生变化，需要清空缓存时，可以单击设置页面中的“内容” TAB 按钮，单击下方的**删除已过期文件**、**删除缓存**按钮来清空系统的缓存。

![](https://postimg.aliavv.com/2018/g1bl8.png)

WP Super Cache 的功能很强大，就不在这里一一说明了，默认的这些设置项，已经足够我们的日常使用了。

#### 静态化：Super Static Cache 插件

如果觉得 HTML 网页缓存也无法满足，那么只有静态化插件才能满足你了。

江湖上盛传的 cos-html-cache 插件已经太久没更新了，所以这里推荐用 Super Static Cache 来进行静态化。

##### 使用 Super Static Cache 进行缓存

**下载插件**

前往 [https://wordpress.org/plugins/super-static-cache/](https://wordpress.org/plugins/super-static-cache/) 下载该插件，并上传到后台进行安装、启用。

**设置插件**

安装完成后，进入设置中的 **Super Static Cache选项**，可以看到如下的配置项，选择其中的一种模式开启即可。

![](https://postimg.aliavv.com/2018/86hpf.png)

开启后，会看到网站的根目录下多了一个 index.html：

![](https://postimg.aliavv.com/2018/gis52.png)

这就是生成的静态文件。
