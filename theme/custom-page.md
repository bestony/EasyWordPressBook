## 特殊文件的构建

这节课来完成非主要文件的创建和内容的填充，来完善我们的 GitChat 主题。

在上一节课中提到了 WordPress 主题下有多种不同的文件，可以实现很多不同的效果，其中最特殊的就是**自定义页面模板**。接下来先说说自定义页面模板。

### 自定义页面模板

WordPress 默认提供了文章（Post）和 页面 （Page）两种不同的模板，如果作为博客使用，我们会以文章为主，如果作为 CMS （内容管理系统）使用，我们会以页面为主。

在使用页面时，会发现一个问题，我们用的页面模板和文章的模板非常的像，几乎是一模一样的（当然，因为是复制了代码创建了一个新的文件，肯定是一模一样的）。

但是，我们的需求可能是千变万化的，有些时候，需要展示一些特殊的页面内容，又或者是需要特殊的页面布局（比如有没有侧边栏），此时，就要用到自定义页面模板了。

自定义页面模板是 WordPress 提供了一个强大而简单的功能，可以通过很少的几行代码来是实现自定义代码。接下来就尝试定义一个不包含侧边栏的自定义模板。

在主题的根目录下创建一个 *page-nosidebar.php* 文件，用来自定义模板。

> 虽然自定义页面模板没有命名规则的要求，但是建议你以一个比较规范的命名方式来命名，从而方便你后续的管理和使用。

在这个文件中添加如下代码：

```php
<?php
/*
Template Name: 无侧边栏页面模板
*/
```

保存文件，然后打开 WordPress 后台，进入 「页面」—「新建页面」。

在这样页面的右侧，会看到页面属性框，在其中有一个**模板**属性，这个属性可以帮助我们选择页面对应的模板。默认会使用 *page.php*，也就是默认模板。

点击下拉框，可以看到刚刚创建的模板，选择这个模板。在页面中随便添加一些内容，作为我们稍后的演示。

![](https://postimg.aliavv.com/mbp/jyb9y.jpg)

发布后，点击查看页面：

![](https://postimg.aliavv.com/mbp/tlf6y.jpg)

会跳转到内容页，但是会发现，目前的页面中没有任何内容，显示的是一个白屏。这是因为页面模板中没有任何内容。

接下来给这个页面模板添加内容，打开 page.php ，复制其中的内容到 page-nosidebar.php 中，并删除其中引用侧边栏的代码，调整主要内容占的页面比例：

![](https://postimg.aliavv.com/mbp/ro6u0.jpg)

修改完成后，保存文件并退出，回到刚刚的白屏页面刷新，这次可以看到页面的内容。同时也会注意到，侧边栏消失了。

![](https://postimg.aliavv.com/mbp/03erk.jpg)

这样就完成了自定义页面模板的制作，后续可以根据你自己的需要，制作不同的页面模板。

### 归档

虽然 WordPress 提供了简单的归档功能，但是只能够在侧边栏中使用，侧边栏中显示的数目有限且不方便，我们可以使用自定义页面模板来实现。

创建一个新的 *page-archive.php* 文件，用于存放归档代码。

在其中添加如下代码：

```php
<?php
/*
Template Name: 归档
*/
function _PostList($atts = array())
{
    global $wpdb;
    $rawposts = $wpdb->get_results("SELECT ID, year(post_date) as post_year, post_date, post_title FROM $wpdb->posts WHERE post_status = 'publish' AND post_type = 'post' AND post_password = '' order by post_date desc");
    foreach ($rawposts as $post) {
        $posts[$post->post_year][] = $post;
    }
    $rawposts = null;
    $html = '<div class="archives-container"><ul class="archives-list">';
    foreach ($posts as $year => $posts_yearly) {
        $html .= '<li><div class="archives-year">' . $year . '年</div><ul class="archives-sublist">';
        foreach ($posts_yearly as $post) {
            $html .= '<li>';
            $html .= '<time datetime="' . $post->post_date . '">' . mysql2date('m月d日 D', $post->post_date, true) . '</time>';
            $html .= '<a href="' . get_permalink($post->ID) . '">' . $post->post_title . '</a>';
            $html .= "</li>";
        }
        $html .= "</ul></li>";
    }
    $html .= "</ul></div>";
    return $html;
}

function _PostCount()
{
    $num_posts = wp_count_posts('post');
    return number_format_i18n($num_posts->publish);
}
get_header();
?>
<div class="row">
  <div class="col-sm-12 blog-main">
  <?php echo _PostList();  ?>
  </div>
</div>
</div>

<?php get_footer();?>
```

保存后，到后台创建一个新的页面，使用刚刚创建的归档模板。

创建成功后，刷新页面，可以看到这样的效果：

![](https://postimg.aliavv.com/mbp/mj194.jpg)

这样就完成了归档页面的编写，具体代码的使用可以参考我上方代码中的注释来理解，如果出现无法理解，可以到读者圈内提问。

### 标签云

标签云也是我们常用的自定义页面模板，这里给出一个标签云的例子。

首先，创建一个 *page-tagcloud.php* 文件，然后在其中加入如下代码：

```php+html
<?php
/*
Template Name: 标签云
*/
get_header();?>

<div class="row">

  <div class="col-sm-12 blog-main">

    <?php wp_tag_cloud("smallest=20&largest=50&unix=px&number=200");?>
    
  </div>

</div>
</div>

<?php get_footer();?>

```

然后，到后台创建一个新的页面，该页面使用我们这里的标签云。

> 这个页面的内容可以写任何东西，因为在这里并没有使用`the_content `来输出内容。

然后，查看这个页面就可以看到标签信息了。点击标签，就会进入到标签的详情页。

![](https://postimg.aliavv.com/mbp/6hgkv.jpg)

### 友情链接页面

友情链接是我们几乎每一个博客博主都会用到的功能，但是 WordPress 默认的链接功能只能在侧边栏调用链接，无法在页面中调用。对于我们来说是非常不方便的，所以，可以考虑使用自定义页面模板的形式来构建。

首先，需要激活 WordPress 隐藏的链接管理器功能，在主题的 *functions.php* 中添加如下代码：

```php
add_filter( 'pre_option_link_manager_enabled', '__return_true' );
```

会看到侧边栏多了一个菜单项：

![](https://postimg.aliavv.com/mbp/d8atk.jpg)

接下来就可以在这里添加、删除和管理链接了。

然后进入代码编辑器，创建一个新的页面模板文件 `page-link.php`，在其中加入如下代码：

```php
<?php
/*
Template Name: 友情链接
*/
get_header();?>

<div class="row">

  <div class="col-sm-8 blog-main">

  <?php wp_list_bookmarks('orderby=rand&show_images=0'); ?>


  </div><!-- /.blog-main -->

 <?php get_sidebar();?>

</div><!-- /.row -->

</div><!-- /.container -->

<?php get_footer();?>

```

然后，使用这个页面模板创建一个新的页面，使用我们刚刚创建的友情链接模板，最终得到的效果如图所示：

![](https://postimg.aliavv.com/mbp/yapom.jpg)

### 总结

这里只列出了几个常用的自定义页面模板，在正式开发过程中，会根据需要，创建不同的页面模板。
