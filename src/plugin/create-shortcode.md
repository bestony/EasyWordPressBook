## 开发一个短代码插件

### 课程目标

这节课来开发一个短代码插件，实现自定义短代码，并在此基础上，对 WordPress 自带的编辑器进行增强。

#### 什么是短代码

短代码就是形如`[git]`这样的代码，WordPress 自2.5版本开始引入短代码机制，通过短代码，一个完全不懂技术的编辑人员也可以发布样式丰富的短代码。

一个短代码应该是由`[]`所包围，同时可以接受一定的参数。当我们使用短代码时，WordPress 在进行内容加载时，就会将短代码通过代码转换为适当的动态内容。虽然短代码可能很短，但是其转换出来的内容可能会非常长。

短代码的使用有很多种形式，比如：

```
[git]
[git path="213"]
[git path="123321"]Code[/git]
```

这三种都是短代码的调用形式，只是有没有加入参数，和是否需要包含内容。

在插件开发过程中，有些时候需要让用户控制一些内容的显示，这个时候就要用到短代码了，通过短代码，可能用户只需要一行代码，就可以执行你的插件中极为复杂的操作。

### 开发短代码

在最开始，依然是创建插件，这里创建一个新的插件，插件名为 *gitchat_shortcode* 。

![](https://postimg.aliavv.com/mbp/k8bka.jpg)

接下来开发这个插件的功能。

#### 注册一个不需要参数的短代码

首先来注册一个不需要参数的短代码。在插件中加入如下代码，就可以注册一个标签为 *git* 的短代码了，这个短代码的功能非常简单，就是输出一个 hello world：

```php
function gitchat_git_shortcode() {
    return "Hello World";
}
add_shortcode( 'git', 'gitchat_git_shortcode' );
```

我们到插件后台，启用这个插件，然后进入文章管理中，创建一篇文章来测试短代码。

![](https://postimg.aliavv.com/mbp/a8z5s.jpg)

发布后，查看文章页面，就可以看到短代码输出了。

![](https://postimg.aliavv.com/mbp/q7yw5.jpg)

这样就完成了一个最简单的短代码。对于一些纯粹展示型的内容，可以通过这样一个简单的方法实现内容的嵌入。

#### 注册一个加入了参数的短代码

不过，大多数的时候，我们的短代码都需要加入一个或多个参数，来实现短代码的功能。这时就需要对短代码进行优化了。

修改一下短代码函数：

```php
function gitchat_git_shortcode( $atts ) {
    $atts = shortcode_atts(
        array(
            'id' => '1',
            'title' => 'hahaha',
        ),
        $atts,
        'git'
    );
}
```

这样，短代码就成功的接收到了参数，并进行处理，这里传入了三个参数，第一个参数是我们定义的短代码的参数，可以通过`[git id="xxx" title="xxxx"]`来实现调用。第二个参数则是这个短代码函数接受到的参数，是 WordPress 传递给我们的参数，里面包含了输入时的参数。第三个则是参数对应的短代码。

经过处理后，就可以以`$atts['id']`的形式在函数内调用具体的参数和值。

比如，我们让短代码输出接收到的参数，将函数改为下面这样：

```php
function gitchat_git_shortcode( $atts ) {
    $atts = shortcode_atts(
        array(
            'id' => '1',
            'title' => 'hahaha',
        ),
        $atts,
        'git'
    );
    return  $atts['id']."__".$atts['title'];
}
```

回到前台刷新一下页面，我们可以看到，这里我们的短代码将默认设置的值进行了输出。

![](https://postimg.aliavv.com/mbp/8yjm2.jpg)

单击“编辑”按钮，进入后台，修改短代码调用：

![](https://postimg.aliavv.com/mbp/k1a4i.jpg)

再次回到前台，查看输出的内容，可以看到，我们设置的内容已经被输出出来了，这就说明内容可以被参数所接受、处理，最后输出了出来：

![](https://postimg.aliavv.com/mbp/e42tz.jpg)

#### 注册一个接受标签包含内容的短代码

有些时候，我们不止需要参数，毕竟可能会包含非常多的内容，比如代码高亮类的插件。

此时，希望我们的短代码能够获取到两个匹配标签之间的内容。

再修改一下短代码函数：

```Php
function gitchat_git_shortcode( $atts , $content = null ) {
    $atts = shortcode_atts(
        array(
            'id' => '1',
            'title' => 'hahaha',
        ),
        $atts,
        'git'
    );
}
```

这次，短代码函数接受两个参数，分别是 *atts* 和 *content*，其中 *content* 就是两个标签之间包含的内容。

这里设置了 content 的值为 null，如果你需要设置默认值，将其改为默认值即可。

将两个参数和内容都输出出来，将代码改为下面这样：

```php
function gitchat_git_shortcode( $atts , $content = null ) {
    $atts = shortcode_atts(
        array(
            'id' => '1',
            'title' => 'hahaha',
        ),
        $atts,
        'git'
    );
    return  $atts['id']."__".$atts['title']."---".$content;
}
```

现在刷新一下文章页，可以看到，由于短代码没有匹配包含，所以并没有输出 content。

![](https://postimg.aliavv.com/mbp/cll7d.jpg)

单击“编辑”按钮，将内容修改为`[git id="!123" title="你好"]这是我的标题[/git]`，保存并回到文章页，刷新。

![](https://postimg.aliavv.com/mbp/iux7a.jpg)

可以看到，这次输入内容正常的刷新出来了。

至此，完成了三种不同类型的短代码开发，足以应付你的绝大多数场景了。

### 编辑器增强

我们现在开发好了短代码，但是如果设置了多个短代码或短代码有多个参数，用户在使用时就会很麻烦，因为还要去查询短代码的说明。这里，就来实现编辑器的增强，在编辑器上加入短代码的按钮。

#### QuickTag

WordPress 的编辑器支持两种模式，分别是 TinyMCE 和 QuickTag 模式（HTML）模式，点击编辑器右上角的文本，就可以添加一个按钮到 QuickTag 中了。

![](https://postimg.aliavv.com/mbp/c3ei7.jpg)

接下来实现在编辑器中加入一个 QuickTag。

在插件中加入如下代码：

```php
function gitchat_git_qt() {
}
add_action( 'admin_print_footer_scripts', 'gitchat_git_qt' );
```

这样就在 WordPress 后台加载底部脚本时，加入了我们自己的函数。接下来来写函数体的内容。

将函数改为下面这样：

```php+HTML
function gitchat_git_qt() {
    if ( wp_script_is( 'quicktags' ) ) { // 判断是否正在加载 quicktags 
    ?> 
    <script type="text/javascript">
    // 调用 quick tag 的 api 添加按钮
    QTags.addButton( 'git', 'Git', '[git id="13" title="code"]', '[/code]', '', 'QucikTag For GitChat', 1 );
    </script>
    <?php
    }
}
```

我来解释一下上面这段代码。

首先，使用 `if` 语句来判断当前是否正在加载 *quicktag* 相关的脚本，因为如果你加载的过早，会导致 *Qtags* 实例调用失败，也就没有办法来加载按钮了。

然后嵌入一段 JavaScript 代码。这个代码很简单，使用 *QTags* 的 *addButton* 方法，来加载一个新按钮，这个函数接受8个参数，不过定义时一般来说，可以不传入那么多。

```javascript   
QTags.addButton( id, display, arg1, arg2, access_key, title, priority, instance );
```

第一个参数是按钮的 ID，需要是唯一的；第二个参数则是这个按钮上显示的文字，比如设置为 Git，显示的时候是![](https://postimg.aliavv.com/mbp/sm4dv.jpg)，可以设置成为你自己的（比如使用 *dashicons*）；第三个参数则是第一次按下这个按钮时，会输出的内容；第四个参数是第二次按下这个按钮会输出的内容；第五个参数是 access_key，目前已经被弃用了，我们就不用管了；第六个参数是标题，当鼠标指针悬浮在这个按钮上时，将会展示标题文字，可以将其设置为短代码的说明或按钮的说明；第七个参数是优先级，这个参数会决定短代码的位置，比如将其设置为 1-9 时，这个按钮会放在第一位；设置为 11-19 时，会放在第二个位置，如果你希望放在最后，则需要设置一个非常大的值才行；最后一个参数是对按钮进行设置，可以给短代码加入 ariaLabel 和  ariaLabelClose ，基本用不到，可以不填。

> **为什么第三个和第四个参数要这样拆？**
>
> 这是因为，如果选中文字再按下按钮时，编辑器会自动将选中的内容放在参数三和参数四之间，类似这样：
>
> ![](https://postimg.aliavv.com/mbp/qffva.gif)
>
> 如果拆分有问题，生成的代码可能就有问题了，将短代码的参数放在参数三是更为合适的。

保存插件，进入新建文章页面，将编辑器切换为 QuickTag 编辑器，就能看到添加的按钮了：

![](https://postimg.aliavv.com/mbp/fpe9j.jpg)

####  TinyMCE 增强

QuickTag 非常方便，但是大多数人更习惯使用 TinyMCE，所以我们还要针对 TinyMCE 编辑器进行增强。

Tiny 编辑器的增强就比较麻烦了。

首先要为这个按钮创建一个 JS 文件，在插件根目录下创建一个 *tinymce.js* ，在其中加入如下代码：

```javascript
// tinymce.js
(function() {
    tinymce.create('tinymce.plugins.gitchat', {
        init : function(ed, url) {
            ed.addButton('gitchat', {
                title : 'GitChat Button',
                image : url+'/icon.png',
                onclick : function() {
                     ed.selection.setContent('[git id="1" title="haha"]' + ed.selection.getContent() + '[/git]');
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
    });
    tinymce.PluginManager.add('gitchat', tinymce.plugins.gitchat);
})();
```

接下来将我们的按钮注册到 TinyMCE 中；重新打开我们的插件主文件，在文件尾部加入如下代码：

```php
 function register_button( $buttons ) {
    array_push( $buttons, "|", "gitchat" ); // 将按钮加到列表尾部
    return $buttons;
 }
 function register_plugin( $plugin_array ) {
    $plugin_array['gitchat'] = plugin_dir_url( __FILE__ ) . '/tinymce.js'; // 新增我们自己开发的插件
    return $plugin_array;
 }
 function gitchat_tinymce_enhance() {
      // 判断用户是否有权限编辑文章/页面，无权则不加载
     if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
        return;
      }
      // 如果未开启富文本编辑，则不渲染。
      if ( get_user_option('rich_editing') == 'true' ) {
        add_filter( 'mce_external_plugins', 'register_plugin' );
        add_filter( 'mce_buttons', 'register_button' );
      }
 }
 add_action('admin_init', 'gitchat_tinymce_enhance');
```

在 *tinymce.js* 中，我们调用 *tinymce.create()* 创建了一个新的插件，然后使用 init 函数定义了一个新增的按钮和其对应的 onClick 方法，最后使用 PluginManager 来将插件注入到系统中去。

> 需要准备一个 png 文件作为图标。

接下来在插件主文件中，先定义了 *register_button*，将我们的按钮放入编辑器的列表中。然后定义了 *register_plugin* 将插件页注入到 TinyMCE 中去，最后定义了` gitchat_tinymce_enhance`并将其挂载在 *admin_init*  上。在这个函数中，我们对具体的权限和是否进行富文本编辑进行了判断，根据判断的结果，决定是否加入我们的插件。

编辑完成后，保存文件，回到后台，进入编辑器，可以看到我们的按钮，已经添加进去了。

![](https://postimg.aliavv.com/mbp/yo46u.jpg)

选择我们要处理的文字，点击按钮，就可以把相关内容包含在其中了。如果不选择任何东西，则直接将短代码输入到编辑器中。

至此，我们也完成了对 TinyMCE 编辑器的增强。
