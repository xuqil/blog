# sys--系统相关的参数和函数

## 常用的方法

```python
sys.argv     #命令行参数List，第一个元素是程序本身路径 
sys.byteorder    #本地字节规则的指示器，big-endian平台的值是'big',little-endian平台的值是'little' 
sys.builtin_module_names #Python解释器导入的模块列表 
sys.copyright    #记录python版权相关的东西 
sys.exec_prefix   #返回平台独立的python文件安装的位置 
sys.exc_info()    #获取当前正在处理的异常类,exc_type、exc_value、exc_traceback当前处理的异常详细信息 
sys.exit(n)    #程序，正常退出时exit(0) 
sys.executable    #Python解释程序路径 
sys.getwindowsversion  #获取Windows的版本
sys.getdefaultencoding  #返回当前你所用的默认的字符编码格式
sys.getfilesystemencoding #返回将Unicode文件名转换成系统文件名的编码的名字
sys.hexversion    #获取Python解释程序的版本值，16进制格式如：0x020403F0 
sys.maxsize     #最大的Int值 
sys.maxunicode    #最大的Unicode值 
sys.modules    #返回系统导入的模块字段，key是模块名，value是模块 
sys.modules.keys()   #返回所有已经导入的模块列表 
sys.path     #返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值 
sys.platform    #返回操作系统平台名称 
sys.stdout     #标准输出  
sys.stdin     #标准输入 
sys.stderr     #错误输出  
sys.stdin.readline   #从标准输入读一行，sys.stdout.write("a") 屏幕输出a
sys.version    #获取Python解释程序的版本信息 
sys.version_info   #获取Python解释器的版本信息 
sys.api_version   #解释器的C的API版本 
sys.winver   #用于在 Windows 平台上组成注册表键的版本号
```

## `sys.argv`

一个列表，其中包含了被传递给 Python 脚本的命令行参数。 `argv[0]` 为脚本的名称（是否是完整的路径名取决于操作系统）。如果是通过 Python 解释器的命令行参数 [`-c`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-c) 来执行的， `argv[0]` 会被设置成字符串 `'-c'` 。如果没有脚本名被传递给 Python 解释器， `argv[0]` 为空字符串。

为了遍历标准输入，或者通过命令行传递的文件列表，参照 [`fileinput`](https://docs.python.org/zh-cn/3/library/fileinput.html#module-fileinput) 模块

> 在 Unix 上，系统传递的命令行参数是字节类型的。Python 使用文件系统编码和 "surrogateescape" 错误处理方案对它们进行解码。当需要原始字节时，可以通过 `[os.fsencode(arg) for arg in sys.argv]` 来获取。



## `sys.byteorder`

本地字节顺序的指示符。在大端序（最高有效位优先）操作系统上值为 `'big'` ，在小端序（最低有效位优先）操作系统上为 `'little'` 。



## `sys.builtin_module_names`

一个元素为字符串的元组。包含了所有的被编译进 Python 解释器的模块。（这个信息无法通过其他的办法获取， `modules.keys()` 只包括被导入过的模块。）



## `sys.copyright`

一个字符串，包含了 Python 解释器有关的版权信息



## `sys.exec_prefix`

一个字符串，提供特定域的目录前缀，该目录中安装了与平台相关的 Python 文件，默认也是 `'/usr/local'`。该目录前缀可以在构建时使用 **configure** 脚本的 `--exec-prefix` 参数进行设置。具体而言，所有配置文件（如 `pyconfig.h` 头文件）都安装在目录 `*exec_prefix*/lib/python*X.Y*/config` 中，共享库模块安装在 `*exec_prefix*/lib/python*X.Y*/lib-dynload` 中，其中 *X.Y* 是 Python 的版本号，如 `3.2`。

> 如果在一个 [虚拟环境](https://docs.python.org/zh-cn/3/library/venv.html#venv-def) 中，那么该值将在 `site.py` 中被修改，指向虚拟环境。Python 安装位置仍然可以用 [`base_exec_prefix`](https://docs.python.org/zh-cn/3/library/sys.html#sys.base_exec_prefix) 来获取。



## `sys.executable`

一个字符串，提供 Python 解释器的可执行二进制文件的绝对路径，仅在部分系统中此值有意义。如果 Python 无法获取其可执行文件的真实路径，则 [`sys.executable`](https://docs.python.org/zh-cn/3/library/sys.html#sys.executable) 将为空字符串或 `None`。



## `sys.exc_info()`

本函数返回的元组包含三个值，它们给出当前正在处理的异常的信息。返回的信息仅限于当前线程和当前堆栈帧。如果当前堆栈帧没有正在处理的异常，则信息将从下级被调用的堆栈帧或上级调用者等位置获取，依此类推，直到找到正在处理异常的堆栈帧为止。此处的“处理异常”指的是“执行 except 子句”。任何堆栈帧都只能访问当前正在处理的异常的信息。

如果整个堆栈都没有正在处理的异常，则返回包含三个 `None` 值的元组。否则返回值为 `(type, value, traceback)`。它们的含义是：*type* 是正在处理的异常类型（它是 [`BaseException`](https://docs.python.org/zh-cn/3/library/exceptions.html#BaseException) 的子类）；*value* 是异常实例（异常类型的实例）；*traceback* 是一个 [回溯对象](https://docs.python.org/zh-cn/3/reference/datamodel.html#traceback-objects)，该对象封装了最初发生异常时的调用堆栈。



## `sys.exit([*arg*])`

从 Python 中退出。实现方式是抛出一个 [`SystemExit`](https://docs.python.org/zh-cn/3/library/exceptions.html#SystemExit) 异常，因此异常抛出后 [`try`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#try) 语句的 finally 分支的清除动作将被触发，这样可能会打断外层的退出尝试。

可选参数 *arg* 可以是表示退出状态的整数（默认为 0），也可以是其他类型的对象。如果它是整数，则 shell 等将 0 视为“成功终止”，非零值视为“异常终止”。大多数系统要求该值的范围是 0--127，否则会产生不确定的结果。某些系统为退出代码约定了特定的含义，但通常尚不完善；Unix 程序通常用 2 表示命令行语法错误，用 1 表示所有其他类型的错误。传入其他类型的对象，如果传入 `None` 等同于传入 0，如果传入其他对象则将其打印至 [`stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr)，且退出代码为 1。特别地，`sys.exit("some error message")` 可以在发生错误时快速退出程序。

由于 [`exit()`](https://docs.python.org/zh-cn/3/library/constants.html#exit) 最终“只是”抛出一个异常，因此当从主线程调用时，只会从进程退出；而异常不会因此被打断。

*在 3.6 版更改:* 在 Python 解释器捕获 [`SystemExit`](https://docs.python.org/zh-cn/3/library/exceptions.html#SystemExit) 后，如果在清理中发生错误（如清除标准流中的缓冲数据时出错），则退出状态码将变为 120。



## `sys.getwindowsversion()`

返回一个具名元组，描述当前正在运行的 Windows 版本。元素名称包括 *major*, *minor*, *build*, *platform*, *service_pack*, *service_pack_minor*, *service_pack_major*, *suite_mask*, *product_type* 和 *platform_version*。*service_pack* 包含一个字符串，*platform_version* 包含一个三元组，其他所有值都是整数。元素也可以通过名称来访问，所以 `sys.getwindowsversion()[0]` 与 `sys.getwindowsversion().major` 是等效的。为保持与旧版本的兼容性，只有前 5 个元素可以用索引检索。

*platform* 将会是 `2 (VER_PLATFORM_WIN32_NT)`。

*product_type* 可能是以下值之一：

| 常数                           | 含义                           |
| :----------------------------- | :----------------------------- |
| `1 (VER_NT_WORKSTATION)`       | 系统是工作站。                 |
| `2 (VER_NT_DOMAIN_CONTROLLER)` | 系统是域控制器。               |
| `3 (VER_NT_SERVER)`            | 系统是服务器，但不是域控制器。 |

本函数包装了 Win32 `GetVersionEx()` 函数，参阅 Microsoft 文档有关 `OSVERSIONINFOEX()` 的内容可获取这些字段的更多信息。



## `sys.getdefaultencoding()`

返回当前 Unicode 实现所使用的默认字符串编码名称。



## `sys.getfilesystemencoding()`

返回编码名称，该编码用于在 Unicode 文件名和 bytes 文件名之间转换。为获得最佳兼容性，任何时候都应使用 str 表示文件名，尽管用字节来表示文件名也是支持的。函数如果需要接受或返回文件名，它应支持 str 或 bytes，并在内部将其转换为系统首选的表示形式。

该编码始终是 ASCII 兼容的。

应使用 [`os.fsencode()`](https://docs.python.org/zh-cn/3/library/os.html#os.fsencode) 和 [`os.fsdecode()`](https://docs.python.org/zh-cn/3/library/os.html#os.fsdecode) 来保证所采用的编码和错误处理方案都是正确的。

- 在 UTF-8 模式下，任何平台上的编码均为 `utf-8`。
- 在 macOS 上，编码为 `'utf-8'`。
- 在 Unix 上，编码是语言环境编码。
- 在 Windows 上取决于用户配置，编码可能是 `'utf-8'` 或 `'mbcs'`。
- 在 Android 上，编码为 `'utf-8'`。
- 在 VxWorks 上，编码为 `'utf-8'`。

*在 3.2 版更改:* [`getfilesystemencoding()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.getfilesystemencoding) 的结果将不再有可能是 `None`。

*在 3.6 版更改:* Windows 不再保证会返回 `'mbcs'`。详情请参阅 [**PEP 529**](https://www.python.org/dev/peps/pep-0529) 和 [`_enablelegacywindowsfsencoding()`](https://docs.python.org/zh-cn/3/library/sys.html#sys._enablelegacywindowsfsencoding)。

*在 3.7 版更改:* 在 UTF-8 模式下返回 'utf-8' 。



## `sys.hexversion`

编码为单个整数的版本号。该整数会确保每个版本都自增，其中适当包括了未发布版本。举例来说，要测试 Python 解释器的版本不低于 1.5.2，请使用:

```
if sys.hexversion >= 0x010502F0:
    # use some advanced feature
    ...
else:
    # use an alternative implementation or warn the user
    ...
```

之所以称它为 `hexversion`，是因为只有将它传入内置函数 [`hex()`](https://docs.python.org/zh-cn/3/library/functions.html#hex) 后，其结果才看起来有意义。也可以使用 [具名元组](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple) [`sys.version_info`](https://docs.python.org/zh-cn/3/library/sys.html#sys.version_info)，它对相同信息有着更人性化的编码。

关于 `hexversion` 的更多信息可以在 [API 和 ABI 版本管理](https://docs.python.org/zh-cn/3/c-api/apiabiversion.html#apiabiversion) 中找到。



## `sys.maxsize`

一个整数，表示 `Py_ssize_t` 类型的变量可以取到的最大值。在 32 位平台上通常为 `2**31 - 1`，在 64 位平台上通常为 `2**63 - 1`。



## `sys.maxunicode`

一个整数，表示最大的 Unicode 码点值，如 `1114111` （十六进制为 `0x10FFFF` ）。*在 3.3 版更改:* 在 [**PEP 393**](https://www.python.org/dev/peps/pep-0393) 之前，`sys.maxunicode` 曾是 `0xFFFF` 或 `0x10FFFF`，具体取决于配置选项，该选项指定将 Unicode 字符存储为 UCS-2 还是 UCS-4。



## `sys.modules`

一个字典，将模块名称映射到已加载的模块。可以操作该字典来强制重新加载模块，或是实现其他技巧。但是，替换的字典不一定会按预期工作，并且从字典中删除必要的项目可能会导致 Python 崩溃。



## `sys.path`

一个由字符串组成的列表，用于指定模块的搜索路径。初始化自环境变量 [`PYTHONPATH`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONPATH)，再加上一条与安装有关的默认路径。

程序启动时将初始化本列表，列表的第一项 `path[0]` 目录含有调用 Python 解释器的脚本。如果脚本目录不可用（比如以交互方式调用了解释器，或脚本是从标准输入中读取的），则 `path[0]` 为空字符串，这将导致 Python 优先搜索当前目录中的模块。注意，脚本目录将插入在 [`PYTHONPATH`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONPATH) 的条目*之前*。

程序可以随意修改本列表用于自己的目的。只能向 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path) 中添加 string 和 bytes 类型，其他数据类型将在导入期间被忽略。



## `sys.platform`

本字符串是一个平台标识符，举例而言，该标识符可用于将特定平台的组件追加到 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path) 中。

对于 Unix 系统（除 Linux 和 AIX 外），该字符串是 *Python 构建时的* `uname -s` 返回的小写操作系统名称，并附加了 `uname -r` 返回的系统版本的第一部分，如 `'sunos5'` 或 `'freebsd8'`。除非需要检测特定版本的系统，否则建议使用以下习惯用法:

```python
if sys.platform.startswith('freebsd'):
    # FreeBSD-specific code here...
elif sys.platform.startswith('linux'):
    # Linux-specific code here...
elif sys.platform.startswith('aix'):
    # AIX-specific code here...
```

对于其他系统，值是：

| 系统           | `平台` 值  |
| :------------- | :--------- |
| AIX            | `'aix'`    |
| Linux          | `'linux'`  |
| Windows        | `'win32'`  |
| Windows/Cygwin | `'cygwin'` |
| macOS          | `'darwin'` |

*在 3.3 版更改:* 在 Linux 上，[`sys.platform`](https://docs.python.org/zh-cn/3/library/sys.html#sys.platform) 将不再包含副版本号。它将总是 `'linux'` 而不是 `'linux2'` 或 `'linux3'`。由于旧版本的 Python 会包含该版本号，因此推荐总是使用上述 `startswith` 习惯用法。

*在 3.8 版更改:* 在 AIX 上，[`sys.platform`](https://docs.python.org/zh-cn/3/library/sys.html#sys.platform) 将不再包含副版本号。它将总是 `'aix'` 而不是 `'aix5'` 或 `'aix7'`。由于旧版本的 Python 会包含该版本号，因此推荐总是使用上述 `startswith` 习惯用法。

>  [`os.name`](https://docs.python.org/zh-cn/3/library/os.html#os.name) 更加简略。[`os.uname()`](https://docs.python.org/zh-cn/3/library/os.html#os.uname) 提供系统的版本信息。
>
> [`platform`](https://docs.python.org/zh-cn/3/library/platform.html#module-platform) 模块提供了对系统标识更详细的检查。



## `sys.stdin`

`sys.stdout`

`sys.stderr`

解释器用于标准输入、标准输出和标准错误的 [文件对象](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)：

- `stdin` 用于所有交互式输入（包括对 [`input()`](https://docs.python.org/zh-cn/3/library/functions.html#input) 的调用）；
- `stdout` 用于 [`print()`](https://docs.python.org/zh-cn/3/library/functions.html#print) 和 [expression](https://docs.python.org/zh-cn/3/glossary.html#term-expression) 语句的输出，以及用于 [`input()`](https://docs.python.org/zh-cn/3/library/functions.html#input) 的提示符；
- 解释器自身的提示符和它的错误消息都发往 `stderr`。

这些流都是常规 [文本文件](https://docs.python.org/zh-cn/3/glossary.html#term-text-file)，与 [`open()`](https://docs.python.org/zh-cn/3/library/functions.html#open) 函数返回的对象一致。它们的参数选择如下：

- 字符编码取决于各个平台。在非 Windows 平台上使用的是语言环境 (locale) 编码（可参阅 [`locale.getpreferredencoding()`](https://docs.python.org/zh-cn/3/library/locale.html#locale.getpreferredencoding) ）。

  在 Windows 上，控制台设备使用 UTF-8 编码。非字符设备（如磁盘文件和管道）使用系统语言环境编码（即 ANSI 代码页）。非控制台字符设备（即 `isatty()` 返回的是 `True`，如 NUL）在启动时，会把控制台输入代码页和输出代码页的值分别用于 stdin 和 stdout/stderr。如果进程原本没有附加到控制台，则默认为系统语言环境编码。

  要重写控制台的特殊行为，可以在启动 Python 前设置 PYTHONLEGACYWINDOWSSTDIO 环境变量。此时，控制台代码页将用于其他字符设备。

  在所有平台上，都可以通过在 Python 启动前设置 [`PYTHONIOENCODING`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONIOENCODING) 环境变量来重写字符编码，或通过新的 [`-X`](https://docs.python.org/zh-cn/3/using/cmdline.html#id5) `utf8` 命令行选项和 [`PYTHONUTF8`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONUTF8) 环境变量来设置。但是，对 Windows 控制台来说，上述方法仅在设置了 [`PYTHONLEGACYWINDOWSSTDIO`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONLEGACYWINDOWSSTDIO) 后才起效。

- 交互模式下，`stdout` 流是行缓冲的。其他情况下，它像常规文本文件一样是块缓冲的。两种情况下的 `stderr` 流都是行缓冲的。要使得两个流都变成无缓冲，可以传入 [`-u`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-u) 命令行选项或设置 [`PYTHONUNBUFFERED`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONUNBUFFERED) 环境变量。

*在 3.9 版更改:* 非交互模式下，`stderr` 现在是行缓冲的，而不是全缓冲的。

> 某些情况下的 `stdin`、`stdout` 和 `stderr` 以及初始值 `__stdin__`、`__stdout__` 和 `__stderr__` 可以是 `None`。通常发生在未连接到控制台的 Windows GUI app 中，以及在用 **pythonw** 启动的 Python app 中。

例：

```python
import sys
try:
    while True:
        print('Please input a number:')
        n = int(sys.stdin.readline().strip('\n')) #strip('\n')表示以\n分隔，否则输出是“字符串+\n”的形式
        print('Please input some numbers:')
        sn = sys.stdin.readline().strip()#若是多输入，strip()默认是以空格分隔，返回一个包含多个字符串的list。
        if sn == '':
            break
        sn = list(map(int,sn.split())) #如果要强制转换成int等类型，可以调用map()函数。
        print(n)
        print(sn,'\n')
except:
    pass

```



## `sys.version`

一个包含 Python 解释器版本号加编译版本号以及所用编译器等额外信息的字符串。 此字符串会在交互式解释器启动时显示。 请不要从中提取版本信息，而应当使用 [`version_info`](https://docs.python.org/zh-cn/3/library/sys.html#sys.version_info) 以及 [`platform`](https://docs.python.org/zh-cn/3/library/platform.html#module-platform) 模块所提供的函数。



## `sys.api_version`

这个解释器的 C API 版本。当你在调试 Python及期扩展模板的版本冲突这个功能非常有用。

```
sys.api_version
...sys.version_info(major=3, minor=6, micro=8, releaselevel='final', serial=0)
```





## `sys.version_info`

一个包含版本号五部分的元组: *major*, *minor*, *micro*, *releaselevel* 和 *serial*。 除 *releaselevel* 外的所有值均为整数；发布级别值则为 `'alpha'`, `'beta'`, `'candidate'` 或 `'final'`。 对应于 Python 版本 2.0 的 `version_info` 值为 `(2, 0, 0, 'final', 0)`。 这些部分也可按名称访问，因此 `sys.version_info[0]` 就等价于 `sys.version_info.major`，依此类推。*在 3.1 版更改:* 增加了以名称表示的各部分属性。



## `sys.winver`

用于在 Windows 平台上组成注册表键的版本号。 这在 Python DLL 中存储为 1000 号字符串资源。 其值通常是 [`version`](https://docs.python.org/zh-cn/3/library/sys.html#sys.version) 的头三个字符。 它在 [`sys`](https://docs.python.org/zh-cn/3/library/sys.html#module-sys) 模块中提供是为了信息展示目的；修改此值不会影响 Python 所使用的注册表键。

[可用性](https://docs.python.org/zh-cn/3/library/intro.html#availability): Windows。