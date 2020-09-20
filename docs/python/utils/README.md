# 配置 pip国内镜像源



## 说明

因国内网络问题，直接 pip 安装包有时速度会非常慢，而且经常会出现装到一半失败了的问题。既然这样，我们就要充分利用国内镜像的力量，节省时间，明显提高 pip 安装的效率。

配置一般分为暂时置换和永久置换源镜像两种方法，选择哪一种视场景而定，不过一般推荐永久置换。

## Linux

## 镜像源

- 豆瓣 (douban) http://pypi.douban.com/simple/ (推荐)
- 阿里云 http://mirrors.aliyun.com/pypi/simple/
- 清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
- 中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
- 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

推荐豆瓣 douban 镜像源，以下的所有示例也都会以豆瓣镜像源为例。

### 第一种：永久置换 pip 镜像源（推荐）

#### 1. 创建 pip.conf 文件

> 注意：如果你已经有 `~/.pip/pip.conf` 文件的话这步可以跳过。

运行以下命令：

```python
$ cd ~/.pip
```

提示目录不存在的话就创建一个新的：

```python
$ mkdir ~/.pip
$ cd ~/.pip
```

在 `.pip` 目录下创建一个 `pip.conf` 文件：

```python
$ touch pip.conf
```

#### 2. 编辑 pip.conf 文件

使用 vi 或者任何编辑器修改此文件：

```python
$ vi ~/.pip/pip.conf
```

新增如下内容：

*~/.pip/pip.conf*

```python
[global] 
index-url = http://pypi.douban.com/simple 
[install] 
trusted-host=pypi.douban.com
```

这样就替换成功了，你也可以选择其他镜像源。

#### 3. 测试一下

尝试安装 django 库，运行：

```python
$ pip install django
Looking in indexes: http://pypi.douban.com/simple
Collecting django
  Downloading http://pypi.doubanio.com/packages/b6/cf/8cbe9bd4bb83ce2dd277564b43435edb7b151a099458e63706d10ec9e4fa/Django-2.1.tar.gz (8.6MB)
    100% |████████████████████████████████| 8.6MB 8.3MB/s
    ...
```

大功告成。

### 第二种：暂时置换 pip 镜像源

还是以豆瓣镜像源为例，接下来我们安装 pygame 包，你可以替换成你想安装的其他包名称：

```python
$ pip install pygame -i http://pypi.douban.com/simple
```

这步如果出错，请将命令变换为：

```python
$ pip install pygame -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
```

安装效果：

```python
$ pip install pygame -i http://pypi.douban.com/simple
Looking in indexes: http://pypi.douban.com/simple
Collecting pygame
  Downloading http://pypi.doubanio.com/packages/fe/83/0d313164c4f693892047327223775d3112fdb869900f2754bd134d7e76cc/pygame-1.9.4-cp27-cp27m-macosx_10_11_intel.whl (4.9MB)
    100% |████████████████████████████████| 4.9MB 10.3MB/s
Installing collected packages: pygame
Successfully installed pygame-1.9.4
```

## win10更改pip源

具体做法
在c:\user(或者用户)\电脑的用户名\，目录下创建一个命名为“pip”的文件夹（如：C:\Users\Administrator\pip），在该文件夹下创建一个命名为“pip.ini”的文件，在该文件中写入以下内容：

```ini
[global]
index-url=https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host=pypi.tuna.tsinghua.edu.cn
disable-pip-version-check = true
timeout = 6000
```

