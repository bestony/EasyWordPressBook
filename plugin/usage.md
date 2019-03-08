## 插件使用

### 为什么要使用 WordPresss 的插件

WordPress 本身的功能非常强大，帮我们集成了文章、媒体、页面、评论的管理功能，但是并不意味着我们的需求就这么简单。实际上，我们可能有很多不同的需求，比如说，我想在博客文章中插入一个来自网易云音乐的音乐播放器？有没有一个很方便的工具呢？又或者我觉得 WordPress 自带的编辑器不够好用，有没有办法换一个编辑器呢？

WordPress 面向的用户是全体互联网用户，并非针对某一类开发者，对于我们这些开发者来说，可能可以通过修改核心代码来实现，但是更加海量的用户则无法以这种方式来满足自己的需求，因此，便有了插件系统，可以通过安装插件，来实现自己的需求。

除此之外，使用插件还有一些其他的好处：

- 无需修改核心代码，不用担心更新版本导致的功能失效。
- 无需担心修改核心代码导致系统崩溃。
- 使用者不需要了解底层的原理，直接安装使用即可。

得益于这些插件，WordPress 也成为了世界第一 CMS （内容管理系统）。

截止目前，在 WordPress 官方上架的插件已经达到了 53527 个，此外还有在 codecanyon 上架的众多付费插件。可以说，你的绝大多数需求，都能够找到合适的插件来满足。

### WordPress 后台插件管理

#### 管理插件

打开 WordPress 后台，点击左侧菜单栏中的「插件」—「已安装的插件」，你就会看到我们所安装的所有插件。默认情况下，WordPress 会安装「Akismet Anti-Spam」和「Hello Dolly」两款插件，其中前者是 WordPress 自带的反垃圾评论的插件，我在第五课「WordPress 常用插件使用说明（一）」中说明过，如果不会使用建议去看看那篇课程，后者则是 WordPress 创始人 Matt Mullenweg 创建的默认插件。

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fmufg8aukzj30f30asjrm.jpg"  width = "80%" />

在插件列表中可以对插件进行管理，比如「启用」一个插件，使一个插件实现效果，或者「停用」一个插件，让它不再实现效果。如果某个插件你认为以后再也不会使用，则可以点击「删除」按钮，删除这个插件。

> 记得，插件越多，就会变得越慢。

在插件列表中，还可以获取到所有和插件相关的信息，诸如插件的版本号、开发者信息、使用说明等等。  

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fmufpdbcjij30ha0d8wew.jpg"  width = "80%" />

当下载了一个插件不会使用时，可以点击「查看详情」，在详情页面查看插件的具体使用说明。

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fmufsqa5d7j30m60q2n0w.jpg"  width = "80%" />

通过详情窗口可以很方便的了解到一个插件的各方面信息，对于一些功能性的插件，会在这个页面提供使用说明、常见文件等内容，帮助你使用这个插件。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmufu6f7dqj30ee061mx4.jpg)

除了对单独一个插件进行操作以外，还可以批量对插件执行操作，比如批量启用插件、批量停用插件等等。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmufygi1fhj30lh0af0ub.jpg)

至此，我们对于插件的基本操作，就解说完了。

#### 安装插件

安装插件一般来说，有三种方式。

##### 1. 使用插件中心安装

一般来说，推荐大家使用插件中心安装，使用插件中心安装的好处是插件都是从 WordPress 官方的插件仓库中下载，无需担心自己下载到的插件是经过修改的。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmug06fek8j304g03sq2q.jpg)

点击「插件」—「安装插件」，就会进入到插件管理页面，点击「安装插件」，就会进入到插件中心。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmug5gkdkgj31c20q6tbp.jpg)

在插件中心你可以在搜索框搜索要安装的插件名称，就能找到你要的插件，也可以点击底部的标签，选择合适你的插件。通过搜索，可以搜索到大量的插件。

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fmug9zdimmj30in0jw0tf.jpg"  width = "70%" />

点击「更多详情」，确认这个插件是你需要的插件后，返回点击「现在安装」，就可以轻松的将这个插件安装到 WordPress 站点上。

还可以点击上方的「热门」、「推荐」查看当前阶段比较热门的插件来安装。

> 虽然有很多插件都可以使用，但是不建议大家安装过多的插件，会导致站点运行速度缓慢。根据自己的实际需要安装即可。

##### 2. 使用后台上传进行安装

有些时候，可能拿到手的插件是一个 Zip 压缩包，比如如下的场景：

> 1. 你的主机无法与 WordPress 官方服务器进行通信，从 WordPress 官网下载了需要用的插件。自行安装。
> 2. 从 codecanyon 下载了一个付费插件，需要自己安装。
> 3. 从 Github 或其他代码托管平台下载了一个开源插件，需要自己安装。

这个时候，就要从 WordPress 的插件后台进行安装了。

比如说，我下载了 https://github.com/twitter/wordpress 这个插件，下载到本地的是一个压缩包。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmugof2h8gj304u06w3yd.jpg)

将压缩包解压后，是这样的：

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fmugp7g9y2j30mi0gyglx.jpg"  width = "60%" />

这时，进入 WordPress 后台，选择「插件」—「安装插件」，单击上方的「上传插件」按钮：

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmugq7xvqtj30bo043mx2.jpg)

这时会弹出一个上传的输入框，点击输入框中的选择文件：

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fmugs85pjgg30gl06z3yq.gif"  width = "70%" />

上传成功后，会看到这样的界面：

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fmugrhgxesj30ea05hjrc.jpg"  width = "70%" />

这就说明安装成功了，这时可以点击「启用插件」按钮来进行安装。

> 如果上传以后，提示没有找到有效的插件，就像下面这样：
>
> <img src="https://ws1.sinaimg.cn/large/006tNc79gy1fmugusii3sj30ap05iglk.jpg"  width = "50%" />
>
> 则可能是你的插件目录放的太深了，插件文件应该在压缩文件的根目录中。即下图，压缩包 akismet 的根目录中存放着插件文件。
>
> ![](https://ws1.sinaimg.cn/large/006tNc79gy1fmugwsgc0wj308o088745.jpg)

##### 3. 使用 FTP 进行上传安装

在有些特殊情况下，我们可能无法通过 WordPress 对目录进行写操作（安全控制），此时，可以使用系统自带的 FTP 进行上传。

1. 解压你下载好的插件到本地。
2. 打开 FTP 软件，登录到虚拟主机上，将目录切换到 WordPress 的根目录下。
3. 找到 `wp-contnet/plugins/`目录。
4. 将整个插件文件夹上传到整个目录中。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmuh9arb6cj31kw0hewfr.jpg)

这样，就可以将插件上传到 WordPress 当中，然后到 WordPress 后台去启用插件即可。

#### 修改插件

在某些特殊的情况下，我们可能要对一个插件进行一定的修改，比如修改代码、添加 API key （一些涉及到了第三方服务的插件）等。这个时候，可以选择通过 FTP 进行修改，不过也可以通过 WordPress 后台进行修改。

进入 WordPress 后台，点击「插件」— 「编辑」，就可以进入到插件编辑界面。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmuios99jfj308w07kjr8.jpg)

插件的编辑页面整体可以分为两部分，左侧的代码框和右侧的文件框。

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fmuiunk84aj31740y6go7.jpg"  width = "80%" />

在右侧点击文件，左侧就会自动加载相关文件，然后就可以在左侧的代码编辑区域修改对应的文件内容。

针对 PHP 文件中的函数，WordPress 还提供了方便的函数查询的功能，点击下方的文档后的下拉框，会看到这个文件使用的具体的函数，当选择了一个函数后，点击后面的查询按钮，就会自动跳转到这个函数的说明页面。十分的方便。

<img src="https://ws1.sinaimg.cn/large/006tNc79gy1fmuixw5ftaj30je0d2gm1.jpg"  width = "70%" />

如果进入后，你发现当前加载的插件不是你需要修改的插件，你可以点击右上角的插件列表进行修改。

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fmuj0ww6emj30io03g0sp.jpg"  width = "70%" />

点击下拉菜单选择合适的插件，并点击选择，就会跳转到对应的插件了。
