### 购买虚拟主机 && 设置域名解析

课程实践目标：一步一步完成 WordPress 站点的建立。

### 购买基础设施

在课程的一开始，要完成课程购买的内容，当跟着这个流程完成了购买后，也就基本掌握了虚拟主机和域名的设置，对于后续的课程、WordPress 的使用，都提供了帮助。

### 购买虚拟主机

进入[阿里云的虚拟主机页面](https://wanwang.aliyun.com/hosting/)，找到其中的共享普惠版虚拟主机。

![](https://postimg.aliavv.com/2018/ovdg0.png)

进入购买页面后，有多种可选方案，个人建议购买云解析的版本会比较实惠。

> 因为这个虚拟主机只是测试机，域名解析不和我们的主机绑定，另外两项和我们的主机绑定。

![](https://postimg.aliavv.com/2018/iiuql.png)

购买时注意操作系统选择 Linux，不然基础环境就是 Asp.net 了。

![](https://postimg.aliavv.com/2018/35nji.png)

确认订单并支付。

### 购买域名

接下来购买域名，这里我们选择**可以备案**的后缀**.xyz**。

> 如何知道一个后缀是否可以备案？
> 进入 [http://www.miitbeian.gov.cn/publish/query/indexFirst.action](http://www.miitbeian.gov.cn/publish/query/indexFirst.action) 在左侧选择域名类型进行搜索查询，能够查到的就能备案。

在万网首页输入要注册的域名，将后缀选择为 .xyz ，会进入到查询页面。

![](https://postimg.aliavv.com/2018/0j3hb.png)

如果查询到该域名未注册，就可以将其加入清单中，并单击**去结算**按钮。

![](https://postimg.aliavv.com/2018/f5czs.png)

在新的页面中，确认订单信息，并选择域名的所有者。

![](https://postimg.aliavv.com/2018/9cmsh.png)

此外，记得勾选域名隐私保护，不然接下来可能会有无数的骚扰电话、骚扰邮件发送给你。

> 如果域名信息填写的内容是虚假的，ICANN 是有权收回你的域名的，所以尽量选择真实的信息+域名隐私保护。

![](https://postimg.aliavv.com/2018/zx0o3.png)

确认完信息，支付订单即可。

### 管理虚拟主机

进入 [https://netcn.console.aliyun.com/core/host/list2#](https://netcn.console.aliyun.com/core/host/list2#) 管理控制台，就可以看到虚拟主机了。

![](https://postimg.aliavv.com/2018/t8f3g.png)

单击“管理”链接，即可进入到虚拟主机的管理界面。

首先，需要设置一系列的账户密码：

![](https://postimg.aliavv.com/2018/84lys.png)

>这里的密码要记清楚，稍后我们要用到。

然后验证手机或邮箱：

![](https://postimg.aliavv.com/2018/8kc1q.png)

设置完成后，会看到一系列的账户信息，可以将其保存在笔记本中。

> 不妨试试印象笔记？[“职场高效率：用印象笔记来提升你的工作效率”](http://gitbook.cn/books/59bc8da5c602a07381e3b5bd/index.html)

![](https://postimg.aliavv.com/2018/4x1lk.png)

单击上方的**进入管理控制台**按钮，可以进入到我们的虚拟主机页面。

在这里，我们可以看到一系列可能会用到的设置项。

### 环境基础设置

在上传文件前需要修改一些配置。

#### 绑定域名

万网的虚拟主机和域名对接的很好，我们可以很方便的绑定域名。

单击左侧菜单中的**域名管理** | **域名绑定**命令，在新的页面中单击“绑定域名”按钮，并在弹出的对话框中设置域名，或者在下方的选择框中选择要绑定的域名。

![](https://postimg.aliavv.com/2018/5fcl8.png)

绑定成功后会看到，它会提示域名未备案，所以暂时我们还不能使用自己的域名去访问，需要将自己的域名备案后才能访问。

![](https://postimg.aliavv.com/2018/8jap0.png)

### 上传文件

首先，下载 WordPress 的源代码，前往 [https://cn.wordpress.org/](https://cn.wordpress.org/) ，单击页面中的**下载 WordPress 4.9**按钮，下载源代码。

![](https://postimg.aliavv.com/2018/31l33.png)

下载完成后，将源码解压出来。

> 上传文件我们使用的是 FTP 协议，这里使用的软件是 FileZila，读者也可以到软件的官网下载：[https://filezilla-project.org/](https://filezilla-project.org/)

回到虚拟主机管理管理控制台，单击上方菜单栏中的**站点信息**按钮，进入到控制台主页面。我们可以看到 FTP 链接信息。

![](https://postimg.aliavv.com/2018/euexo.png)

打开 FileZila ，将这几项分别填入输入框内。

![](https://postimg.aliavv.com/2018/bmmwb.png)

单击快速链接。

连接成功后，在左侧的本地站点链接中，找到 WordPress 源码文件目录，就像上图中那样。

右侧的远程连接则进入到 htdocs 目录下：

![](https://postimg.aliavv.com/2018/jagwl.png)

删除其中的 zhuye.html，并回到左侧，选中所有文件，将其上传到当前目录。

![](https://postimg.aliavv.com/2018/h28z5.gif)

等待其上传完成。

### 访问测试

回到管理控制台，复制我们的临时域名，到浏览器中打开，可以看到这样的界面。

![](https://postimg.aliavv.com/2018/3lir6.png)

输入 FTP 密码，就会看到正常的页面了。

![](https://postimg.aliavv.com/2018/89j93.png)

**安装 WordPress**

当备案完成后，进入备案好的域名，会重新看到 WordPress 的安装界面。

![](https://postimg.aliavv.com/2018/89j93.png)

单击**现在就开始!**按钮，输入数据库信息，并单击**提交**按钮：

![](https://postimg.aliavv.com/2018/zs63b.png)

> 数据库信息可以在虚拟主机管理控制台获取：

![](https://postimg.aliavv.com/2018/2ak7x.png)

在新的页面单击“立即安装”按钮，会进入到站点信息配置，设置具体的站点信息，然后单击**安装 WordPress**按钮，就会开始安装。

![](https://postimg.aliavv.com/2018/8y7e0.png)

当看到这样的界面时就说明安装好了，这样就完成了最基本的 WordPress 部署了。

![](https://postimg.aliavv.com/2018/0sxz1.png)


