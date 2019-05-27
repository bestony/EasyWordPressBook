## 插件是如何运行的

### 插件的加载机制

了解插件的加载机制，能够帮助我们更加深入的了解插件的开发，也能够帮助我们更好的对插件进行开发。下面了解一下 WordPress 的插件加载机制。

> 要注意，PHP 的执行顺序是一行一行向下执行的，方便理解后面的加载顺序判断。

#### index.php

无论从哪里进入到 WordPress，一定会从 *index.php* 文件开始加载，打开根目录的 index.php ，可以看到这个文件引用了 *wp-blog-header.php* 文件。再无其他代码。

> 代码所在行[请单击这里](https://github.com/WordPress/WordPress/blob/02d04f2b5c61bd770d6ce4875ac25b2ad8da0c45/index.php#L17)。

![](https://postimg.aliavv.com/mbp/pck8f.jpg)

#### wp-blog-header.php

打开 wp-blog-header.php 文件，可以看到这个文件引用了两个文件。

> 代码所在行[请单击这里](https://github.com/WordPress/WordPress/blob/02d04f2b5c61bd770d6ce4875ac25b2ad8da0c45/wp-blog-header.php#L13)。

![](https://postimg.aliavv.com/mbp/erjxn.jpg)

我们先看一看 *wp-load.php* 文件。

#### wp-load.php

打开这个文件可以看到，该文件检测了 *wp-config.php* 文件，如果未检测到该文件，则进入到安装进程。我们使用时这个文件是存在的，所以执行的是下方的 `require_once( ABSPATH . 'wp-config.php' );`命令。

> 代码所在行[请单击这里](https://github.com/WordPress/WordPress/blob/02d04f2b5c61bd770d6ce4875ac25b2ad8da0c45/wp-load.php#L37)。

![](https://postimg.aliavv.com/mbp/ge4h8.jpg)

接下来看看 *wp-config.php* 这个文件。

#### wp-config.php

*wp-config.php* 文件内存放着 WordPress 的配置信息，包括数据库、Debug 等信息。我们一直往下看，会看到这里它引入到了一个 *wp-settings.php*。

> 代码所在行[请单击这里](https://github.com/WordPress/WordPress/blob/02d04f2b5c61bd770d6ce4875ac25b2ad8da0c45/wp-config-sample.php#L90)。

![](https://postimg.aliavv.com/mbp/ge7fs.jpg)

接下来看看 *wp-settings.php*。

#### wp-settings.php

这里包含了大量的 WordPress 初始化函数，前面的内容不做过多的解释，可以直接拉到第 303 行，则看到这样的代码。

> 代码所在行[请单击这里](https://github.com/WordPress/WordPress/blob/02d04f2b5c61bd770d6ce4875ac25b2ad8da0c45/wp-settings.php#L304)。

![](https://postimg.aliavv.com/mbp/7jpuq.jpg)

这段代码会将已激活的插件作为循环元素进行循环，对每个插件执行注册和加载。

继续向下看，会在第 421 行看到这样一段代码，该代码实现了加载我们激活的主题的 functions.php 文件。

> 代码所在行[请单击这里](https://github.com/WordPress/WordPress/blob/02d04f2b5c61bd770d6ce4875ac25b2ad8da0c45/wp-settings.php#L432)。

![](https://postimg.aliavv.com/mbp/hjzoc.jpg)

这样，我们在主题中添加的功能，也会被加载到系统当中去。

这个文件没有再引用其他的文件，然后返回 *wp-config.php*。

#### wp-blog-header.php

我们发现，wp-config.php 也执行到了文件的尾部，接下来返回到上一个文件——*wp-load.php*。 

在 *wp-load.php* 中可以看到，在这个 if 代码块中，只有这一条引用代码，所以该文件也执行完了，代码执行回到上一个文件 *wp-blog-header.php*。

在 wp-blog-header.php 文件中可以看到，在 *wp-load.php* 下，引用了 *template-loader.php*，该文件的功能就是进行我们后续的主题加载。

![](https://postimg.aliavv.com/mbp/7jikn.jpg)

#### 结论

经过上述的分析可以得出一个结论，WordPress 的加载是这样的一个顺序，先加载 **插件**，再加载 主题根目录中的 *functions.php*，最后加载主题。

![](https://postimg.aliavv.com/mbp/l0gk2.jpg)

### 插件是如何运行的

WordPress 的插件也是一段代码， WordPress 插件通过 WordPress 提供的插件 API 和函数，来实现集成到 WordPress 当中去。相关涉及到的函数，你可以在 *wp-includes/plugin.php* 中看到：

![](https://postimg.aliavv.com/mbp/ijlka.jpg)

WordPress 将插件的行为分为两种，分别是 Action（动作）和 Filters（过滤器）。

#### 什么是 Hook

WordPress 的插件机制是基于 Hook 机制实现的，简单来说，就是在 WordPress 的核心代码中，加入了大量让 Hook 挂载的位置，当程序执行到这里时，就会顺着 Hook 上挂载的钩子走一遍，然后再回来继续执行后面的代码；如果没有挂载任何钩子，则不执行操作。

我们写插件，就是写一些自定义的函数，然后利用 WordPress 提供的对 Hook 操作的函数，将函数挂载到对应的位置上去。

![](https://postimg.aliavv.com/mbp/7rp1i.jpg)

#### 什么是 Action

Action 会在 WordPress 内核运行到一定的点或事件时会调用的，被调用后，插件可以执行一些具体的操作。

#### 什么是 Filters

Filters 则是对内容的处理，通过 Filters 可以在这些数据被渲染到页面前或保存到数据库前对其进行修改。

简单的来说，两者的区别主要是下面这样的：

- Action 函数在被调用时，是可以直接调用的，自定义的函数无需提供返回值；
- Filters 函数在被调用时，会被传入一个具体的字符串，函数执行完成后，还需要将这个字符串返回给系统，方便系统进行渲染。

### 重要的函数

刚刚只是说明了什么是 Action、什么是 Filters 具体功能的实现，则是通过下面这四个重要的函数来实现的。

#### do_action

*do_action* 是 WordPress 插件机制非常重要的一环，当程序运行到这个函数时，就会将挂载在这个 Hook 上的所有函数执行一遍。

这个函数有两个参数，第一个参数是 Hook 的名称，第二个参数则是具体的参数。

![](https://postimg.aliavv.com/mbp/ldonb.jpg)

比如在开发过程中，可能会用到 `get_header` 这个函数，该函数在执行时，首先会调用 *do_action*，那么，在 *get_header* 上挂载的函数就会执行，执行完成后，再执行后面的函数。

有了这个函数的存在，才有了后续我们开发插件时，各种功能的实现。

#### add_action

*add_action* 可以将我们自定义的函数加到特定的 Hook 上去，等待执行。一般来说，我们只需要执行如下命令即可。

```php
add_action("Hook 名","函数名")
```

不过这样的使用忽略掉了两个参数，在执行一些特定的操作时，可能就不足了。

我们可以看看这个函数的官方文档。

```Php
add_action( string $tag, callable $function_to_add, int $priority = 10, int $accepted_args = 1 )    
```

这个函数一共有四个参数，其中前两者分别是 Hook 名和对应的函数，而后两者分别是优先级和可以接受的参数个数。

优先级：如果你不设置的话，添加的函数默认优先级是 10，也可以根据你自己的需要设置具体的优先级。优先级的规则是越小越先执行。同时添加了一个优先级为 5 和一个优先级为 10 的函数，会先执行优先级为5的函数，再执行优先级为10的函数。

参数个数：默认情况下参数的个数是1。具体设置为多少，则取决于你使用的 Hook 能够提供多少个参数。如何找寻这个参数的个数？可以直接去看这个 Hook 的说明，查看相关的代码说明。如果这个 Hook 提供了调用的说明，可以直接根据上面的 *add_action* 的函数参数来判断这个 Hook 支持几个参数。具体的参数是什么，可以通过实例代码的注释或者到源代码中查找对应 `do_action` 函数的参数。举个例子，我希望了解 *save_post* 这个 Hook 的参数，可以到它的 [API 页面](https://codex.wordpress.org/Plugin_API/Action_Reference/save_post)去查看具体的参数调用。可以看到在示例代码中说明了参数的个数和对应的参数的含义。

![](https://postimg.aliavv.com/mbp/xib2q.jpg)

如果这个函数没有说明参数，也可以查看它的源代码，确认参赛，页面底部有说明这个函数的位置，

![](https://postimg.aliavv.com/mbp/6gjal.jpg)

你可以直接去对应的文件查看这个 Hook 的调用参数。了解到参数后，就可以使用这些参数，来执行一系列操作了。

> 虽然你可能查到了有三个参数，可以不使用三个参数，比如只使用前两个。但是如果要用第一个和第三个，则还是需要在 *add_action* 中设置参数个数为3。

#### apply_filters

*apply_filters* 函数和 *do_action* 类似，它会对数据执行一系列操作来进行处理。系统通过如下方法进行调用,

```php
$value = apply_filters( 'example_filter', 'filter me', $arg1, $arg2 );
```

可以看到这个函数的结果会被赋值给一个变量，所以它和 *do_action* 不同之处就在于它需要一个返回值。其他大体上相同，不再赘述。

#### add_filter

这个函数和刚刚说的 `add_action` 基本相同，函数的定义也相同。

```php
add_filter( string $tag, callable $function_to_add, int $priority = 10, int $accepted_args = 1 )
```

这个函数的使用不再赘述，可以参考上面 `add_action` 的内容。

### Hook 列表

WordPress 提供了大量的 Hook，这里不再一一列举，把官方的列表给大家，在使用中出现了问题，再到读者圈内提问即可。

[Action Hook 列表](https://codex.wordpress.org/Plugin_API/Action_Reference)

[Filter Hook 列表](https://codex.wordpress.org/Plugin_API/Filter_Reference)
