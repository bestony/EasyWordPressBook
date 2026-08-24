# WordPress 常用插件使用说明（一）

本节课和下节课我们介绍一些常用的插件的使用，具体包括如下插件：Akismet、WP-Postviews、BackWPup、Google Authenticator、Crayon Syntax Highlighter、XML Sitemap & Google News feeds、WP-Optimize、mailgun、TablePress。

#### Akismet

插件地址：[https://wordpress.org/plugins/Akismet/](https://wordpress.org/plugins/Akismet/)

Akismet 是 WordPress 自带的反垃圾评论插件。如果博客的评论系统使用的是 WordPress 自己的评论系统，而没有对接诸如 Disqus 之类的第三方评论系统，则本插件一定要装。

Akismet 对接了其反垃圾服务器，任何评论将发送到其服务器，判断是否是垃圾评论，则将其放在垃圾邮件分组中，会节省大量的时间。

在启用该插件后，需要设置 Akismet key，而这个 Key 需要使用 WordPress.com 的账号登录 [Akismet.com](https://akismet.com/account/add-subscription/choose-plan) 获取。

##### 创建 API Key

登录成功后，如果是第一次登录，会看到如下界面，单击其中的 **Add Personal Subscription** 按钮。

![](https://postimg.aliavv.com/2018/nlslu.png)

滑动下方的下拉条，拖动到 0 元每年，单击 **Create Subscription** 按钮。

![](https://postimg.aliavv.com/2018/8txp7.png)

稍等片刻，就会看到订阅创建成功。

![](https://postimg.aliavv.com/2018/qnq26.png)

将页面中的 AKISMET API KEY 复制出来：

![](https://postimg.aliavv.com/2018/czrfj.png)

粘贴到 WordPress 后台的 Akismet 设置页面，并连接即可。

![](https://postimg.aliavv.com/2018/dqnk9.png)

##### 设置 Akismet

连接完成后，可以设置插件选项，根据自己的需要设置下面的设置项。如果你和我一样，担心会丢失评论，可以勾选“总是将垃圾放入垃圾目录以便审阅”选项。

![](https://postimg.aliavv.com/2018/jjbi7.png)
 
#### WP-Postviews

插件地址：[https://wordpress.org/plugins/WP-Postviews/](https://wordpress.org/plugins/WP-Postviews/)

WP-Postviews 会统计每篇文章的阅读量，可以通过一个特定的标签输出到前台，很多主题都集成了这个插件。如果你的主题没有集成，也可以自行为主题接入。

> 在需要展示的地方调用 `<?php the_views();?>` 即可。

##### 插件设置

WP-Postview 安装完成后会新增一个设置页，可以通过修改设置来更好的使用该插件。

![](https://postimg.aliavv.com/2018/vewog.png)

一般来说，我们要修改 Views Template，比如改为 `%VIEW_COUNT%人看过`。

下方的 Most Viewed Template 则是设置小工具的样式，WP-Postviews 默认注册了一个小工具，我们可以在主题的小工具中设置。

![](https://postimg.aliavv.com/2018/tk44s.png)

然后回到主页，就可以在侧边栏中看到了。

![](https://postimg.aliavv.com/2018/1c8xy.png)

如果你的主题有特殊的样式，根据在设置页面进行修改即可。此外，还可以设置是否在特定的页面展示阅读量。

![](https://postimg.aliavv.com/2018/uafi1.png)

#### BackWPup

插件地址：[https://wordpress.org/plugins/BackWPup/](https://wordpress.org/plugins/BackWPup/) 。

BackWPup 是一款非常好用的备份插件，我们可以使用它来备份网站数据，以防数据出现问题后，无法恢复。

##### 创建备份任务

首先，我们要创建一个备份任务，点击左侧菜单**BackWPup** | **Add New Job** 命令，可以设置各种选项：

![](https://postimg.aliavv.com/2018/grr0x.png)

这一部分比较核心的是 Job Destination，就是备份目标位置。

![](https://postimg.aliavv.com/2018/u9pj5.png)

以 FTP 来为大家演示。

设置完上面的选项后，单击下方的 save changes 按钮，保存设置。

保存刷新后，会发现顶部的 tab 多了一个 **To:FTP** ，单击进去可以设置 FTP 服务器的具体配置信息。

比如，使用又拍云作为备份的服务器，具体配置如下：

![](https://postimg.aliavv.com/2018/wqxs3.png)

配置完成后，单击 save changes 按钮，保存设置。

![](https://postimg.aliavv.com/2018/abcwl.png)

单击 Run now 按钮，就可以开始运行备份任务，当你看到这样的界面，则说明备份成功。

![](https://postimg.aliavv.com/2018/udtxa.png)

可以登录到 FTP 确认一下。

![](https://postimg.aliavv.com/2018/yoypa.png)

##### 设置自动备份

打开 [EasyCron.com](https://www.easycron.com/user/token?ref=95671)，登录后，可以看到这样的界面。

![](https://postimg.aliavv.com/2018/t9u13.png)

单击菜单栏中的 API 选项：

![](https://postimg.aliavv.com/2018/d49f1.png)

复制页面中的 API token，回到 WordPress 后台，单击左侧菜单 **BackWPup** | **Settings** 名，选择 API 。

将我们刚刚复制的 token 粘贴在此，并勾选下方的 *If you check this box, a cron job will be created on EasyCron that all 5 Minutes calls the WordPress cron*选项：
 
![](https://postimg.aliavv.com/2018/v2kzj.png)
 
然后单击 Save Changes 按钮，这样我们就成功接入了 EasyCron 作为定时任务。

这时如果你去看 EasyCron 后台，会看到这样一条记录：

![](https://postimg.aliavv.com/2018/kcta0.png)

这就是插件自动生成的任务。

单击左侧菜单 **BackWPup** | **Jobs** 命令，找到刚刚创建的任务，单击 Edit 按钮，进入后，切换到 Schedule Tab，将 Start Job 改为 `with EasyCron.com`。

下方就会出现具体的备份频次配置，根据你的需要配置，并保存即可。

![](https://postimg.aliavv.com/2018/cqopr.png)

#### Google Authenticator

插件地址：[https://wordpress.org/plugins/google-authenticator/](https://wordpress.org/plugins/google-authenticator/)

Google Authenticator 可以帮助我们在 WordPress 上加入两步验证的插件，在 WordPress 中启用插件以后，再次登录就需要输入验证码了，为 WordPress 站点增加一重保障。

##### 设置

启用插件后，单击**用户**中的**我的个人资料**选项，会看到如下设置项：

![](https://postimg.aliavv.com/2018/srhl4.png)

首先，修改下方的描述，设置为你的博客的名字，或者是你自己自定义的名字，然后单击密钥右侧的**显示/隐藏 QR 码**，会看到下方出现一个二维码。使用安装好的两步验证软件（我使用的是 Authy）扫描这个二维码，然后在应用中确认保存。保存完成后，勾选上方的启用，并更新个人资料。

![](https://postimg.aliavv.com/2018/4kxk6.jpg)

这样，我们就配置好了两步验证。

##### 测试登录

退出账号，重新登录，会发现多了一个密码框，再登录就需要输入你的两步验证软件中的动态口令了。如果没有填写，则会提醒验证码有误。

![](https://postimg.aliavv.com/2018/neh4q.png)

输入正确的验证码，就可以正常登录了。
