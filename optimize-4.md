### WordPress 性能优化：程序优化

除了之前提到的动静分离、服务器优化、缓存加速以外，还有一点很重要的就是程序层面的优化。

#### 加速：程序优化

##### 关闭 Google 字体

Google 字体绝对是拖慢国内 WordPress 浏览速度的一个重要原因。可以通过在主题的如下插件来关闭 Google 字体。

```
function remove_open_sans() {
    wp_deregister_style( 'open-sans' );
    wp_register_style( 'open-sans', false );
    wp_enqueue_style('open-sans','');
}
add_action( 'init', 'remove_open_sans' );
```

##### 加速 Gravatar 头像

由于 Gravatar 的主域名被屏蔽，可以考虑使用 https 的 Gravatar 域名，或者将图片缓存到本地。

将下面的代码加入到主题的 functions.php 中，并在根目录中创建一个 avatar 目录，给予 PHP 可写的权限，上传一个 default.jpg 作为默认的头像。

```
function my_avatar($avatar) {
  $tmp = strpos($avatar, 'http');
  $g = substr($avatar, $tmp, strpos($avatar, "'", $tmp) - $tmp);
  $tmp = strpos($g, 'avatar/') + 7;
  $f = substr($g, $tmp, strpos($g, "?", $tmp) - $tmp);
  $w = get_bloginfo('wpurl');
  $e = ABSPATH .'avatar/'. $f .'.jpg';
  $t = 1209600; //设定时间为14天，单位为秒
  if ( !is_file($e) || (time() - filemtime($e)) > $t ) { //头像不存在或时间超过14天，重新获取
    copy(htmlspecialchars_decode($g), $e);
  } else  $avatar = strtr($avatar, array($g => $w.'/avatar/'.$f.'.jpg'));
  if (filesize($e) < 500) copy($w.'/avatar/default.jpg', $e);
  return $avatar;
}
add_filter('get_avatar', 'my_avatar');
```

#### 加速 PHP 代码

##### 使用最新版的 PHP 

PHP 目前在线上跑的版本有很多，从 5.4、5.5 到最新的 7.1 在线上都有，而自 PHP 7 开始，PHP 的性能有大幅度的提升，所以建议将你的旧版 PHP 升级到最新版的 PHP 7。

> 需要注意的是，部分插件不兼容 PHP 7，要确认使用的插件是否兼容 PHP 7。

##### 控制插件、主题的数量

一方面要尽可能的减少用到的插件，插件越多，程序就越臃肿，运行的效率就越低。确认你是否需要使用到相关的功能？能不能将相关的功能使用其他的方式来引入？对于一些评分较低的插件，可以考虑使用评分更高的同类插件来替换。

另一方面，对于不用的主题和插件，可以将其删除，以减少 WordPress 对目录的扫描。

##### 优化主题

首先，要尽可能的选择框架更小、引用更少的主题，用更少的代码实现更多的功能。对于一些引用文件特别多的主题，可以考虑减少一部分引用文件，去掉一些用处不大的功能。如果实在无法去除，则确保对每个引用文件都进行压缩（minify），去除代码中无用的注释和空格，缩小文件大小。此外，还可以借助诸如 Better WordPress Minify 之类的插件来简化请求，将多个 CSS/JS 文件简化为一个 CSS/JS 文件，也能提升网站的加载速度。

其次，对于主题使用到的函数，可以考虑使用获取缓存数据的函数来替换直接从数据库查询数据的函数。比如`get_the_terms` 和 `wp_get_object_terms`。

> It should be noted that the results from `wp_get_object_terms` are not cached which will result in a db call everytime this function is called. For performance, functions like `get_the_terms()` (which the results of has been cached), should be used.

> `https://codex.wordpress.org/Function_Reference/wp_get_object_terms.`

通过使用缓存数据可以有效减少数据库查询，提升数据的查询结果。

如果一定要从数据库中直接查询，则要注意对查询结果进行缓存，可以使用 [WordPress Object Cache 函数](https://codex.wordpress.org/Class_Reference/WP_Object_Cache)来进行处理。

此外，也要精简主题的结构，去除一些无用的标签，减少 HTML 的代码，也可以有效的提升网站加载速度。

#### 优化图片

这里的图片优化不同于前面的图片优化，前面的优化更多是用户层面的，而这里的图片优化值得是 CSS 雪碧图（Sprites），通过使用 CSS 雪碧图，可以减少 CSS 调用的图片的数量，加速页面的展示。

##### 加入 LazyLoad

为博客加入 LazyLoad 可以让页面不在一开始就加载图片，从而让图片的加载分步进行，能够更好的利用服务器的带宽，将压力分流到整个页面的浏览过程中。除此之外，还可以给你的服务器减少一些请求的压力和流量的使用，如果图片没有被浏览到，则不加载相关的图片。

**使用 ROCKET LAZYLOAD**

到 [https://wordpress.org/plugins/rocket-lazy-load/](https://wordpress.org/plugins/rocket-lazy-load/) 下载插件，在后台启用该插件后，可以设置图片、iFrame 和 YouTube 视频的 LazyLoad。

![](https://postimg.aliavv.com/2018/nz5ch.png)

#### 优化数据库

WordPress 有修订版本的功能，可以使用插件来删除旧文章的修订版本，来优化数据库，达到更好的查询效果。

##### 安装 WP-Optimize

可以到 [https://wordpress.org/plugins/wp-optimize/](https://wordpress.org/plugins/wp-optimize/) 下载插件，并在后台安装、启用插件。

**清除数据库中的垃圾**

打开后台的 WP-Optimize 插件页面，勾选要优化的项目，单击上面的  **Run All Selected Optimizations** 选项，即可进行优化。

![](https://postimg.aliavv.com/2018/75loz.png)

#### 开启 ETag

在为我们的博客打开 ETag 后，浏览器将自动判断内容是否更新，如果未发生更新，则使用旧的数据，这样可以有效帮助我们减少网页的加载，提升页面的加载速度。

在 WordPress 中，我们可以通过安装 [Smart WordPress](https://wordpress.org/plugins/smart-wp/) 插件来开启 ETag。

插件安装完成后，进入插件的设置页面，可以看到有这样的选项，勾选选项打开 ETag 的插入即可。

![](https://postimg.aliavv.com/2018/tul7r.png)

这个插件除了可以帮助我们控制 ETag 以外，还可以帮我们设置 `Last-Modified ` Response Header。

![](https://postimg.aliavv.com/2018/c60j7.png)

以及 `Cache-Control` Response Header。

![](https://postimg.aliavv.com/2018/flm24.png)

通过上述的这些设置，可以帮助我们有效的提升浏览器对博客缓存的利用率。

#### 加速浏览

鼓励和提醒你的用户使用最新版的高性能浏览器，如 FireFox、Opera、Chrome，这些浏览器的高性能渲染引擎会比 IE 有更好的表现，间接实现了对 WordPress 的加速。
