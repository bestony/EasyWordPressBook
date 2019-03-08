## 提交你的插件到 WordPress 的官方仓库

开发完了插件，我们肯定希望插件能够给更多的人去使用，让更多的人成为我们的用户，一个很好的渠道便是上架到 WordPress 官方仓库。

上架到官方仓库后，插件会更容易被其他人所认可：「这个插件能够在官方上架，肯定还不错」。这节课，我就来教大家如何上架一个插件。

### 整理插件

即使开发好了一个插件，也并不意味着能够将它上传到 WordPress 当中去。 WordPress 虽然不如  App Store 审核那般严格、复杂，但是仍然会对代码进行 Review ，通过 Review 后，插件才能够上传到 WordPress 官方插件仓库。

除了代码，还需要有一些其他的东西需要遵守，这里一一道来。

#### 1. 使用 GPL v2 作为你的插件开源协议

WordPress 是一个基于 GPL v2 的开源程序，作为其衍生程序的插件，你的程序的开源协议应当于 GPL v2 匹配。具体的列表可以参考 [这里](https://www.gnu.org/licenses/license-list.html#GPLCompatibleLicenses)。

不过，如果为了省事，可以直接使用 GPL v2 作为插件的开源协议。

#### 2. 编写 README.txt

因为你的插件要提交到 WordPress 的官方仓库，而官方仓库内的信息都是基于 README.txt 生成的：

<img src="https://ws4.sinaimg.cn/large/006tNc79gy1fmvfuf8if2j31k01hbtg1.jpg"  width = "60%" />

所以需要写好 readme.txt 。

而其 readme.txt 有其自己的格式，需要按照它的格式来书写。示例文件可以在[这里](https://wordpress.org/plugins/files/2017/03/readme.txt)下载。

```
=== 插件名称 ===
Contributors: WordPress.org 的用户名
Tags: 插件的标签，比如 spam
Donate link: 捐款链接地址
Requires at least: 最低 WordPress 版本
Tested up to: 最高测试的 WordPress 的版本
Requires PHP: 所需 php 版本
Stable tag: 稳定版标签，如 1.0
License: 开源协议
License URI: 协议地址

这里是短描述，会展示在列表中

== Description ==
这里是长描述，会展示在独立的页面中

== Installation ==
具体的安装说明

== Frequently Asked Questions ==
1. 常见问题1
回复内容

2. 常见问题2 
回复内容2

== Screenshots ==
1. 截图1，放在 asset 目录中
2. 截图2，放在 asset 目录中
3. 截图3，放在 asset 目录中

== Changelog ==
=== 1.0 ===
更新日志。最新的放在顶部，旧的在底部
=== 0.9 ===

== Upgrade Notice ==
更新提醒，说明为什么需要更新
```

你可以根据我这里的说明，加入你自己的内容，并将其保存在 readme.txt 文件中，放置在插件根目录。

这里需要注意的是，截图不是放在插件根目录的，具体可以看后续的内容。

#### 3. 插件开发的功能应该是合法的

这个不用我多说，如果真的开发的是一个违法插件，就通过其他渠道发行吧。

#### 4.  未经用户允许，不得在页面插入外部的链接

这个是说不能随意在页面插入外部的链接，比如你自己的「Powered By」链接。如果你想插入，需要征得用户的同意（在插件中做一个设置项目）。

#### 5. 开发者要对自己提供的文件和服务负责

WordPress 官方只会在初次对你的代码进行 Review（在安全部分，我曾提到过），也就是说，除了第一次上传的的代码官方会看，后续的都是不会看的（毕竟没空）。

> 插件的管理是通过 SVN 进行的，可以随意上传你需要的文件，不过如果这些文件出现了问题，可能会对你追责的呦～

#### 6. 及时更新你的代码到官方仓库

将你的代码上传到官方仓库可以让用户更加方便的下载到需要的插件，把最新的代码放在你的开发环境(比如 GitHub 中，下载起来并不方便。

#### 7. 保持你的代码可读性

不要使用诸如 `p`、`a`、`b`之类的单个字符来命名变量或者函数，你可以尽可能的简化代码，但是不能以牺牲可读性为代价。

#### 8.  不允许跟踪用户的信息

未经用户允许，不得追踪用户的信息。

#### 9. 不允许劫持用户的管理面板

避免对用户的管理面板执行过多的干预。

#### 10. 使用 WordPress 提供的库

如果需要在插件中引入一些库，需要使用 WordPress 提供的。具体的列表[详见这里](https://developer.wordpress.org/reference/functions/wp_enqueue_script/#notes)。

#### 11. 不要在 SVN 仓库做日常开发更新

WordPress.org 提供的仓库是用来发布插件的，而不是用来进行日常开发的，日常开发需使用其他版本控制工具。

#### 12. 发布新版本时，更新版本号

发布新的版本时，更新一下你的版本号。

> 更新了版本号后，WordPress 后台会自动提示有插件更新，很方便。

#### 13. 只允许提交完整的插件 

不允许提交一个空白的插件来占「目录名」，你上传的插件必须是可用的插件：

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmvgssxan5j30bv01pa9v.jpg)

### 注册一个 WordPress.org 的账户

想要上传插件到 WordPress 官方，首先你要先在 WordPress.org 注册一个账户，这个账户不同于你在 wordpress.org 上注册的账户，两者并不互通，必须重新注册一个账户。

进入 WordPress 官网，点击顶部菜单中的 Plugins ，进入到插件市场。在插件市场页面，点击页面右上角的 Register ，就能够进入到注册的页面了。

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmvengunfuj30y00d3q36.jpg)

WordPress.Org 使用的也是 WordPress 构建的，所以注册也和 WordPress 相同，输入用户名、邮箱等信息，点击 「Create Account」，系统会自动给你的邮箱发送一封注册确认信。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmvep8gc0ej30az0hiaab.jpg)

确认后，回到 WordPress.org 的插件商城，点击右上角的「Login」登录。

### 提交你的插件

将插件打包成为一个 zip 文件，单击 [这里](https://wordpress.org/plugins/developers/add/)打开页面，登录后会看到这样的界面。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmvh95ip4mj30q60dggly.jpg)

点击 「Select File」，选择刚刚打包的 zip 文件，单击 Upload 按钮，就可以将你的插件添加到审核队列了。

这里我圈出来了两个数字，一个是 review queue ，另一个是  initial review queue，需要关注的是 initial reiview  queue. initial reiview 的多少将会影响插件什么时候会被审核。 review queue  的多少会影响插件后续审核的速度（因为大部分情况下，插件都会有这样或那样的问题，无法一次审核通过。）

提交成功后，会收到一封来自 WordPress 邮件，提醒你插件已经成功提交了：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmvhhg29bnj30ra0g3gmj.jpg)

### 修改插件

在大部分情况下第一次提交都会有一些问题，这时审核团队会给你发邮件，告诉你你的插件有什么问题，然后根据邮件内容去更新代码，并将新的代码以附件的形式回复给审核者。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmvhje1cvlj30rj0czmxo.jpg)

再次发送邮件通过审核后，会收到另一封邮件：

![](https://ws3.sinaimg.cn/large/006tNc79gy1fmvhnqwzutj30r90jqwfg.jpg)

在这邮件中，会得到一个 SVN 仓库的地址，使用 SVN 管理软件将这个仓库克隆到本地。

> 如果不会使用 SVN，建议查看[这篇教程](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/)。

### 上传插件

将仓库克隆到本地后，会发现插件放在 trunk 目录下，其他目录而 assets、branches 、tags 目录下都没有文件。

需要准备一些图片，来作为插件的 Banner 等。

#### Banner

![](https://developer.wordpress.org/files/2015/05/hello-dolly.png)

你需要准备一张标准大小的 Banner (772x250)，格式为 png/jpg。一张高清大小的 Banner(1544x500)，格式为 png/jpg。 

Banner 要放在 assets 目录下，并且Banner 命名为 *banner-772x250.png*、*banner-1544x500.png*。

#### icon

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmvhzafca9j30i306jaa8.jpg)

图标也需要准备2个 png 的，或者一个 SVN 格式的也可以。

如果要使用 png 格式的，需要准备一个 128x128  的和一个 256x256 的。如果是 svg 格式的，只需准备一个。

icon 要放在 assets 目录下，并且icon 命名为 *icon-128x128.png*、*icon-256x256.png*，如果你使用 SVG 格式的，文件命名为 icon.svg。

#### screenshots

截图文件也同样要放在 assets 目录下，并将其命名为 *screenshot-1.png* 、*screenshot-2.png*。

使用时，你要在 readme.txt 中调用。调用方式如下：

> 这是照片说明：一行一张图片，后面跟着说明。

#### 文件存放示意图

文件存放的位置应该和我的示意图一致：

![](https://ws2.sinaimg.cn/large/006tNc79gy1fmvhty4w3fj30810c5gll.jpg)

#### 使用 SVN 上传

文件放置正确后，执行如下命令，即可将插件更新到官方仓库了。

```bash
svn add .
svn commit -m 'upload assets'
```

上传成功后，就可以在插件页面查看到插件下具体信息了。

自此就完成了插件的上传了，后续就可以把插件分析给别人了，或者让别人在 WordPress 后台搜索进行安装。
