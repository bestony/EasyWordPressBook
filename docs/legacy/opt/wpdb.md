# WordPress 数据库操作 WPDB 指南


在开发 WordPress 插件时，难免会遇到一些需要对数据库进行操作的功能。对于 WordPress 自带文章、页面、评论、用户等信息，可以通过 `query_posts` 来完成数据查询功能，但是，在一些特殊的场景中，我们可能需要自定义自己的数据结构。在这个时候，我们就需要考虑添加一个新的表，来存储我们自定义的数据。这时，就需要了解 WordPress 的 WPDB，并尝试借助 WPDB 来完成数据的查询。

在使用 WPDB 时，需要掌握一定的 SQL 基础，所以，如果还不会使用 SQL 对数据库进行增删查改，那么可能需要先学习一下 SQL 基础内容。

### 初识 WPDB

WPDB 是 WordPress 提供的操作数据库的类，借助这个类，我们可以轻松的实现对 WordPress 数据库的操作，从而完成自定义的数据更新的需求。

WPDB 在使用时，无需自行实例化，直接使用 WordPrss 提供的 `$wpdb` 全局变量即可。下面给出一个调用 `$wpdb` 的例子。

```php
global $wpdb;
$res = $wpdb->get_results( "your sql" );
```

### 执行查询

如果想要使用 WPDB 进行 SQL 语句的查询，可以使用 `$wpdb` 的 query 方法。

```php
global $wpdb;
$wpdb->query('query');
```

**这个方法将会返回所执行的 SQL 语句影响的行数**。在使用时你需要注意，其返回值可能是 0 或者 false （表示语句有问题），你在进行结果的判断时，**推荐使用 `===` 来进行对比**。

### 获取一行数据

在执行数据库时，大部分时候需要查询单个行的数据，比如查看某个元素的单个条目的详情。这个时候，就可以使用 `get_row` 方法来获取一行数据。

```php
global $wpdb;
$wpdb->get_row('query', output_type, row_offset); 
```

在使用时需要注意，`get_row` 有三个参数：

- 第一个参数为需要执行的 SQL 语句。
- 第二个参数为需要输出的结果的类型，我们可以将其设置为 OBJECT，表示返回值是一个对象；也可以将其设置为 `ARRAY_A`，表示将返回值转换为 Key-Value 形式的数组，读者可以通过 `$array['myKey']` 的形式来获取结果；或者设置为 `ARRAY_N`，表示返回值为一个排序的数组，需要通过 `$array[1]` 来提取返回值的值。
- 第三个参数则是设置我们的数据是否要跳过多少行，默认为 0，即取第一个数据，如果设置了跳过的数据，则查询的数据会是跳过所设置条数后的数据的值。

### 获取通用查询结果

除了获取单个数据，还有很多场景下需要获取某一个类型的所有数据，如列表。在这个时候，可以使用 `get_results`。

```php
global $wpdb;
$wpdb->get_results('query', output_type);
```

`get_results` 也可以应用于获取单行数据，不过我们有 `get_row`，因此，在获取单行数据时可以不用 `get_results`。

在使用 `get_results` 时，除了需要设置要执行的 SQL 语句外，还需要注意设置返回值的类型。和 `get_row`一样，支持 `OBJECT`、`ARRAY_A`、`ARRAY_N`，`get_results` 还提供了 `OBJECT_K` 的类型。

当你设置为 `OBJECT_K` 时，返回值会被放在一个数组内，数组的 Key 将会是所查询数据中的第一列的值（一般来说，是我们查询时的 ID，比如文章的 ID 为 5，那这时该对象的 Key 就是 5）。 

### 插入数据

除了查询数据以外，插入新的数据对于我们来说，也是非常重要的。 WordPress 同样提供了插入数据的方法。

```php
global $wpdb;
$wpdb->insert( $table, $data, $format );
```

执行 insert 方法时，需要设置表名（表名需要带上前缀，前缀可以通过 `$wpdb->prefix` 来获取到），并设置要添加的数据，这里传入的数据 `$data` 应该是一个数组类型的数据，并将其 Key 设置为数据库对应的字段名。`$format` 是插入数据的类型，默认为 array，不需要做修改，string 也是一个可选项，不过，我们以数组的形式插入数据更方便。

在执行完成 insert 方法后，可以获得插入后数据在表内的序号，我们可以通过 `$wpdb->insert_id` 来获取到这个 ID。

### 更新数据

在执行业务逻辑时，我们还会遇到需要更新数据的场景，此时，我们可以执行 update 方法来更新数据。

```php
$wpdb->update( $table, $data, $where, $format = null, $where_format = null ); 
```

在使用 update 时，需要设置数据库表名（需要加入前缀）。`$data` 则需要传入我们要更改的数据，传入的值为数组类型，比如`array( 'column1' => 'value1', 'column2' => 123 )`；`$where` 也类似，需要传入我们要查询的条件 `array( 'column1' => 'value1', 'column2' => 123 )`，`$format` 则是我们输入的 data 的类型，默认为 array，一般不需要修改；`$where_format` 是我们查询的 where 的类型，默认为 array，一般也不需要修改。

### 删除数据

WordPress 并未提供单独的删除数据的接口，所以，当需要删除数据时，可以使用 `get_results` 或 query 方法来执行 DELETE 语句，删除数据。

### WordPress SQL 查询语句安全检查

WordPress 插件想要上架到官方的市场中，一个不可避免的问题就是通过官方的安全检查。事实上，WordPress 的插件审核团队也主要审核你的插件的安全问题，并不会太在意你的插件具体功能是什么。因此，在开发时，应该对你的 SQL 语句进行安全检查，从而，确保 SQL 语句足够安全，不至于出现安全问题（特别是你的查询依赖于用户的输入）。

在这种情况下，可以使用 WordPress 官方提供的安全审查函数 prepare，该函数可以将用户的输入进行安全转码，从而确保进入数据库的语句都是安全的。

```php
$sql = $wpdb->prepare( 'query' [, value_parameter, value_parameter ... ] );
```

在使用时，我们需要使用 `%s` 这样的数据来替换 SQL 语句中的值，然后在第二个参数中的数组中传入对应的值，进而进行 SQL 的处理，确保 SQL 语句的安全，就像这样。

```php
 $wpdb->prepare( "
   INSERT INTO $wpdb->postmeta
    ( post_id, meta_key, meta_value )
    VALUES ( %d, %s, %s )", 
        10, $metakey, $metavalue )
```

这里支持的占位符包括 `%s`（文字、字符串）、`$d`（数字）。

### 一些常用的变量

在进行数据查询时，可能会用到下面的这些变量，我列举出来，方便读者使用时查询。

- `$wpdb->prefix`：获取表前缀，这个非常重要，不要写死为 `wp_`，因为有的用户是自定义的。
- `$wpdb->num_rows`：获取最近查询的行数，这个比较有用，可以通过这个命令，获取到上一次查询的行数，然后显示在列表里。
- `$wpdb->insert_id`：获取最近插入数据的 ID，用处不是很多，可以通过这个值，来查看是否成功插入。
- `$wpdb->last_result`：获取最后一次执行查询的结果，可以免于查询，直接获取上次查询的结果，减少性能的损耗。
- `$wpdb->last_query`：获取到已经执行过的上一次查询，可以用于展示上一次查询的语句。

### 参考阅读

本篇内容仅介绍了一些常用的方法和变量，实际上，WPDB 还支持更多的方法和变量，如果上述的描述无法满足你的要求，可以前往官方的介绍页面，查看更多的 WPDB 方法。

WordPress 的官方介绍，[详见这里](https://codex.wordpress.org/Class_Reference/wpdb)。
