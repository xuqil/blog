## [要求](https://www.django-rest-framework.org/#requirements)

REST框架要求以下内容：

- Python（3.5、3.6、3.7、3.8）
- Django（1.11、2.0、2.1、2.2、3.0）

我们**强烈建议**并仅正式支持每个Python和Django系列的最新修补程序版本。

以下软件包是可选的：

- [coreapi](https://pypi.org/project/coreapi/)（1.32.0+）-模式生成支持。
- [Markdown](https://pypi.org/project/Markdown/)（3.0.0+）-对可浏览API的Markdown支持。
- [Pygments](https://pypi.org/project/Pygments/)（2.4.0+）-在Markdown处理中添加语法突出显示。
- [django-filter](https://pypi.org/project/django-filter/)（1.0.1+）-过滤支持。
- [django-guardian](https://github.com/django-guardian/django-guardian)（1.1.1+）-对象级别权限支持。

## [安装](https://www.django-rest-framework.org/#installation)

使用安装`pip`，包括所需的任何可选软件包...

```python
pip install djangorestframework
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support
```

...或从github克隆项目。

```python
git clone https://github.com/encode/django-rest-framework
```

添加`'rest_framework'`到您的`INSTALLED_APPS`设置。

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

如果您打算使用可浏览的API，则可能还需要添加REST框架的登录和注销视图。将以下内容添加到您的根`urls.py`文件中。

```python
urlpatterns = [
    ...
    url(r'^api-auth/', include('rest_framework.urls'))
]
```

请注意，URL路径可以是您想要的任何路径。

## [例](https://www.django-rest-framework.org/#example)

让我们看一个使用REST框架构建简单的模型支持的API的快速示例。

我们将创建一个读写API，以访问有关我们项目用户的信息。

REST框架API的所有全局设置都保存在名为的单个配置字典中`REST_FRAMEWORK`。首先将以下内容添加到您的`settings.py`模块中：

```python
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
```

别忘了确保您还添加`rest_framework`了自己的`INSTALLED_APPS`。

我们现在准备创建我们的API。这是我们项目的根`urls.py`模块：

```python
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
```

现在，您可以在浏览器中通过http://127.0.0.1:8000/打开API ，并查看新的“用户” API。如果您使用右上角的登录控件，则还可以从系统中添加，创建和删除用户。

## [快速开始](https://www.django-rest-framework.org/#quickstart)

等不及要开始了？该[快速入门指南](https://www.django-rest-framework.org/tutorial/quickstart/)是启动和运行，并与REST框架构建的API的最快方式。

## [发展历程](https://www.django-rest-framework.org/#development)

有关如何克隆存储库，运行测试套件以及将更改贡献回REST Framework的信息，请参阅[贡献准则](https://www.django-rest-framework.org/community/contributing/)。

## [支持](https://www.django-rest-framework.org/#support)

要获得支持，请参阅[REST框架讨论组](https://groups.google.com/forum/?fromgroups#!forum/django-rest-framework)，在`#restframework`上尝试该 频道`irc.freenode.net`，搜索[IRC档案](https://botbot.me/freenode/restframework/)，或对[Stack Overflow](https://stackoverflow.com/)提出问题，确保包含['django-rest-framework'](https://stackoverflow.com/questions/tagged/django-rest-framework)标签。

要获得优先支持，请签署[专业或高级赞助计划](https://fund.django-rest-framework.org/topics/funding/)。

有关REST框架开发的更新，您可能还想在Twitter上关注[作者](https://twitter.com/_tomchristie)。

[关注@_tomchristie](https://twitter.com/_tomchristie)

## [安全](https://www.django-rest-framework.org/#security)

如果您认为自己在Django REST框架中发现了涉及安全性的内容，请**不要在公共论坛上提出此问题**。

通过电子邮件将问题的描述发送至[rest-framework-security@googlegroups.com](mailto:rest-framework-security@googlegroups.com)。然后，项目维护者将在公开披露之前与您一起解决所需的任何问题。

## [执照](https://www.django-rest-framework.org/#license)

版权所有©2011年至今，[Encode OSSLtd](https://www.encode.io/)。版权所有。

如果满足以下条件，则允许以源代码和二进制形式进行重新分发和使用，无论是否经过修改，都可以：

- 重新分发源代码必须保留以上版权声明，此条件列表和以下免责声明。
- 二进制形式的重新分发必须在分发随附的文档和/或其他材料中复制以上版权声明，此条件列表以及以下免责声明。
- 未经事先特别书面许可，不得使用版权持有者的姓名或其贡献者的名字来认可或促销从该软件衍生的产品。

版权持有者和贡献者按“原样”提供此软件，不提供任何明示或暗示的保证，包括但不限于针对特定目的的适销性和适用性的暗示保证。在任何情况下，版权持有人或贡献者均不对任何直接，间接，偶发，特殊，专有或后果性的损害（包括但不限于，替代商品或服务的购买，使用，数据，或业务中断），无论基于合同，严格责任或侵权行为（包括疏忽或其他方式），无论出于任何责任，无论是否出于使用本软件的目的而作出的赔偿，均已经事先告知。