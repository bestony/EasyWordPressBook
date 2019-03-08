### WordPress 常用插件使用说明（二）

#### Crayon Syntax Highlighter

插件主页：[https://cn.wordpress.org/plugins/crayon-syntax-highlighter/](https://cn.wordpress.org/plugins/crayon-syntax-highlighter/)。

大家都是写代码的，自然是免不了在博客中粘贴一些代码，WordPress 中最出名、功能最强大的代码高亮工具莫过于 Crayon Syntax Highlighter。

##### 设置插件

启用插件后，单击**设置** | **Crayon** 命令，进入到插件配置页面。

首先是设置主题，Crayon 拥有多种不同的主题，可以选择你喜欢的主题。

![](https://postimg.aliavv.com/2018/qfrph.png)

如果所有的主题都不满意，也可以自己设计一个。选择一个最满意的主题，勾选复制，生成一个新的主题，然后就可以编辑了。

![](https://postimg.aliavv.com/2018/pljc7.png)

Crayon 的主题编辑器非常的好用，如果不满意其他的主题，不妨自己动手做一个。主题默认提供了很多不同的字体，可以根据自己的喜好选择。

![](https://postimg.aliavv.com/2018/j1vc8.png)

排版则是设置了主题框在文章中的展示样式，一般来说不做修改，保持默认即可。

![](https://postimg.aliavv.com/2018/m4dhm.png)

工具栏设置基本不用改，如果希望更方便复制，则建议工具栏选择始终显示，语言也可以选择使用显示。

![](https://postimg.aliavv.com/2018/g35kd.png)

行设置则根据你的需要选择。

在代码设置中，建议读者将显示方式设置为 **禁止鼠标行为**，因为默认的设置在真正复制时会出现一些问题。

![](https://postimg.aliavv.com/2018/wfugq.png)

标签设置中可以勾选上**捕获 `<code>` 标签为插件所用行内标签** 选项，这样使用 `<code>` 标签的标记的代码也会加入代码高亮。

![](https://postimg.aliavv.com/2018/pjdj5.png)

语言则根据最常用的语言选择即可。

![](https://postimg.aliavv.com/2018/r41c2.png)

最后的其他设置中，一定要勾选**按需加载插件的 CSS 与 JavaScript**选项，不然会在所有页面加载，把网站的速度拖慢。

设置完成后，保存即可。

##### 在文章中添加代码

在文章中添加代码时，可以单击菜单栏中的代码图标：

![](https://postimg.aliavv.com/2018/409zd.png)

在弹出的输入框中输入代码，并单击“插入”按钮。

>如果希望修改具体的设置，可以修改下方设置的具体内容。

![](https://postimg.aliavv.com/2018/obtgp.png)

回到前台，我们就可以看到渲染的效果了。

![](https://postimg.aliavv.com/2018/zv002.png)

#### XML Sitemap & Google News feeds

插件主页：[https://cn.wordpress.org/plugins/xml-sitemap-feed/](https://cn.wordpress.org/plugins/xml-sitemap-feed/)

XML Sitemap 能够帮助我们生成合规的 SiteMap，帮助爬虫更好的访问我们的网站。

##### 插件设置

插件启用后，单击**设置**|**阅读**命令，可以看到插件的具体配置。

其中 Google News Feeds 对我们大多数人都没用，就不再介绍了，这里只说一下 XML Sitemap。

默认情况下，插件会帮我们打开 Sitemap 的生成。

![](https://postimg.aliavv.com/2018/5lip5.png)

单击“查看”按钮，就可以看到生成的 XML 文件，

![](https://postimg.aliavv.com/2018/auu7h.png)

单击不同的 XML 就可以看到对应的 sitemap 了。

默认情况下，只会生成文章和页面的地址。

如果网站有针对目录和标签进行美化，还可以勾选包含分类中的 **目录** 和标签。

#### WP-Optimize

此部分在第 11 课的优化部分进行讲解，具体请看第 11 课的内容。

#### MailGun

插件地址：[https://wordpress.org/plugins/MailGun/](https://wordpress.org/plugins/MailGun/)

MailGun 是一个非常出名的邮件服务提供商，和国内的 SendCloud 做的是同类项产品，不过 SendCloud 的官方插件已经很久没有更新，所以选择使用 MailGun 的官方插件来作为替代品。

#### 插件设置

在安装完成后，需要去设置账户：

![](https://postimg.aliavv.com/2018/finzt.png)

可以单击[mailgun](https://app.mailgun.com/app/domains)，前往注册账户。

注册成功登录后，MailGun 会默认创建一个发件域名。

![](https://postimg.aliavv.com/2018/8ctey.png)

> 建议你使用自己的域名。

我们使用这个沙箱域名来设置我们的邮件，选择域名，进入详情页面：

![](https://postimg.aliavv.com/2018/mjxk4.png)

我们复制这里的 Domain 和 API Key，填写到 WordPress 插件页面的对应位置。

![](https://postimg.aliavv.com/2018/tlljd.png)

上方的 USE HTTP API 保持为默认的 YES（如果你的虚拟主机不支持对外发送 HTTP 请求，可以设置为 NO，然后通过 SMTP 发送邮件）。

下方的设置可以参考我这里的图片注释来确定是否开启。

![](https://postimg.aliavv.com/2018/6vxvm.png)

设置完成后，就可以保存设置了。

#### 使用 Mailing List

MailGun 插件还提供了 Mailing List 的快速接入功能，可以帮助我们在网站上快速加入一个 Mailing List 的订阅表单。

**创建一个 Mailing List**

在 MailGun 后台选择 mailing list 选项，可以进入到 mailist 的主界面。

![](https://postimg.aliavv.com/2018/5hk2b.png)

选择 **Create Mailing List** 选项，在新的页面设置具体的信息，设置邮件地址、名称、描述、权限。

![](https://postimg.aliavv.com/2018/cqcj0.png)

权限的说明：

> Read Only：大多数人只读，部分用户可以发送邮件，比较适合新闻、公共类型的。

> Members：列表内成员可以自由讨论，比较适合项目交流。

> Everyone：任何人都可以发送邮件，比较适合用户反馈类型的，不过使用时需要注意进行垃圾过滤。

设置完成后，单击**Add Mailing List**按钮，即可创建一个新的列表。

回到 WordPress，在**设置** | **Mailgun Lists** 中就可以看到我们刚刚创建的列表了。

复制这里的短代码，粘贴到任何一篇文章即可在文章下方加入对应邮件列表的订阅入口了。

![](https://postimg.aliavv.com/2018/k2ssp.png)

就像这样：

![](https://postimg.aliavv.com/2018/6e1mk.png)

#### TablePress

插件地址：[https://cn.wordpress.org/plugins/tablepress/](https://cn.wordpress.org/plugins/tablepress/)

WordPress 默认的编辑器是没有 table 的插入的，所以为了方便插入表格，我们可以使用 TablePress 插件。

##### 创建新表格

单击菜单中的 **TablePress** | **新建** 按钮，即可进入到新建表格的页面。

![](https://postimg.aliavv.com/2018/vtab2.png)

设置表格的基础信息后，单击**创建表格**按钮。

在新的页面中展示了表格，可以选中表格，然后输入具体的内容。

![](https://postimg.aliavv.com/2018/ekslf.png)

如果想要在表格中插入连接、图片，可以先单击下方的表格“操作”按钮，再连接上方的表格中的某一项，以输入内容，就像下面这样。

![](https://postimg.aliavv.com/2018/jrf3i.gif)

下方是表格的一些设置，可以根据自己的需要设置。

![](https://postimg.aliavv.com/2018/v5z6q.png)

设置完成后，单击**保存更改**按钮，就可以将表格保存了。

回到顶部，复制表格的短代码`[table id=1 /]`：

![](https://postimg.aliavv.com/2018/0wloy.png)

粘贴到文章中的合适位置即可。具体的渲染效果如下：

![](https://postimg.aliavv.com/2018/c4n57.png)

##### 导入表格

点击菜单中的**TablePress** | **导入表格**命令，可以上传我们自己的表格，方便表格输入。

目前支持导入 CSV、XLS、XLSX 等格式，如果使用 XLS、XLSX 导入不正常，建议使用 CSV 格式，因为 CSV 格式相对简单，出错的可能更小。

![](https://postimg.aliavv.com/2018/1k9zz.png)

选择完成后，设置为新建表格，然后单击“导入”按钮，就会看到我们刚刚创建表格的页面。具体的设置项和我们刚刚创建表格时是一致的。

![](https://postimg.aliavv.com/2018/xxrxj.png)
