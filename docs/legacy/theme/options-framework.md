# 接入 Options Framework

终于在这节课要开始为主题制作一个管理后台了。

可能中间你一直奇怪，为什么我没有讲为主题制作一个管理后台，毕竟一个高度自定义化的主题，是一定会需要很多设置项的，如果不将其做在后台的管理菜单中，就需要通过修改代码来实现自定义，显然这并不符合我们的主题的定位，通过修改代码实现自定义的形式仅适合开发者们。

如今，我们要尝试使用 Options Framework 来在我们的主题内集成主题设置。

### 接入 Options Framework 的优势

接入 Options Framework 可以让我们以更简单的形式来实现主题的选项，让我们把更多的精力放在主题的本身，而不是研究如何过滤用户输入的数据，这些内容 Options Framework 都会在后台帮我们做好，只需要设计具体的设置项目即可。

### 在 GitChat 主题中接入 Options Framework

首先，我们需要下载 Options Framework，开发者将其开源在 [Github](https://github.com/devinsays/options-framework-theme)，可以在这里直接下载到最新的代码。

> 下载地址请[单击这里](https://github.com/devinsays/options-framework-theme/archive/master.zip)。

下载后，将这个压缩包解压，可以看到里面有很多文件，不过大部分都是用不到的，只需要将 *images*、*inc*、*options.php* 三个文件移动到主题根目录中去。

![](https://postimg.aliavv.com/mbp/52qj2.jpg)

然后，打开主题的 *functions.php* 文件，在其中加入如下代码：

```php
if (!function_exists('optionsframework_init')){
    define('OPTIONS_FRAMEWORK_DIRECTORY', get_template_directory_uri().'/inc/');
    require_once dirname(__FILE__).'/inc/options-framework.php';
}
```

加入后代码如下：

![](https://postimg.aliavv.com/mbp/nj5hp.jpg)

保存文件，回到 WordPress 后台，可以在「外观」中找到一个「Theme Options」，点击即可进入设置页面。

![](https://postimg.aliavv.com/mbp/674s2.jpg)

进入设置页面后，会看到非常多的设置项，这个都是 Options Framework 为我们提供的 Demo，等下会将这些内容处理一下，只保留我们自己需要的内容。

![](https://postimg.aliavv.com/mbp/rjsnt.jpg)

当看到这里，说明 Options Framework 接入成功了。

### 添加设置项

我们的设置项被放在主题根目录下的 *options.php* 文件中，我们可以打开这个文件，查看具体的内容。

首先，会看到一个函数：

![](https://postimg.aliavv.com/mbp/7spuc.jpg)

这个函数定义了数据库中我们的参数存放的字段名，可以把它改成我们自己需要的，比如 `gitchat_theme_options`。

在下方，可以找到我们的设置项目：

![](https://postimg.aliavv.com/mbp/zc6mf.jpg)

项目大体上可以两种，分别是选项卡和其他设置项，选项卡的 type 是 *heading*，设置项则支持多种类型：

- text
- textarea
- checkbox
- select
- radio
- upload（图片上传工具）
- images（使用图片替代 radio 选择）
- background（背景设置）
- multicheck
- color（Jquery 实现的颜色选择器）
- typography（排版选择器）
- editor

可以根据需要选择不同的选项，具体的设置范例，可以在 *options.php* 中看到。在对设置项精简以后，可以看出代码是这个样子的。这里面最需要关注的是 *id* 和 *type*，id 会用于后续获取对应的设置项，如果 id 不唯一，就没办法获取到准确的值。而 type 不对，在后台设置时，可能体验不同。*name* 和 *description* 则分别是设置项的名称和描述，可以帮助我们更好的输入对应的设置项。*std* 是默认填写的内容，*placeholder* 是在未输入内容情况下，文本框会显示的内容。

![](https://postimg.aliavv.com/mbp/xj7kb.jpg)

于此同时，后台设置项变成了：

![](https://postimg.aliavv.com/mbp/s000v.jpg)

可以看出，这里的设置项和我们设置数据的顺序有关，可以根据我们的需要，来设置不同的顺序。

接下来，将站长的信息作为选项，用于侧边栏的输出。

将 *options.php* 中的代码改为如下代码：

```php
    $options[] = array( 
        'name' => __( '作者名称', 'theme-textdomain' ),
        'desc' => __( '作者的昵称或网名，用于侧边栏显示', 'theme-textdomain' ),
        'id' => 'user_name',
        'placeholder' => '会显示在侧边栏',
        'std' => '',
        'class' => 'mini',
        'type' => 'text'
    );
    $options[] = array( 
        'name' => __( '作者的邮箱地址', 'theme-textdomain' ),
        'desc' => __( '作者的邮箱地址，用于侧边栏显示', 'theme-textdomain' ),
        'id' => 'user_mail',
        'std' => '',
        'class' => '',
        'placeholder' => '会显示在侧边栏',
        'type' => 'text'
    );
    $options[] = array( 
        'name' => __( '作者的网站地址', 'theme-textdomain' ),
        'desc' => __( '作者的网站地址，用于侧边栏显示', 'theme-textdomain' ),
        'id' => 'user_url',
        'std' => '',
        'class' => '',
        'placeholder' => '会显示在侧边栏',
        'type' => 'text'
    );
```

然后在后台展示的效果如图。

![](https://postimg.aliavv.com/mbp/tg842.jpg)

我们可以填写一下内容，测试一下能否正常保存设置项目。

![](https://postimg.aliavv.com/mbp/1qnk2.jpg)

可以看到，我们的设置项被正确保存了。

### 在主题中调用函数获取设置项

现在的设置项已经设置好了，接下来在主题中调用它。

打开 *sidebar.php* 文件，找到 `<?php the_author_meta( 'description' ); ?> `，删去这段代码，然后使用我们的设置项来输出内容。

默认情况下，我们获取设置项的函数是`of_get_option`，使用如下代码，可以获取到我们的设置项的值：

```Php
<?php echo of_get_option("设置id");?>
```

接下来，修改我们的 About 的输出，将其改为：

```Php
<?php echo of_get_option("user-name").",".of_get_option("user-email").",".of_get_option("user-url");?>
```

![](https://postimg.aliavv.com/mbp/pyro0.jpg)

保存文件，回到网站的首页，刷新即可看到我们输出的内容。

![](https://postimg.aliavv.com/mbp/fcnvm.jpg)

### 修改获取参数的函数

可能你会觉得默认的函数太长了，需要变得短一点，可以修改 *inc/options-framework.php* 文件，搜索 `of_get_option`，找到这段代码，将这里的两个 `of_get_option` 改为你自己的函数名：

![](https://postimg.aliavv.com/mbp/vk8yx.jpg)

修改完成后，记得到主题中你调用的位置去修改对应的函数名。

### 如何修改菜单中的 Theme Options

想要修改菜单中的 Theme Options ，可以打开 *inc/includes/class-options-framework-admin.php* 文件，搜索 *Theme Options*，然后就可以找到这些代码，修改其中的 `page_title` 和 `menu_title` 为你自己需要的内容。

![](https://postimg.aliavv.com/mbp/icw8r.jpg)

修改完成后，回到后台，可以看到菜单项中的文字和页面顶部的标题都修改过来了。

![](https://postimg.aliavv.com/mbp/4p7xh.jpg)

### 其他优秀的面板

除了 Options Framework，还有很多其他比较优秀的面板，我们也可以选择这些面板来使用。

### OptionTree

OptionTree 是由 ThemeForest 赞助的主题设置模板，界面美观简洁大方，也是一个非常不错的选项框架。

![](https://postimg.aliavv.com/mbp/c07sw.jpg)

插件地址[详见这里](https://wordpress.org/plugins/option-tree/)。

演示主题[详见这里](https://github.com/valendesigns/option-tree-theme)。

#### Unyson Framework

![](https://postimg.aliavv.com/mbp/evy4n.jpg)

插件地址[详见这里](https://wordpress.org/plugins/unyson/)。

演示主题[详见这里](https://github.com/ThemeFuse/Scratch-Theme)。

#### Redux Framework

![](https://postimg.aliavv.com/mbp/s45ht.jpg)

插件地址[详见这里](https://wordpress.org/plugins/redux-framework/)。

#### Titan Framework

![](https://postimg.aliavv.com/mbp/cy8a0.jpg)

插件地址[详见这里](https://wordpress.org/plugins/titan-framework/)。

插件的选项框架非常的多，可以根据自己的需要，选择一款美观好用的主题插件。各个插件的使用大体上相同，区别仅仅是引入的文件不同罢了。

可以选择一个你喜欢的选项框架，然后一直用下去。

### 总结

至此，我们学习了如何接入 Options Framework，你也可以根据自己的审美喜好，添加不同的主题设置框架，来加速你的主题开发。
