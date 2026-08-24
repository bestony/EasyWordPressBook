# WordPress 主题开发快速入门

### 课程目标

经过本次课程可以学会制作一个简单的 WordPress 主题。

主题效果图：

![](https://postimg.aliavv.com/mbp/3zc5w.jpg)

### 课程内容

课程资源请[单击这里](http://www.easywpbook.com/course-resources/blog-template.zip)。

#### 创建一个主题

在课程的开始首先应该创建一个主题。

打开 WordPress 源码文件夹，进入到 *wp-content/themes* 目录中，创建一个名为 *gitchat* 的目录。

接下来下载课程资源中的 *blog-template.zip*，解压后会看到一个 *index.html* 和 一个 *blog.css*。

将 *index.html*  改为 *index.php*，将 *blog.css*  改为 *style.css*，将两个文件移动到刚刚创建的 *gitchat* 目录中去。

接下来打开 *style.css* ，在文件的顶部加入如下代码。

```php
/*
Theme Name: GitChat
Theme URI: http://gitbook.cn/gitchat/column/5a16601f13c02f4a35c9f8ad
Author: 白宦成
Author URI: http://gitbook.cn/gitchat/column/5a16601f13c02f4a35c9f8ad
Description: GitChat WordPress 演示达人课
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: blue
Text Domain: gitchat

This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.
*/
```

然后，打开 WordPress 后台的主题管理页面，就可以看到主题了。

![](https://postimg.aliavv.com/mbp/ltimg.jpg)

你可以尝试启用这个主题，会发现主题已经能够正常的启用了，不过当点击进入前台时，发现目前的页面效果并不好，和我们的效果图差距很大。

这是由于我们将 *index.html* 未经修改直接作为主题，引用的文件都失效了导致的。

![](https://postimg.aliavv.com/mbp/zojxd.jpg)

接下来修复这个问题，让这个页面的样式变为和之前一样的样式。

打开 *index.php* 文件，找到第18行：

![](https://postimg.aliavv.com/mbp/s8zs5.jpg)

将这里的 *blog.css* 替换为 `<?php echo get_stylesheet_directory_uri() ?>/style.css`，保存文件并刷新网站首页，可以看到，首页的样式就回复了过来。

> 这里除了使用这个代码，还可以使用：
>
>  *`<?php echo get_bloginfo('template_directory'); ?>`/style.css* 
>
> 这段代码，WordPress 针对同一个实现的效果可能会有多种不同的代码，不过并不重要，我们记住几个常用的即可。

#### 完善顶部内容

我们发现，现在页面的标题是错误的，接下来修改一下：

![](https://postimg.aliavv.com/mbp/dsgq5.jpg)

重新回到文件编辑器中，打开 *index.php*，找到第12行，将这里的 *Blog Template for Bootstrap* 替换为`<?php wp_title( '|', true, 'right' ); ?>`。这样，就使用了 WordPress 自带的函数来生成页面的标题，确保了页面标题是自动生成的。

![](https://postimg.aliavv.com/mbp/9wpgp.jpg)

在别的主题中，我们会在前台页面的顶部看到一个菜单栏：

![](https://postimg.aliavv.com/mbp/7uoap.jpg)

但是在我们现在的主题中是无法看到的，接下来修复这个问题，让 WordPress 主题能够正常的加载这个菜单栏。

重新回到编辑器，打开 *index.php* ，找到 head 标签，在 head 标签闭合前，加入如下代码：

```php
 <?php wp_head();?>
```

具体位置如下：

![](https://postimg.aliavv.com/mbp/6d3mu.jpg)

然后找到页面的底部，在 Body 标签闭合前，加入如下代码：

```php
<?php wp_footer(); ?>
```

具体位置如下：

![](https://postimg.aliavv.com/mbp/zn6kn.jpg)

现在再刷新页面就可以看到我们的菜单栏了。

#### 拆分出 header.php、footer.php、Sidebar.php

在接下来的内容中，我们要制作独立的单页等，所以需要在这里将页面进行拆分，将通用的部分抽离出去，从而提升代码的复用率。

![](https://postimg.aliavv.com/mbp/j2gxi.jpg)

可以认为，在这个页面中，被我用红色框体圈出来的内容是会被多个文件所使用的，我们可以先将这两部分拆分出来。

此外，页面底部的版权声明也是通用的，也可以将其拆分出来：

![](https://postimg.aliavv.com/mbp/430js.jpg)

##### header.php

打开编辑器，在主题目录下创建一个 *header.php* 文件，然后，打开 *index.php*，找到博客标题。

![](https://postimg.aliavv.com/mbp/1gvfe.jpg)

则博客标题以上的内容，都是可以被我们所复用的内容。我们将上方的所有代码，复制到刚刚创建的 header.php 中。接下来，删除 *index.php* 中复制过来的代码，并在这些代码的位置上插入一句话 `<?php get_header();?>`。刷新首页，会发现页面依然是老样子，没有发生任何变化。

> *get_header()* 函数能够引用同一目录下的 *header.php* 文件，从而帮助我们提升代码的复用率。

##### footer.php

同样的，我们在代码中查找版权信息，可以看到这段代码在底部。由于网页的渲染是从上到下，而这段代码后再也没有代码了，所以我们可以创建一个新的 footer.php 文件，并将这些代码加入其中。

![](https://postimg.aliavv.com/mbp/5t2rr.jpg)

同样的，创建一个 *footer.php* 文件，然后将代码复制到 *footer.php* 文件，并在 *index.php*  中这段代码所在的位置上加入一句代码 ` <?php get_footer();?>`。保存文件并刷新页面，可以看到，我们底部的版权链接也依然还在。

> *get_footer* 方法和 *get_header* 方法一样，都是帮助我们引用文件的。

##### sidebar.php

通过分析代码，我们可以知道，测边栏的代码是下面这一串

![](https://postimg.aliavv.com/mbp/fxxeo.jpg)

我们将这一串代码复制出来，新建一个  *sidebar.php* 文件，并将代码粘贴进去，然后使用 *get_sidebar* 方法加载侧边栏。

经过这段代码的替换，我们的 *index.php* 变成了这个样子,可以看到我们的整个文件只有45行，这使得我们的文件变得更加简单易读。

![](https://postimg.aliavv.com/mbp/ut7c1.jpg)

#### WordPress 主循环

页面拆分完毕了，但是页面的主题部分还是静态的内容，我们真正想要加载的内容还依然是静态内容。

接下来把主要的内容转换为动态的内容。这里我们使用 WordPress 官方提供的 主循环代码来实现页面内容动态输出。

```php
<?php if ( have_posts() ) : ?>
    <?php while ( have_posts() ) : the_post(); ?>
        ... Display post content
    <?php endwhile; ?>
<?php endif; ?>
```

首先，我们清理下页面的代码：

![](https://postimg.aliavv.com/mbp/jh0sn.jpg)

将红色部分的内容删除，将蓝色部分的代码调整成为我图上的样子。

接下来，就是套用 WordPress 提供的主循环代码了，将调整的蓝色框的内容作为主循环的循环体，放入 主循环代码代码中。则变成这个样子。

![](https://postimg.aliavv.com/mbp/frcha.jpg)

保存文件，重新回到首页刷新，可以看到已经刷新出了文章。只不过我目前在数据库里只添加了两篇文章，所以这里循环出了两篇文章。

![](https://postimg.aliavv.com/mbp/ueosa.jpg)

现在虽然我们循环出了文章，但是内容依然是我们手写的，接下来把这里的内容也改成 WordPress 自动生成的。具体替换可以参考下方的替换规则。

> **替换规则**：
>
> 标题 替换为 `<?php the_title();?>`；
>
> 摘要 替换为 `<?php the_excerpt();?>`；
>
> 作者 替换为 `<?php the_author();?>`；
>
> 作者标签的 href 的值替换为 `<?php the_author_link();?>`；
>
> 日期 替换为 `<?php the_date();?>`。

替换后的代码如下：

![](https://postimg.aliavv.com/mbp/4fd6q.jpg)

保存文件再刷新一下页面，可以看到页面变成了这个样子：

![](https://postimg.aliavv.com/mbp/5k9b1.jpg)

我们的各项信息、内容都已经显示出来了。

但是现在有个问题，没有办法进入到文章的详情页面。我们继续修改，在标题外，再包裹一层 *a* 标签，并将其 *href* 设置为  `<?php the_permalink();?>`。

![](https://postimg.aliavv.com/mbp/mzwj0.jpg)

保存文件并刷新页面，我们将鼠标指针移动到标题上，会发现标题已经变为了可以点击的超链接，点击链接，就会进入到详情页。只不过，这里的详情页使用的依然是首页的代码，所以看起来会怪怪的。

> 这里涉及到了 WordPress 主题的文件结构，这部分内容将会在下一节课详细讲解，在这里可以不用太过关心，跟着课程一步步走下去，先试着做一个 WordPress 主题吧！

![](https://postimg.aliavv.com/mbp/ehnia.jpg)

现在主循环已经完成了，页面也可以正常的加载内容了。

先在首页下方还有两个大按钮没有处理，接下来处理他们。

这两个按钮是用来进入上一页或者下一页的，好在 WordPress 提供了方便的函数，我们可以很轻松的完成这部分的修改。

使用下面的代码替换两个按钮的 *href*，顺便再将文字改为中文。

```php
<?php next_posts_link( 'Older posts' ); ?>
<?php previous_posts_link( 'Newer posts' ); ?>
```

替换完成的代码如下：

![](https://postimg.aliavv.com/mbp/95ga9.jpg)

保存文件后，刷新，诶，按钮怎么不见了？这是因为目前站点中的文章不够，所以这两个按钮就没有生成。可以进入后台 — 「设置」—「阅读」，将 *博客页面至多显示* 改为 1 。保存并刷新，可以看到首页的文章只显示了1条，同时我们可以点击上一页，浏览到上一条文章。

至此，我们主循环就完成了。

#### 处理文章页和单页

处理完了主循环，接下来美化一下文章详情页。

点击首页的文章标题，进入内容页会发现，这里与我们记忆中别的主题有很大差距，比如：

![](https://postimg.aliavv.com/mbp/f5lpx.jpg)

接下来完善这些部分。

之前曾说过，我们之所以看到的不合适，是因为目前加载的内容是首页的模板，所以无法正常的显示。

首先创建一个 *single.php*  用于展示文章内容。将 *index.php* 内的代码复制到 *single.php* 中，稍后我们来修改。

复制完成后，打开 *single.php* ，将页面中的`the_excerpt（）`替换为 `the_content()`，并删除底部的导航代码，再移除文章标题上的链接。

![](https://postimg.aliavv.com/mbp/huktv.jpg)

现在再刷新会发现内容页的渲染结果和首页就不同了。标题上没有了链接，内容也显示完全了：

![](https://postimg.aliavv.com/mbp/gnxov.jpg)

这段代码同样可以应用于单页，所以复制一下 *single.php* ，重命名为 *page.php*。进入后台，在页面管理中找一个页面打开。可以看到，我们的页面的样式和文章页面保持一致：

![](https://postimg.aliavv.com/mbp/1ppj6.jpg)

这样，我们的单页就显示完成了。

#### 完善页头和菜单

一直看着顶部的菜单和标题不爽？没事，接下来修改这些内容。

打开 *header.php*，使用代码替换博客标题和博客描述。

![](https://postimg.aliavv.com/mbp/92yx3.jpg)

保存文件，刷新首页，可以看到，站点的标题已经替换为我们在「常规」中设置的内容了。

![](https://postimg.aliavv.com/mbp/1wi0i.jpg)

现在站点顶部的菜单还不是我们想要的，我们也替换一下代码。

在 *header.php* 中找到菜单的代码，将其替换为如下代码：

![](https://postimg.aliavv.com/mbp/jrhkz.jpg)
这里我们将多余的链接删除，然后使用 `wp_list_pages` 函数来生成具体的链接。

![](https://postimg.aliavv.com/mbp/882zs.jpg)

可以看到，我们生成了对应的链接，但是样式出了些问题，不能很好的加载出来，我们添加一些样式来修复它。

打开 style.css 文件，在文件尾部加入如下代码：

```css
/* 新增菜单样式 */
.blog-nav li {
  position: relative;
  display: inline-block;
  padding: 10px;
  font-weight: 500; 
}
.blog-nav li a {
  color: #fff;
}
```

保存，回到首页，强制刷新当前页面，可以看到菜单效果已经正常了。点击其中的链接，则可以跳转到对应的页面去。

![](https://postimg.aliavv.com/mbp/goxhi.jpg)

现在，我们的页头和菜单就修改完了。

#### 完善侧边栏

完成了页头和主题内容，接下来实现侧边栏。

打开 *sidebar.php* 删除归档下面的 所有 li 标签。

![](https://postimg.aliavv.com/mbp/u6k8s.jpg)

将其替换为 `<?php wp_get_archives( 'type=monthly' ); ?>`，替换后代码如下：

![](https://postimg.aliavv.com/mbp/bnkcx.jpg)

刷新侧边栏，可以看到链接已生成。

![](https://postimg.aliavv.com/mbp/kdwv2.jpg)

接下来可以修改上方 about 中的文字，将文字替换为 `<?php the_author_meta( 'description' ); ?>`。最终代码效果如下：

![](https://postimg.aliavv.com/mbp/fc2ey.jpg)

这样，我们就在「关于」内容中使用了个人描述来替换。

![](https://postimg.aliavv.com/mbp/7shpp.jpg)

#### 评论系统的实现

WordPress 内建的评论系统非常好用，主题自然也应该接入评论系统。

> 事实上应该是必须，如果要将你的主题上传到 WordPress 官方，是一定要接入评论系统的，这个在其官方的要求中有说明。

首先，在 *single.php* 中添加如下代码：

```php
<?php
if ( comments_open() || get_comments_number() ) :
    comments_template();
endif;
?>
```

将这段代码加在 *the_content* 后，如图所示：

![](https://postimg.aliavv.com/mbp/k2gqf.jpg)

这段代码的作用是检测是否开启了评论，或者检测是否已经有评论。如果两者任一条件是满足的，则调取评论模板。

现在在我们的评论页面引用了评论模板，但并没有开发评论模板，现在我们来开发评论的模板。

创建一个 *comments.php*, 这个文件将会存放评论模板。在 *comments.php* 中添加如下代码：

```php+HTML

<?php
// part 1 
if ( post_password_required() ) {
    return;
} ?>
    <div id="comments" class="comments-area">
        <?php
        // part 2 
        if ( have_comments() ) : ?>
            <h3 class="comments-title">
                <?php
                // part 3 
                printf( _n( '“%2$s” 有一条评论', '“%2$s” 有 %1$s 条评论', get_comments_number(), 'comments title'),
                     get_comments_number() , get_the_title() );
                ?>
            </h3>
            <ul class="comment-list">
                <?php 
                // part 4
                wp_list_comments( array(
                    'short_ping'  => true,
                    'avatar_size' => 50,
                ) );
                ?>
            </ul>
        <?php endif; ?>
        <?php
        // part 5
        if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
            <p class="no-comments">
                <?php _e( '评论已关闭.' ); ?>
            </p>
        <?php endif; ?>
        <?php comment_form(); ?>
    </div>
```

这段代码首先进行了判断，如果这篇文件需要密码才能浏览，则不显示评论框。

在第二部分代码，判断文章是否已经有了评论，如果有则执行第三部分代码，输出评论的数目；并在第四部分显示评论。

最后，在第五部分，检测评论是否开启、文章是否有评论、以及当前文章是否支持评论，如果不允许，则输出一个评论已关闭。如果允许，则输出评论的表单。

实现的效果如下：

![](https://postimg.aliavv.com/mbp/v4uzh.jpg)

现在我们就实现了简单的评论系统，后续就是对评论部分的样式进行美化，这个可以根据具体需求来设计。

#### 主题功能强化

虽然我们现在主题已经开发好了，但是主题非常简单，只能渲染内容，接下来为主题添加一些功能代码，优化主题。

在主题的根目录创建一个新的文件，*functions.php*。这里我们就实现一个关闭 WordPress 自带 Google 字体的功能，这个功能能够加速我们的站点的访问。

在 functions.php 中添加如下代码：

```php
<?php

function remove_open_sans() {
    wp_deregister_style( 'open-sans' );
    wp_register_style( 'open-sans', false );
}
add_action('wp_enqueue_scripts', 'remove_open_sans');
add_action('admin_enqueue_scripts', 'remove_open_sans');
```

这段代实现了注销 WordPress 自带的 open-sans 字体，同时将这个函数挂载到前台和后台的加载过程。保存文件，回到后台，刷新页面，你会发现 Google 字体被去掉了。

> 关于这个文件之所以能够工作的机理，你可以查看我们在第14行的追溯，在 wp-settings.php 的 421 行，WordPress 引入了这个文件。

至此，我们完成了一个简单的主题开发。更复杂的功能实现，可以查看我们后面的课程。
