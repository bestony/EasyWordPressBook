## 动手开发插件：Custom Author 插件开发实战

今天分享一个插件的完整开发流程，帮助你来理解我的开发工作流，让你更好的开发出自己的 WordPress 插件。

### 起因

咱们 GitChat 的丹华老师找到我，向我咨询了两个问题。

> ![enter image description here](https://images.gitbook.cn/f6b52ba0-6a01-11e8-82cd-bd67f9e0d48c)

> 丹华老师是咱们 GitChat 达人课[《区块链全景课》](https://gitbook.cn/gitchat/column/5b026d0dedd0d46379a7bc55)的撰稿人，课程写的非常好，如果你对区块链也有兴趣，不妨去看看。

其中一个问题，我告诉他 WordPress 官方的解决方案，已解决掉了。但是第二个问题没解决，问题如下：

> 如何在发布文章时指定特定的作者？

遇到这个问题后，我先向丹华老师咨询了一个问题：

1. 你使用的作者是否会重复？

得到了丹华老师否定的回答后，我就知道，我可能需要帮他找一款同类型插件来解决他的问题。如果使用的作者能够重复，那么其实可以通过 WordPress 内置的用户系统来实现，只需要在发布时选择作者就行了。不过因为很少会重复，手动的收入就很有必要了。

> **为什么要先沟通问题？**
>
> 遇见问题时，程序员的天性总是希望通过造轮子来解决问题，但是，我们应该尽可能的控制自己，不要通过造轮子来解决问题。 WordPress 的插件已经足够多了！完全可以通过沟通，来引导用户确定自己的需求，或对需求进行转化。尝试着用一些非技术的手段来解决问题！技术应该是核武器，不要轻易动用。

通过一段搜索后，我确定没有同类型的插件，便考虑写一个新的插件。

### 定名

在开始写插件的时候，难免要为插件起名，一个好的插件名可以帮助你引入更多的用户。由于我的插件非常简单，仅仅需要提供发布文章时的自定义作者，因此我初步拟定插件名为 Custom Author。

同名的插件你发布到 WordPress 时，访问的路径会是 xxx-2，非常不好看，所以我又对插件名称进行了确认，确认了该名称尚未被使用。

> **在为插件起名时，如何确定 WordPress 中没有同名的插件？**

> 访问网址 [https://wordpress.org/plugins/插件名称](https://wordpress.org/plugins/%E6%8F%92%E4%BB%B6%E5%90%8D%E7%A7%B0)：
>
> - 如果你看到的是搜索结果，就说明该名称尚未被使用，页面的路径也会被自动导流到 [https://wordpress.org/plugins/search/custom-author/](https://wordpress.org/plugins/search/custom-author/)。
> - 如果你看到的是插件的详情页面，则说明该名称已经被使用了。

### 思路

由于我需要为文章手动指定作者信息，而 WordPress 本身的用户系统中用户的创建需要输入较多信息，且容易造成用户的污染，因此，我考虑使用 Post Meta 信息来进行用户信息的设置。

同时，在浏览文章时，将对应的 Post Meta 信息读取，替换掉默认的作者信息。

<img src="https://images.gitbook.cn/37c09ab0-69fa-11e8-b67c-638945d35c4a"  width = "60%" />

此外，在替换作者信息时，也需要考虑一些边缘情况。需要考虑，如果某篇文章没有设置 Post Meta 信息的话，就需要让其显示默认的作者信息，或者设置一个默认作者信息（这个可以通过插件设置来实现，不过当前这个插件其实没有必要做这个功能，使用 WordPress 默认的用户信息也可以）。

这里经过考虑，我决定在浏览文章时，加入一层判定，如果设置了 Post Meta 信息，就读取 Post Meta 信息；未设置该信息时，就显示默认的用户信息。

![enter image description here](https://images.gitbook.cn/9530e7a0-69fe-11e8-b67c-638945d35c4a)

在用户操作时，对用户最为友好的便是通过界面的手动输入来设置作者信息，因此，我考虑在界面中加入一个输入框，来作为作者信息输入。此处考虑到插件的特定用户是丹华老师，因此，我将这个输入框放在发布框内，方便他操作。

<img src="https://images.gitbook.cn/d21ba6b0-69fd-11e8-82cd-bd67f9e0d48c"  width = "50%" />

### 实现

在完成了插件功能的考虑后，接下来就进入到插件的开发阶段了。在刚刚，我们将插件的整个工作流程分为了两部分，前台的显示和替换以及后台的 Post Meta 设置。

#### 后台功能

在这里，首先添加了两个 Action，用来在 WordPress 上的发布框中添加内容的输出，并添加了数据处理函数。

```php
add_action('post_submitbox_misc_actions', 'cus_author_createCustomField');
add_action('save_post', 'cus_author_saveCustomField');
```

然后分别设置他们的处理函数`cus_author_createCustomField`和 `cus_author_saveCustomField`。

在`cus_author_createCustomField`中，我使用了如下的代码，来判断当前编辑的内容是否是 Post，也就是文章类型，从而可以设置仅对文章类型的页面输出插件的内容。

```php
$post_id = get_the_ID();
if (get_post_type($post_id) != 'post') {
    return;
}
```

随后，提取文章的 Post Meta：

```php
$value = get_post_meta($post_id, '_custom_author_name', true);
```

这里我设置第三个参数为 true，表明我希望返回值是单个对象，而不是一个数组。

并添加 nonce 安全处理，借助 nonce 安全处理，可以避免我们设置的接口被恶意请求。WordPress 在处理时，会进行安全校验。

```php
wp_nonce_field('custom_author_nonce' , 'custom_author_nonce');
```

以及使用 HTML 输出界面，此部分不再粘贴代码，相关代码在[详见这里](https://github.com/bestony/custom-author/blob/master/custom-author.php#L45)。

在 `cus_author_saveCustomField` 中，添加了如下一系列函数来进行校验：

```php
if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
}
```

上述代码可以避免自动保存功能触发的更新。

```php
if (
    !isset($_POST['custom_author_nonce']) ||
    !wp_verify_nonce($_POST['custom_author_nonce'], 'custom_author_nonce')
) {
    return;
}
```

上述代码会检测是否提交了 nonce 信息，以及 nonce 信息是否是正确的。如果不正确，就返回，从而确保用户的请求一定是 WordPress 后台发起的，而不是用户通过其他渠道恶意发起的。

```php
if (!current_user_can('edit_post', $post_id)) {
    return;
}
```

以及，判断用户是否有对应的权限编辑特定的文章，如果没有权限，就返回。

在完成了权限校验后，便是对用户输入进行保存：

```php
if (isset($_POST['_custom_author_name'])) {
    update_post_meta($post_id, '_custom_author_name', sanitize_text_field($_POST['_custom_author_name']));
} else {
    /**
     * 不存在就删除
     */
    delete_post_meta($post_id, '_custom_author_name');
}
```

在这段代码中，需要注意的是，我使用了 `sanitize_text_field` 来对用户输入进行校验。你不应该相信用户的输入，而是尽可能的做好安全校验。

后台部分完整代码[详见这里](https://github.com/bestony/custom-author/blob/master/custom-author.php#L27-L87)。

#### 前台部分

在完成了后台部分的内容后，我们来实现前台的内容展示。在完成这部分功能时，不需要再使用 `add_action`，而是要使用 `add_filter`。

```php

add_filter('the_author','cus_author_the_author');
function cus_author_the_author($author){
    $custom_author = get_post_meta(get_the_ID(), '_custom_author_name');
    if ($custom_author) {
        return $custom_author[0];
    } else {
        return $author;
    }
}
```

前台内容的展示逻辑非常简单，你只需要判断文章是否设置了自定义的作者名称。如果设置了自定义作者信息，就使用手动设置的值；如果没有设置，就使用函数传入的默认的作者名称。

### 提交审核

在完成了插件的开发后，我便筹划将插件提交到官方。毕竟，通过官方审核的插件能够让更多人信任，同时，使用时体验也更好，只需要在 WordPress 后台搜索即可。

![enter image description here](https://images.gitbook.cn/f2880410-69fe-11e8-a03d-6ff49ab3d470)

前往 [Wordpress 网站](https://wordpress.org/plugins/developers/add/) 提交插件审核，等待一晚上的时间（由于存在时差，插件的审核总是在我们的半夜进行），就会收到审核结果了。如果审核没有通过，只需要根据审核邮件的内容进行修改。

![enter image description here](https://images.gitbook.cn/1a4a1600-69ff-11e8-82cd-bd67f9e0d48c)

修改完成后，将修改后的插件作为附件回复给审核者，再等一个晚上就会收到审核的意见。

![enter image description here](https://images.gitbook.cn/3e9b4420-69ff-11e8-82cd-bd67f9e0d48c)

审核通过后，就会收到 WordPress 官方的邮件，提醒你使用 SVN 管理插件，接下来就是准备插件的一些展示文件了，这部分内容可以参考一下咱们之前的达人课[  第 19 课：提交你的插件到 WordPress 的官方仓库](https://gitbook.cn/gitchat/column/5a16601f13c02f4a35c9f8ad/topic/5a16633c13c02f4a35c9fa3b)。
