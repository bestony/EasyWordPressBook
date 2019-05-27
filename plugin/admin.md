## 插件后台的设计与开发

对于简单的插件来说，可能无需设置，安装插件后启用功能即可。但是对于一些功能更复杂的插件，我们就需要为插件添加一个后台页面了，这节课我们来学习如何为插件设计、创建一个后台。

### 学习目标

通过这节课的学习将会为 gitchat_copyright 插件创建一个后台管理页面。

### 添加菜单

#### 添加菜单项目

##### 添加一级菜单

既然要设置菜单，我们肯定要有一个入口能够进入到插件的页面去。在上节课尝试使用 WordPress 自己的设置页面作为入口，但是这节课我们要自己创建一个页面，所以要添加自己的菜单项目。

这里要用到 *add_menu_page* 函数，这个函数的定义如下：

```php
add_menu_page( string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '', string $icon_url = '', int $position = null )
```

我们需要设置这7个参数，各个参数的含义如下：

- page_title：页面的标题，会和`title`标签内显示的一样。
- menu_title：在控制面板中显示的菜单名称。
- capability：显示该操作项所需要的最低权限。具体权限可以参考 [官方文档](https://codex.wordpress.org/Roles_and_Capabilities)。
- menu_slug：菜单别名，需要是唯一的。
- Function：显示该页面内容时调用的函数。
- icon_url：菜单中图标的 url。这个参数除了粘贴 url，还可以粘贴 WordPress 官方的 helper css，比如 *dashicons-chart-pie*，具体可以在[这里](https://developer.wordpress.org/resource/dashicons/)找到。或者是 base64 后的图标`data:image/svg+xml;base64`。
- position：出现在菜单中的位置。具体的 Position 可以参考 [官方说明](https://developer.wordpress.org/reference/functions/add_menu_page/#default-bottom-of-menu-structure)，需要注意，我们自己定义的 position 应该和官方的 position 不同，避免冲突。

![](https://postimg.aliavv.com/mbp/vq9yy.jpg)

接下来自定义一个一级菜单。

在我们的插件尾部添加如下代码：

```php
/**
* 注册菜单项
*/
function gitchat_copyright_custom_menu(){
  add_menu_page( 
      'Gitchat 版权插件首页',
      'GitChat 版权插件',
      'manage_options',
      'gitchat_optionpage',
      'gitchat_custom_page',
      'dashicons-admin-generic',
      100
  ); 
}
add_action( 'admin_menu', 'gitchat_copyright_custom_menu' );

function gitchat_custom_page(){
  ?>
  <h1>GitChat 版权插件测试</h1>
  <?php
}
```

这里我们定义了一个页面 title 是 *Gitchat 版权插件首页*，菜单名为 *GitChat 版权插件*，权限为*管理员权限*，别名为 *gitchat_optionpage* ，图标为 *dashicons-admin-generic* ，放在所有菜单底部的插件。

**需要注意的是，菜单的添加必须挂载在 *admin_menu* 这个 hook 上才行。** 

![](https://postimg.aliavv.com/mbp/xpeh8.jpg)

点击这个菜单项，就会进入到我们的页面了，可以看到定义的页面内容。

![](https://postimg.aliavv.com/mbp/oe3ry.jpg)

##### 添加二级菜单

有些时候，一级菜单并不够我们用，可能需要两级菜单。添加二级菜单，我们需要用到 *add_submenu_page* 方法。

```php
add_submenu_page( string $parent_slug, string $page_title, string $menu_title, string $capability, string $menu_slug, callable $function = '' )
```

这个函数的定义和 `add_menu_page` 基本相同，唯一不同的是需要传入第一个参数，指定上级菜单，如果不指定，系统就不知道子菜单的上一级菜单是什么。

接下来，我们来添加一个子菜单。

在刚刚定义的 `gitchat_copyright_custom_menu` 函数中添加我们的子菜单函数。

新的代码如下：

```php

/**
* 注册菜单项
*/
function gitchat_copyright_custom_menu(){
  add_menu_page( 
      'Gitchat 版权插件首页',
      'GitChat 版权插件',
      'manage_options',
      'gitchat_optionpage',
      'gitchat_custom_page',
      'dashicons-admin-generic',
      100
  ); 
  add_submenu_page(
    'gitchat_optionpage',
    "关于",
    "关于",
    'manage_options',
    'gitchat_aboutpage',
    'gitchat_about_page'
  );
}
add_action( 'admin_menu', 'gitchat_copyright_custom_menu' );

function gitchat_custom_page(){
  ?>
  <h1>GitChat 版权插件测试</h1>
  <?php
}
function gitchat_about_page(){
  ?>
  <h1>关于 GitChat</h1>
  <?php
}
```

这时刷新一下页面，就可以看到菜单加入了二级菜单。

![](https://postimg.aliavv.com/mbp/iixm8.jpg)

点击其中的关于，就可以看到新加的页面了。

#### 添加页面

##### 使用 WordPress 自定义的样式

现在已经添加了自定义的菜单页面，接下来为这个页面添加内容。

![](https://postimg.aliavv.com/mbp/4ugr9.jpg)

相比于我们自己去设计样式，最简单的方式，是使用 WordPress 内置的样式，来展现我们的样式。这样体验也和 WordPress 官方的内容具有一致性，能够更好的表现出我们想要的内容。

##### 使用 wrap 包裹我们的内容

![](https://postimg.aliavv.com/mbp/7cnfz.jpg)

在这个截图中，上面的内容使用的都是 *h1*，dan s 下方的内容明显要更适合 WordPress 的界面设计风格，这就是因为下面的内容被 wrap 类所包裹，展示的内容会按照 WordPress 官方的样式来书写。

```
<div class="wrap">
    <!--- Content -->
</div>
```

##### 使用 WordPress 自带的信息提示的样式

我们在制作 WordPress 插件时，可能会用到一些提示，比如信息保存成功后的提示、信息出错的提示等等。这些 WordPress 官方提供了固定的样式，可以直接使用 WordPress 自己的样式来进行展示。

这方面我们可以直接复制这里的代码来显示：

```
<div id="message" class="updated">
    <p><strong>
        <!--- 保存信息 -->
    </strong></p>
</div>

<div id="message" class="error">
    <p><strong>
        <!--- 保存信息 -->
    </strong></p>
</div>
```

实现的效果如下：

![](https://postimg.aliavv.com/mbp/091qh.jpg)

这样的展示会更符合 WordPress 整体的体验。

##### 使用 WordPress 的按钮样式

![](https://postimg.aliavv.com/mbp/epwk9.jpg)

使用浏览器的普通按钮虽然也可以，但体验却差很多，设计也不一致，可以使用 WordPress 的按钮样式，来自定义页面的按钮。具体按钮的代码如下，可以根据自己的需要选择。

```html
<input type="submit" name="test" value="普通按钮" />
<input type="submit" name="test" value="标准按钮" class="button" />
<input type="submit" name="test" value="主要按钮" class="button button-primary" />
<input type="submit" name="test" value="副按钮" class="button button-secondary" />
<input type="submit" name="test" value="大按钮" class="button button-large" />
<input type="submit" name="test" value="小按钮" class="button button-small" />
<input type="submit" name="test" value="超大按钮" class="button button-hero" />
```

> a 链接也可以通过加入这些样式来美化。

##### 使用 WordPress 自带的表单样式

WordPress 也提供了默认的表单样式，可以直接调用对应的样式来输出对应的样式。

![](https://postimg.aliavv.com/mbp/kowz0.jpg)

```html
<form method="POST" action="">
            <table class="form-table">
                <tr valign="top">
                    <th><label for="input-example">输入框</label></th>
                    <td><input id="input-example" name="input-example" /></td>
                </tr>
                <tr valign="top">
                    <th><label for="select-example">下拉框：</label></th>
                    <td>
                        <select name="select-example">
                        <option value="1">是</option>
                        <option value="0">否</option>
                        </select>
                    </td>
                </tr>
                <tr valign="top">
                    <th><label for="check-example">选择框</label></th>
                    <td><input type="checkbox" name="check-example" /></td>
                </tr>
                <tr valign="top">
                    <th><label for="radio-example">Radio </label></th>
                    <td>
                        <input type="radio" name="radio-example" value="是" /> 是
                        <input type="radio" name="radio-example" value="否" /> 否
                    </td>
                </tr>
                <tr valign="top">
                    <th><label for="textarea">文本框</label></th>
                    <td><textarea name="textarea"></textarea></td>
                </tr>
                <tr valign="top">
                    <td>
                        <input type="submit" name="save" value="保存" class="button-primary" />
                        <input type="submit" name="reset" value="重置" class="button-secondary" />
                    </td>
                </tr>
            </table>
        </form>
```

##### 使用 WordPress 自带的表格样式

![](https://postimg.aliavv.com/mbp/6h78t.jpg)

通过在表格上加入`widefat striped`两个类，就可以将我们的表格设置为 WordPress 的样式。

```html
        <table class="widefat striped">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>达人课名称</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Angular 初学者快速上手教程</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>快速学习 Spring Boot 技术栈</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Webpack 达人的成长之路</td>
                </tr>
            </tbody>
        </table>
```

其他的一些样式，如果我在这里没有提到，你需要用，可以自己通过 Chrome 的开发者工具审查获得，或者到读者圈内提问。

#### 选项页面设置

接下来完善我们的插件管理页面的内容。

修改 `gitchat_custom_page` 函数内容如下：

```php+HTML
function gitchat_custom_page(){
  ?>
  <div class="wrap">
  <?php 
    if ($_POST['code'] != null && check_admin_referer( 'gitchat_copyright' )){
      update_option( 'gitchat_copyright_code', $_POST['code'] );
      $code = $_POST['code'];
      ?>
      <div id="message" class="updated"><p><strong>信息更新成功！</strong></p>
      </div>
      <?php
    }else{
      $code  = get_option('gitchat_copyright_code');
    }
    ?>
    <h1>GitChat 版权插件设置</h1>
    <form method="POST" action="">
            <table class="form-table">
            
                <tr valign="top">
                    <th><label for="textarea">版权代码</label></th>
                    <td><textarea name="code" col="30" row="10"><?php echo $code;?></textarea></td>
                </tr>
                <tr valign="top">
                    <td> 
                        <input type="submit" name="save" value="保存" class="button-primary" />
                        <input type="reset" name="reset" value="重置" class="button-secondary" />
                    </td>
                </tr>
            </table>
            <?php
                wp_nonce_field('gitchat_copyright');
            ?>
        </form>
  </div>
  
  <?php
}
```

这段代码中大部分都是我们在上面提到的表单内容。不再多讲，我来说一说里面的 PHP 代码。

```php
<?php 
    if ($_POST && $_POST['code'] != null && check_admin_referer( 'gitchat_copyright' )){
      update_option( 'gitchat_copyright_code', $_POST['code'] );
      $code = $_POST['code'];
      ?>
      <div id="message" class="updated"><p><strong>信息更新成功！</strong></p>
      </div>
      <?php
    }else{
      $code  = get_option('gitchat_copyright_code');
    }
    ?>
```

这段代码主要是两个功能，首先判断是否是 Post 请求，判断 Post 请求中的 code 是否为空，以及这个插件的请求是否合法。如果 code 不为空，则使用 Post 的数据更新设置项，并提示更新成功；如果发来的请求不是 Post，则执行下方的获取代码，并赋值给 *code* 。

在 table 底部我加了一段代码：

```
<?php wp_nonce_field('gitchat_copyright'); ?>
```

这段代码可以帮助我们验证请求。

##### 关于 `check_admin_referer` 和 `wp_nonce_field`

这两个函数是我们的第一次看见，这两个函数是为表单加入验证数据避免被恶意利用。`wp_nonce_field` 函数会在我们的表单中加入两段代码，用于后续的验证。

![](https://postimg.aliavv.com/mbp/sqc4o.jpg)

而 `check_admin_referer`会验证这两段代码是否匹配，如果不匹配，则会拒绝请求。

### 总结

这节课我们学习了如何构建插件的设置页面，后续会根据插件的复杂程度，你可以更加细化插件。

