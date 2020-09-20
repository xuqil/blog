# [返回网址](https://www.django-rest-framework.org/api-guide/reverse/#returning-urls)

> 将REST架构样式与其他基于网络的样式区分开的主要特征是它强调组件之间的统一接口。
>
> — Roy Fielding，[架构风格和基于网络的软件架构设计](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_1_5)

通常，最好从Web API返回绝对URI（例如）`http://example.com/foobar`，而不是返回相对URI（例如）`/foobar`。

这样做的好处是：

- 更明确。
- 它为您的API客户端减少了工作量。
- 在不具有本机URI类型的JSON之类的表示形式中找到字符串时，其含义没有任何歧义。
- 这样可以很轻松地完成诸如使用超链接标记HTML表示之类的事情。

REST框架提供了两个实用程序功能，使从Web API返回绝对URI变得更加简单。

不需要使用它们，但是如果您这样做，则自描述API将能够为您自动超链接其输出，这使浏览API变得更加容易。

## [相反](https://www.django-rest-framework.org/api-guide/reverse/#reverse)

**签名：** `reverse(viewname, *args, **kwargs)`

具有与相同的行为[`django.urls.reverse`](https://docs.djangoproject.com/en/stable/topics/http/urls/#reverse)，除了它返回完全限定的URL（使用请求确定主机和端口）。

您应该**将请求作为**函数**的关键字参数包括在内**，例如：

```
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django.utils.timezone import now

class APIRootView(APIView):
    def get(self, request):
        year = now().year
        data = {
            ...
            'year-summary-url': reverse('year-summary', args=[year], request=request)
        }
        return Response(data)
```

## [reverse_lazy](https://www.django-rest-framework.org/api-guide/reverse/#reverse_lazy)

**签名：** `reverse_lazy(viewname, *args, **kwargs)`

具有与相同的行为[`django.urls.reverse_lazy`](https://docs.djangoproject.com/en/stable/topics/http/urls/#reverse-lazy)，除了它返回完全限定的URL（使用请求确定主机和端口）。

与`reverse`函数一样，您应将**请求作为**函数**的关键字参数包括在内**，例如：

```
api_root = reverse_lazy('api-root', request=request)
```