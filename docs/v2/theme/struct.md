# WordPress 的主题文件结构

在上节课完成了一个简单的主题的开发过程，但是毕竟是一个简单的主题，所以功能非常简陋，比如常见的 404 处理都没有。这节课先来了解一下 WordPress 的主题文件结构，通过对主题结构的了解，你会明白，WordPress 主题应该有哪些文件、每个文件都能解决什么样的功能，通过这样就明白应该使用什么样的文件来完成一些特殊的功能。

### 一览

WordPress 主题可能会有很多文件，不过总体来说可以将它们分为三类：

- CSS 样式文件和 JS 脚本文件：*style.css* ；
- 函数文件：*function.php* ；
- 模板文件：*index.php*、*home.php*、*single.php*。

### CSS 样式文件和 JS 脚本文件

CSS 样式文件和 JS 脚本文件是我们的主题最常见的两个文件，他们构成了主题的样式和页面内的效果交互。其中最重要的，就是 *style.css* 文件。除了 *style.css* 意外，还可能看到 *rtl.css*  （Right-To-Left），这个是给一些特殊的语言，用于从右向左阅读习惯的人使用的，大部分情况下，我们是不需要这个的。

#### Style.css 

Style.css 文件不仅承载着我们主题的样式表文件，还记录了主题的默认信息，比如主题名、主题描述、主题作者等等。一个典型的例子就是在上一节课中定义的 GitChat 主题的模板文件：

```css
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

### 函数文件

函数文件实现了我们的 WordPress 主题的各种功能，比如管理后台、特殊的内容输出、特殊的内容过滤器等等，一般来说，都会将其放在 *functions.php* 当中。但并不绝对，毕竟主题代码可能会非常的复杂，这个时候，可能会根据实际情况，将其放在其他文件夹中保存，然后在 *functions.php* 中引用，以提升代码的可读性。

### 模板文件

模板文件是 WordPress 定义好的一系列文件，无法对其重命名，不过可以直接使用这些名字来创建文件。具体的模板文件列表如下：

- `index.php`：主模板，这个模板必须提供。
- `comments.php`：评论模板。
- `front-page.php`：首页模板，当切换为静态首页时，可以选择这个。
- `home.php`：主页模板，默认的首页。如果开启了静态首页，这个模板则用于展示最新的文字。
- `single.php`：单独页面模板，显示单独的一篇文章时被调用。对于这个以及其他的请求模板，如果模板不存在会使用`index.php`。
- `single-{post-type}.php`：自定义单独页面模板。例如，`single-books.php` 展示自定义文章类型为 `books`的文章. 如果文章类型未被设置则使用`index.php`。
- `page.php`：页面模板，独立页面调用。
- `category.php`：分类模板。分类页面调用。
- `tag.php`：标签模板，标签页面调用。
- `taxonomy.php`：术语模板，请求自定义分类法的术语时使用。
- `author.php`：作者模板，作者页面调用。
- `date.php`：日期/时间模板，按时间查询时使用的模板。
- `archive.php`：存档模板，查询分类，作者或日期时使用的模板。需要注意的是，该模板将会分别被`category.php`、`author.php`、`date.php`所覆盖（如果存在的话）。
- `search.php`：搜索结果模板，显示搜索结果时使用的模板。
- `attachment.php`：附件模板，查看单个附件时使用的模板。
- `image.php`：图片附件模板，当在 WordPress 中查看单个图片时将调用此模板，如果不存在此模板，则调用 attachment.php 模板。
- `404.php`：404 错误页面模板，当 WordPress 无法查找到匹配查询的日志或页面时，使用 404.php 文件。

这么多文件，到底是如何加载的呢？接下来一一说明。

![](https://postimg.aliavv.com/mbp/cyodq.jpg)

这里使用了来自 [wphierachy](https://wphierarchy.com/) 的图片，这张图说明了 WordPress 的模板加载顺序。使用这张图，来说明模板到底是按照怎样一个顺序加载的。

这张图中，灰色的的方块代表着一个一个的页面，意味着我们的一个个不同的需求；红色的方块则代表着文件名含变量的文件模板，它们会根据变量的值，加载不同的模板；淡蓝色的则代表着普通模板；深蓝的代表主要的页面模板。

这张图的查看的顺序是从左向右查看，举个例子，当我们需要查看一个目录的页面时，首先，这个页面是一个归档类型的页面（archive），然后继续向右查找，找到我们要看的目录归档（Category Archive）；然后继续向右看，我们看到指向了`category-$slug.php`，这个文件是变量文件， WordPress 会根据我们目录的别名（slug），查询是否存在对应的文件，如果有这个文件，就进行渲染，不再输出。如果不存在，则继续向右查找；继续向右看到了 `category-$id.php`，当到了这一步后， WordPress 会根据目录的 ID 查询，是否存在对应的文件，如果存在则继续查找，如果不存在，则继续向右查找。继续向右，看到了淡蓝色的 *category.php*，如果这个文件存在，则进行渲染。如果不存在，则继续向右查找，查找到 *archive.php*，最后一直会查找到 *index.php*. 

上面就是典型的一个页面的查询轨迹，所有的页面都会遵循这个查找模式，进行查找。

![](https://postimg.aliavv.com/mbp/in2tn.jpg)

在图中可以看到，所有的文件查找不到的情况下，最终就会查找到 index.php 上，这也就是为什么在一开始，便创建 index.php，通过这个文件，我们的主题便可以很好的提供服务。后续通过对页面的细分，添加不同的模板，实现更好的体验。

#### 文字版本的加载顺序

上面的版本每次都要查询图片可能不是很方便，这里我总结了一份文字版本的加载顺序，读者可以根据这个加载顺序来制作模板。加载顺序从序号小的开始，如果查不到这个文件，则查询序号更大的文件是否存在。

##### 主页

- home.php
- index.php

##### 文章页面

- single-$posttype.php
- single.php
- index.php

##### 页面

- 自定义页面模板
- page-$slug.php
- page-$id.php
- page.php
- index.php

##### 分类页面

- category-$slug.php
- category-$id.php
- category.php
- archive.php
- index.php

##### 标签页面

- tag-$slug.php
- tag-$Id.php
- tag.php
- archive.php
- index.php

##### 作者页面

- author-$nickname.php
- author-$Id.php
- author.php
- archive.php
- index.php

##### 日期页面

- date.php
- archive.php
- index.php

##### 搜索页面

- search.php
- index.php

##### 404 页面

- 404.php
- index.php

##### 附件页面

- $mimetype.php
- attachment.php
- single.php
- index.php

### 总结

经过上面的内容，我想你已经明白了，是如何制作这些特殊的页面了，我们可以通过创建不同文件名的文件，将其放在主题根目录来实现不同的功能。

不过，在页面中，提到了「自定义页面模板」，这个是怎么用的？别急，在下一课细细说来。
