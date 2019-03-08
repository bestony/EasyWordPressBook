### WordPress 的环境配置

课程实践目标：在自己的电脑上完成基础环境的配置。

### 在本地的 Mac 电脑上配置开发环境

MacOS 相比于 Windows 有很好的命令行支持，在开发环境上也更友好，系统自带运行 WordPress 需要的 PHP 和 Apache。

不过，为了能够更简单的进行 WordPress 开发，建议读者使用 Laravel 的 Valet 组件来进行 WordPress 开发。

#### 安装 homeBrew

`Valet` 需要 `PHP 7` 环境和 `composer` 来运行，同时还需要 `homebrew` 来安装依赖环境（`Nginx`、`Ngrok`、`Dnsmasq`）。而 `PHP 7` 和 `composer` 环境也可以通过 `homeBrew` 来安装，所以在开始先来安装 `homeBrew`.

打开 LaunchPad，找到 **终端** 应用，在终端应用中粘贴如下命令，并回车。

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

> homeBrew 的安装需要 XCode Command Line 的支持，可以通过执行 `xcode-select --install` 来安装。

待命令执行完毕后，HomeBrew 就安装完成了。可以执行`brew`命令，查看系统返回，如果显示如下所示，则说明安装完成了。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhni0zn9oj30hk0iwdg6.jpg)

#### 安装 PHP 7 和 Composer 

在终端内执行如下命令，来安装 PHP 7 执行环境：

```
brew tap homebrew/php # 添加 php 库
brew update # 更新
brew install php71 # 安装 php71
```

当 PHP 7 安装完成后，我们开始安装 Composer，在命令行中执行如下命令：

```
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv composer.phar /usr/local/bin/composer
```

通过上述的命令，把 Composer 安装到本地目录了。

> 将其移动到 `/usr/local/bin/composer` 主要是为了方便全局运行，这样我们就不用总是使用相对路径来调用 Composer 了。

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhnnr65wkj318s0i6mxr.jpg)

安装完成后，我们要为 Composer 来配置国内镜像（受不可抗力因素影响，官方镜像下载速度缓慢）。

Composer 支持项目加速和全局加速，我们这里没有 Composer 项目，所以选择全局加速。在命令行中执行如下命令：

```
composer config -g repo.packagist composer https://packagist.phpcomposer.com
```

#### 安装 Valet

在命令行中执行如下命令来安装 Valet：

```
composer global require laravel/valet
valet install
```

命令执行完成后，系统就成功帮助我们安装了 Valet 开发环境。

![](https://ws2.sinaimg.cn/large/006tNc79gy1flhnwbehhej30us0bwq3f.jpg)

这时执行 `ping gitchat.dev`，可以看到返回的 IP 地址是 127.0.0.1，则说明环境配置成功。

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhnxsg1u6j30vm0cwt9j.jpg)

#### 配置 Valet 

安装完 Valet，我们还要进行简单的配置，来更好的使用。

首先，来创建网站文件的目录：

```
mkdir -p ~/Developer/php #创建目录
```

然后，将这个目录设置为 Valet 的主目录：

```
cd ~/Developer/php # 进入目录
valet park #配置 Valet
```

这样，在 PHP 目录下创建的任何一个文件夹，都可以通过 `[文件夹名].dev` 的域名进行访问。

#### 安装 MySQL

WordPress 需要 MySQL 作为数据库，接下来我们来安装数据库。

```
brew install mysql
```

安装完成后，可以执行 `brew services start mysql`设置数据库的开机自启动。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flho3k8kjkj31900xgq49.jpg)

可以执行`cat ~/.mysql_secret`来获取 mysql 默认的 root 用户的密码。这个密码稍后要用到，要记下来。

> 如果提示为`No such file or directory`，则说明 root 密码为空。

#### 安装 WordPress

接下来，我们来安装 WordPress。

首先，创建目录，并下载 WordPress 的文件。

```
cd  ~/Developer/php # 进入目标目录
mkdir wordpress  # 创建新的文件夹
cd wordpress  # 进入新的文件夹
wget https://wordpress.org/latest.zip
unzip latest.zip
mv wordpress/* ./
```

然后创建数据库：

```
mysql -uroot -p -e "create database wordpress" 
```

执行命令后，可能会让你输入密码，输入密码后并回车，就成功创建了数据库了。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhohgy4i8j30y00j40t3.jpg)

在浏览器中打开 [http://wordpress.dev/](http://wordpress.dev/)，就可以一步一步按部就班的安装了。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhonqwagtj31ak0wkmyf.jpg)

在输入数据库信息时，设置数据库名为 `wordpress`，用户名为`root` ，密码为上方我们获取到的密码。其他两项不同，单击“提交”按钮。

![](https://ws1.sinaimg.cn/large/006tNc79gy1flhoqakavcj316c0fs0t1.jpg)

单击“进行安装”按钮，在新的页面中设置基本信息，并单击“安装 WordPress”按钮。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhor2kkawj317m0vs3zx.jpg)

这样，我们的本地开发环境就部署完成了。

### 在 Windows 电脑上配置开发环境

相比于 Mac、Windows 的配置要简单很多，只需要安装一个软件即可 PHPStudy。

#### 安装 PHPstudy

访问 [http://phpstudy.net/download.html](http://phpstudy.net/download.html) 下载页面，下载 PHPstudy。

我们使用 33MB 的解压版：

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhpye2mnkj30sb03jaa3.jpg)

下载后，将得到的压缩包解压，执行其中的 exe 安装文件。

![](https://ws1.sinaimg.cn/large/006tNc79gy1flhpz4hv8bj30e903lgll.jpg)

弹出的确认窗口我们不做更改，直接确认。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhpzwt7lvj307r042gli.jpg)

并在弹出初始化的窗口中单击 **是**按钮。

可能会提示读者安装 VC9 运行库：

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhq0olmvpj309605hdft.jpg)

单击“确定”按钮，会引导我们到下载页面，下载对应的支持库，安装即可。

> 如果防火墙提示拦截 Apache 和 MySQL 时，允许即可。

#### 安装 WordPress

配置完 WordPress 后，我们开始安装 WordPress。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhq8tmo1kj305i04gt8l.jpg)

右击托盘中的 phpstudy 图标，选择其中的网站根目录，就会进入到根目录，删除其中的 l.php 和 phpinfo.php。

打开浏览器，访问 https://wordpress.org/latest.zip ，可以下载到最新的安装包。下载完成后，将其解压，将解压出来的 WordPress 目录中的所有文件都复制，粘贴到我们刚刚打开的网站根目录。

打开 http://localhost/phpMyAdmin 使用用户名 root ，密码 root 登录。

登录后，单击上方的 tab 中的 **SQL**，输入如下代码，并单击“执行”按钮：

```
create database wordpress;
```

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhqoa4agxj30ni0arq39.jpg)

这样，我们就成功的创建了一个新的 WordPress 数据库。

接下来，在浏览器中打开 http://localhost 就可以安装了，安装数据库时用到的用户名和密码都是  root，数据库名为 wordpress 。其他安装步骤可以参考 Mac 开发环境配置的相关部分。

### 在 cPanel 上安装 WordPress 

cPanel 是我们经常使用的一款虚拟主机面板，功能强大。如果购买了一些国外的主机商的虚拟主机，一般提供的都是 cPanel 。

#### 在 cPanel 上快速安装 WordPress

有的主机的 cPanel 集成了 Softaculous 的安装工具，这样我们可以通过简单的配置来安装 WordPress。

可以登录你的 cPanel， 在其中寻找 **Softaculous App Installer**。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhozwo72kj30rg0eyjrx.jpg)

单击其中的 WordPress 会进入到安装界面。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhp8liqc5j31f6110ta0.jpg)

填写其中的安装信息，点击最下方的安装：

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhp9stlu9j31dj0wwtc6.jpg)

稍等片刻，就安装成功了。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhpb8f7thj31cc0q6my2.jpg)

可以单击上面的管理员后台的链接，登录 WordPress 后台。

#### 在 cPanel 中使用常规方法安装 WordPress

虽然快捷安装方便，但并不是每个主机商都会集成，所以我们再补充一个常规的安装方法。

#####  下载 WordPress 安装包

访问 http://wordpress.org/latest.zip 即可下载到最新的 WordPress 安装包。

##### 上传 WordPress 的安装包

打开 cPanel ，找到**文件管理器**：

![](https://ws1.sinaimg.cn/large/006tNc79gy1flhpfp2hfjj30sa0bggmi.jpg)

在文件管理器中找到 `public_html` 目录，单击进入该目录。

![](https://ws2.sinaimg.cn/large/006tNc79gy1flhpkel55uj30ra0hqdho.jpg)

进入该目录后，单击“上传”按钮：

![](https://ws1.sinaimg.cn/large/006tNc79gy1flhplcr3vsj30kc0760sx.jpg)

在新的页面中选择我们刚刚下载的 latest.zip 文件，进行上传。

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhpm16zo3j30j50bqglv.jpg)

等待其上传成功后，就关掉这个页面。

> 删除成功后，会变成绿色的进度条。

回到文件管理器页面，单击“重新加载”按钮，就可以看到刚刚上传的文件了。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhpmxzqoyj30gw04u3ym.jpg)

选中它，单击上方的“提取”按钮：

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhpnj2ph1j30e1061dfz.jpg)

并在弹出的窗口中选择**Extract File**，稍等片刻，就解压成功了。

![](https://ws1.sinaimg.cn/large/006tNc79gy1flhpobyymwj30jo0cqjsc.jpg)

单击解压出来的 wordpress 文件夹，进入该文件夹。

勾选菜单栏中的“全选”复选框，再单击上方的“移动”按钮。

![](https://ws4.sinaimg.cn/large/006tNc79gy1flhppx5jcnj30r7083js5.jpg)

在弹出窗口中，将移动路径改为 `/public_html`，并单击**Move File**按钮。

这样我们就完成了 WordPress 文件上传了。

##### 创建数据库

接下来回到 cPanel 管理界面，找到其中的 `MySQL 数据库向导`。点击进入向导。

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhprthkswj30el05lglp.jpg)

分别输入数据库名、用户名和密码：

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhpsrhcfsj30bg04d0sm.jpg)

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhpt2qcvgj30dg09c74c.jpg)

在选择权限时，勾选“所有权限”复选框：

![](https://ws3.sinaimg.cn/large/006tNc79gy1flhptki630j30ij0993yn.jpg)

然后单击“下一步”按钮，就可以看到添加成功的界面。

![](https://ws1.sinaimg.cn/large/006tNc79gy1flhpu850k8j30dw09z0su.jpg)

稍后安装 WordPress 时，就可以使用刚刚创建的数据库去安装 WordPress 了。

##### 安装 WordPress

接下来，就可以访问你的虚拟主机绑定的域名去安装 WordPress 了。具体的安装部分，可以参考上方的 Mac 开发环境配置部分的相关内容。

### 总结

在上面的内容中，我们完成了本地开发环境的配置和以 cPanel 为例的虚拟主机的配置。如果有什么问题不清楚，可以在下方评论。如果后续觉得需要补充其他环境的配置说明，也可以在下方评论提问。
