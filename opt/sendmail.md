## 轻松玩转 WP：如何使用 WordPress 的邮件发文功能

> 在之前的读者圈内，有读者问到我，如何通过邮件来发布 WordPress 文章，之前就说要补充这部分的内容，一直没顾上，今天把这个内容补充上来。

本篇内容主要分为两个部分，分别是如何利用 WordPress 自带的「通过电子邮件发布」功能（不推荐使用，仅作了解），并介绍了一个功能更强的发布插件「Postie」（推荐使用）。

### 使用「通过电子邮件发布」功能发布文章

WordPress 本身提供了通过电子邮件发布的功能，如果你只是希望实现用电子邮件发布文章的能力，那么这个功能已经满足你的要求了。

不过，同样因为是 WordPress 官方提供的功能，在功能的设计上并没有我们所希望的那么完善，而且，根据官方的说明，这个功能也将在未来的某个时间点，从 WordPress 中移除掉（The built-in WordPress functionality is deprecated and will be removed in an upcoming release.）。好在目前这个功能并没有被去掉，而你不希望被众多插件拖慢速的话，这个自带的功能还是很不错的。

话不多说，接下来，我们开始配置 WordPress 自带的通过电子邮件发送的功能。

#### 1.准备邮箱

无论是使用自带的功能，还是使用第三方插件提供的功能，都需要准备一个邮箱来接收具体的文章，这就要求你准备好一个邮箱，用来接受邮件。

![enter image description here](https://images.gitbook.cn/a754f450-6ace-11e8-be8f-7dfa349ed714)

一般来说，我们可以使用第三方的邮箱来接受邮件，比如 163 邮箱、Gmail、QQ 邮箱等，这里你需要注意的是，建议**使用一个全新的邮箱，并借助于邮箱系统自带的过滤器，来确保无关的邮件不会进入你的收件箱，从而确保你的博客内容不会收到干扰**。此外，你可以使用自建的域名邮箱来作为接收文章的邮箱。

<img src="https://images.gitbook.cn/ad4b4a80-6ace-11e8-95b2-5d9502ef3f23"  width = "60%" />

在选择邮箱时，需要考虑到国内特殊的网络环境，如果你的 WordPress 部署在国内的主机上，最好不要使用 Gmail 等在国内无法正常访问的邮箱，使用国内服务商提供的邮箱可以确保你的邮箱能够正常的登录和获取邮件。

在完成了邮箱的注册等操作后，注意要到邮箱的设置界面去设置开启 POP 服务，如果未开启该服务，则无法让 WordPress 登录你的邮箱来获取邮件和邮件内容了。

![enter image description here](https://images.gitbook.cn/b251e980-6ace-11e8-95b2-5d9502ef3f23)

此外，还需要注意的是，国内的一些邮箱采用了独立的授权码机制（比如 QQ 邮箱），在这种情况下，你需要将独立的授权码填写在你的 WordPress 后台的设置界面。

#### 2.设置 WordPress 后台的发布功能

在完成了邮箱的准备后，就可以进入 WordPress 后台，在 WordPress 后台的 「设置」——「撰写设置」页面，找到「通过电子邮件发布」，并将邮箱服务提供商给你的邮件服务器等信息，填写在这里。这里需要注意的是，我们需要在这里指定默认的邮件发布分类目录。

![enter image description here](https://images.gitbook.cn/b6b347d0-6ace-11e8-b510-ebe41f970f61)

设置完成后，单击“保存”按钮，接下来就可以试着使用邮件来发布内容了。

#### 3.测试内容的发布

我们打开自己的私人邮箱，在私人邮箱中，编写一封发向我们的收件邮箱的邮件，用来测试我们的测试内容的发布。

<img src="https://images.gitbook.cn/bc9c7ea0-6ace-11e8-95b2-5d9502ef3f23"  width = "60%" />

发布内容后，打开浏览器，[输入网址](https://yourdomain/wp-mail.php)，将 yourdomain 替换为你自己的域名），来触发 WordPress 去拉取邮件。

<img src="https://images.gitbook.cn/01af99a0-6acf-11e8-be8f-7dfa349ed714"  width = "70%" />

访问完成后，稍等 2 分钟，然后回到站点的首页、刷新，就可以看到我们通过邮件发布的内容了，再根据我们的需要编辑内容，发布即可。

![enter image description here](https://images.gitbook.cn/06293ae0-6acf-11e8-95b2-5d9502ef3f23)

#### 4.设置自动拉取内容

在使用中我们遇见了一个问题，那就是内容无法自动拉取，需要访问特定的域名来触发，如何简化掉这一个流程呢？接下来提供两个思路。

##### **通过用户访问来自动拉取内容**

可以在网页的底部添加一些代码，从而当页面被请求加载时，能够自动去拉取文件，而不需要你手动去拉取，这样就降低了操作的难度，同时还可以借助访客来确保能拿到最新的文章。

##### **通过 Crontab 来自动拉取内容**

本质上来说，想要触发拉取文章，就是需要让 wp-mail.php 被请求，我们可以使用 Crontab 来实现自动的内容拉取。

我们可以在 Crontab 中使用 wget 命令来确保 wp-mail.php 文件被请求。

```php
wget -N https://yourdomain/wp-mail.php
```

将其中的 yourdomain 替换为你自己的域名，然后将其加入 Crontab 中来实现定期的自动访问。比如，你需要每 5 分钟能自动拉取内容，就可以添加如下内容（WordPress 默认限制每 5 分钟检查一次，如果需要更高的频次，则需要在 wp-config.php 文件中设置 `WP_MAIL_INTERVAL` 的值）。

```bash
*/5 * * * * wget -N https://yourdomain/wp-mail.php
```

这样就无需借助于用户的访问来进行内容的拉取，对于一些小的站点来说，能够更加清楚的确保新内容的获取。

如果你刷新的频次太高，就会看到这样的提示：

![enter image description here](https://images.gitbook.cn/0b110740-6acf-11e8-b510-ebe41f970f61)

此外，还可以**  使用各种云监控提供的定时访问功能来触发内容的拉取**，这个和 crontab 的用法基本一致，可以参考各个平台的说明。

### 使用「Postie」插件发布文章

WordPress 自带的邮件发布功能不完善，无法设置自定义的邮件标题等，因此，推荐你使用 Postie 来实现邮件发布文章。

#### 配置插件

在 WordPress 后台的插件管理界面搜索并按照 Postie 插件，安装完成后，点击提示，进入设置页面。

![enter image description here](https://images.gitbook.cn/0fb5fe40-6acf-11e8-b784-4fdd1e8c8060)

在设置页面中的 「Mailserver」 部分设置收件邮箱的地址（邮箱注册和配置的部分参考使用「通过电子邮件发布」功能发布文章中的第一小节，准备邮箱部分。）

<img src="https://images.gitbook.cn/15985740-6acf-11e8-b510-ebe41f970f61"  width = "80%" />

配置完成后，点击页面底部的「保存更改」，保存配置，然后点击页面右上角的 「Test Config」。

在弹出的页面中搜索 ** `DISABLE_WP_CRON`**，看看这一项的值是不是 Off，如果不是 Off ，就要看看是不是在 `wp-config.php` 中关闭了插件运行所需的 `WP\_Cron`。

然后拖动到底部，找到 「Connect to Mail Host」一栏，可以看到「Successful POP3 connection on port 110」，则说明你的配置是正确的。

<img src="https://images.gitbook.cn/1bbdfad0-6acf-11e8-b510-ebe41f970f61"  width = "80%" />

如果设置错误，则会提醒你报错，比如下面这样的，便是账号密码不匹配。

![enter image description here](https://images.gitbook.cn/5ec34470-6acf-11e8-be8f-7dfa349ed714)

除了邮箱账号密码的设置以外，还有一个很重要的设置便是自动检查频次的设置，在下方的「Check for mail every」部分可以设置检查邮箱的频次，默认是 30 分钟一次，可以根据你的需要，调整检查的频次。

![enter image description here](https://images.gitbook.cn/6dd377f0-6acf-11e8-b784-4fdd1e8c8060)

此外，建议你设置一下 「 Message 」 中的 **Perferred Text Type**，这个项目用于指定默认的邮件类型，默认值是 Text，但是国内的邮件系统大多都是默认 HTML，所以可以也设置为“默认 HTML”。

![enter image description here](https://images.gitbook.cn/7ab92a50-6acf-11e8-95b2-5d9502ef3f23)

Message 页面下方的配置都是发文章时的一些默认配置，都非常简单，就不再赘述，如果你有需要，可以单独在读者圈进行提问。

配置完成后，保存配置。

#### 发送邮件

在邮箱中新建一封邮件，并发送到我们的邮箱中，等待一个检查周期，就可以看到已经发布了邮件的内容。

![enter image description here](https://images.gitbook.cn/88ae9f00-6acf-11e8-b510-ebe41f970f61)

我们可以看到，WordPress 自动的识别出我们通过邮件设置的格式等。

<img src="https://images.gitbook.cn/94d34b50-6acf-11e8-be8f-7dfa349ed714"  width = "80%" />

#### 自定义目录和标签

在通过邮件发布文章时，可以设置自定义的目录和 tag，这是 Postie 相比于原生功能的优越之处，而且，使用起来非常简单。

如果你需要设置自定义的目录，可以在邮件的标题中指定，使用`[]` 或`- -`来包裹你的目录名即可（需要目录名存在），比如`[category1]`、`- category1 -`。

如果你需要设置自定义的标签，就在文章的正文中放置 `tags:`，然后放入 tag （不要求存在），不同的 tag 之间使用英文逗号隔开，比如：`tags: cats, funny`。

<img src="https://images.gitbook.cn/a1136ee0-6acf-11e8-be8f-7dfa349ed714"  width = "50%" />

发布后的效果如下：

![enter image description here](https://images.gitbook.cn/af635fa0-6acf-11e8-95b2-5d9502ef3f23)

至此，我们完成了使用 Email 来发布 WordPress 文章的内容，虽然 WordPress 官方提供了通过邮件发布的功能，但是我更加推荐你使用功能完善的 「Postie」 来完成通过 Email 发布文章的需求。
