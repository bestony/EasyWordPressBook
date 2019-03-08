### WordPress 性能优化：动静分离

#### 总论

##### 为什么网站打开速度很重要

当用户第一次登录你的网站时，如果你在最开始的几秒钟没有捕捉到他们的注意力，没有让他们对内容产生兴趣，他们可能马上就关掉网站。调查显示如果网站 3 秒内没有打开，那么将会有 40% 的用户离开。如果网站加载时间太长，用户还没看就走了，那就白白流失了一个访客。

此外，网站速度还将影响你的网站在搜索引擎中的排名，速度缓慢、跳出率大，都会导致排名下降，流量减少。

接下来，我会用大约 4 节课的篇幅讲讲如何优化？

##### 如何分析网站速度慢的原因

想要进行优化，首先要搞清楚问题在哪，找到问题的源头，才能更好的解决问题。

排查网站加载速度的问题一般可以使用 Chrome 自带的 Devtools 来进行检查。在 Devtools 中，我们可以看到每个文件的加载时间、加载顺序、加载大小等等。通过这个时间，可以很方便的找到我们的网站速度到底慢在哪。

![](https://postimg.aliavv.com/2018/1h0jn.png)

此外，可以安装 WordPress 插件 Debug Bar 来调试数据库查询，并借此对耗时较长的数据库查询进行优化。

![](https://postimg.aliavv.com/2018/5hg8i.png)

此外，还可以借助一些其他的浏览器插件来进行网站速度的判别，比如 [Yslow](https://chrome.google.com/webstore/detail/ninejjcohidippngpapiilnmkgllmakh)。

![](https://postimg.aliavv.com/2018/jt6f9.png)

#### 加速：提升带宽

##### 最直接的方法：提升带宽

如果使用的是虚拟主机，那么一般来说不会存在太多的带宽问题，服务商一般提供的都是 100M 的网络，更多应该关注的是你的流量是否够用。

如果使用的是国外的 VPS，如 Linode、DigitalOcean、Vultr 等，那么你的带宽也不太是问题，你的问题更多是主机延时太高，导致请求的基本线比较高。

不过应该有不少人使用的还是国内的云主机，国内的云主机有个很大的特点，就是带宽贵，大部分人购买的可能都是 1M-5M 以内的云主机，很少有人会买更高的带宽，因为 5M 以上带宽的价格会飙升。

我们的网站大多数情况下都需要加载很多文件，各种不同的样式表、各种功能的 javascript 文件、各种图片，如果带宽很小（如 1M），那么加载速度就可能受到影响。因为云主机的带宽是固定的，如果图片的下载将带宽占满，那其他文件的下载就必定会卡住，所以，最直接的方案就是提升带宽。通过提供一个足够大的带宽，保证各个文件的下载。带宽变大，除了可以保证其他文件的下载，还可以保证让你的文件更快的被下载。

##### 动静分离

在有些时候，我们没有办法提升带宽，毕竟当已经到了 5M 时，每 M 的提升价格都远超之前。不过，除了提升带宽，我们也的确有一些其他方法来加速网站，这就是——动静分离。

动静分离就是将网站的主程序（动态文件）和附件（静态文件）进行分割。虽然并没有实质上提升我们的带宽，但是通过将静态文件拆分，变相达到了动静分离的效果。

##### 使用各种云存储来实现动静分离

目前各大云计算服务商都提供了云存储业务，而一些独立的云存储服务商也都干的有声有色。一般来说，我们可以选择[阿里云的 OSS](https://oss.console.aliyun.com/overview)、[又拍云的云存储](https://console.upyun.com/register/?invite=BJNB_q2D-)、[七牛云的云存储](https://portal.qiniu.com/signup?code=3lh4p6616cor6)。

其中，如果主机是阿里云的，推荐使用[阿里云的 OSS](https://oss.console.aliyun.com/overview)，这样可以在数据存储时使用内网上传，不占用外网的带宽。同理，如果使用的是腾讯云的云主机，也可以使用[腾讯云的 COS](https://console.cloud.tencent.com/cos)。

各家为了方便用户接入，基本都提供了对应的插件，具体可以看下表，将各家的免费额度也标注了出来。

|厂商|免费额度|插件地址|使用说明|
|---|---|---|---|
|阿里云OSS|无|[插件地址](https://github.com/IvanChou/aliyun-oss-support)|[使用说明](https://github.com/IvanChou/aliyun-oss-support/wiki/Quick-start)|
|腾讯云COS|[免费 50G 存储，10G 流量](https://cloud.tencent.com/document/product/436/6240)|[插件下载&&说明](https://www.slmwp.com/cos-sync-plugins.html)||
|又拍云|[免费 10G 存储，15G 流量](https://www.upyun.com/league)|[插件下载](https://github.com/ihacklog/hacklog-remote-attachment-upyun)|[教程地址](http://80x86.io/post/hacklog-remote-attachment-upaiyun-version)|
|七牛云|[免费 10GB 存储，免费 10GB 流量](https://www.qiniu.com/prices)|[插件地址](https://wordpress.org/plugins/wpjam-qiniu/)|[插件说明](http://blog.wpjam.com/project/wpjam-qiniutek/)|

当接入了对象存储后，你的附件都将上传至对象存储，加载的链接也会变成对象存储的链接，从而减少了从主站加载数据的需要。

> 留个思考题：有没有想过我们在第 4 课，媒体设置中的文件上传配置能如何帮助我们进行动静分离呢？

##### 使用 CDN

在某些情况下，你可能觉得使用动静分离很麻烦，那有没有相对简单一点的方法呢？有。你可以试试 CDN （内容分发网络）。CDN 可以把网站中的内容缓存到一个个 CDN 节点，用户访问时会先访问 CDN 节点，如果 CDN 节点中有相关的内容，就不会再回源，请求你自己的服务器。

在使用 CDN 时，需要注意给你自己的网站开启网站静态化缓存（WP Super Cache），再在 CDN 处开启缓存，不然如果没有缓存，每次访问都会请求源站，反而可能会让你的网站变得速度更慢。

##### 压缩图片

如果上述动静分离的方法对于来说，有一些麻烦，也可以选择将图片压缩从而来减少加载的时间。毕竟大部分情况下，一个页面中最大的还是图片。

图片压缩一般来说是两种方式，在上传之前的手动压缩和上传之后的程序自动压缩。

##### 使用 tinypng.com 进行手动压缩

Tinypng 是一个在线的图片压缩服务，可以压缩 png 或 jpg 文件，可以在上传图片前先将文件批量上传到 Tinypng 中进行压缩，然后再上传到博客去。

![](https://postimg.aliavv.com/2018/r1oqc.png)

如果一次性上传了多个图片，可以单击下方的 download all 按钮来下载所有图片。

此外，如果感觉麻烦，也可以使用其官方推出的 [WordPress 插件](https://wordpress.org/plugins/tiny-compress-images/)。

![](https://postimg.aliavv.com/2018/tp8zn.png)

不过这个插件每个月只能压缩 500 张图片，所以在使用时注意设置。

![](https://postimg.aliavv.com/2018/eo96m.png)

##### 使用 Smush 插件压缩图片

Smush Image Compression and Optimization 是 WPMU 团队推出的图片压缩插件。

**下载并安装插件**

到 [https://wordpress.org/plugins/wp-smushit/](https://wordpress.org/plugins/wp-smushit/) 下载插件，并在 WordPress 后台上传、安装、启用。

**设置**

安装完成后，会有一些设置项，可以根据我下方的解释，选择合适的选项。

![](https://postimg.aliavv.com/2018/m4ll8.png)

设置完成后，单击 **Get Started** 按钮，即可进入插件页面。

**旧图片压缩**

进入插件页面会看到提示：你有旧的图片需要压缩，单击 **Bulk SMUSH** 按钮，即可压缩已有附件。

![](https://postimg.aliavv.com/2018/x7d9c.png)

压缩完成，即可看到相关的压缩信息：

![](https://postimg.aliavv.com/2018/v73by.png)

#### 加入预加载功能

我们可以通过一些标签，为博客页面加入预加载功能，分别是`dns-prefetch`、`preconnect`和`prerender`。

通过在网页中加入如下代码，则可以实现 DNS 的预解析：

```
<link rel=”dns-prefetch” href=”//wordpress.dev”>
```

在新的页面加载前，先请求 DNS 的地址，减少解析的时间。

在网页中加入如下代码，则可以预先建立链接，通过预链接，浏览器后续可以直接使用准备好的链接获取数据，提高链接效率。

```
<link rel=”preconnect” href=”//wordpress.dev”>
<link rel=”preconnect” href=”//cdn.wordpress.dev” crossorigin>
```

在网页中加入如下代码，可以让网页预先加载好下一页的数据，对于多页的数据，可以实现体验更好的加载。

```
<link rel="prerender" href="//wordpress.dev/?p=3">
```

当用户单击“下一页”按钮时会嗖的一下就跳到下一页去，极大地提高了用户体验。

看到这里，相信读者会有点崩溃，这怎么设置？难道一个个手动加？并不用，可以安装 [WordPress Instant Articles](https://wordpress.org/plugins/instant-articles/) 插件来实现相关的功能。
