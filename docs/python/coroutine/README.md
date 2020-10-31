# 协程与任务

协程又称微线程，英文名coroutine。协程运行起来像线程，把各个任务分发在背后一起运行，其实就是异步。协程是单线程的，比起多线程更具优势（针对python），多线线程之间有线程切换开销，而协程只在一个线程里执行，把任务扔出去，不管它，可以处理其他事，任务执行完毕后再处理它。

python的协程使用的是asynio标准库



## 协程

协程 通过 async/await 语法进行声明，是编写 asyncio 应用的推荐方式。 例如，以下代码段（需要 Python 3.7+）会打印 "hello"，等待 1 秒，再打印 "world":

```python
>>> import asyncio

>>> async def main():
...     print('hello')
...     await asyncio.sleep(1)
...     print('world')

>>> asyncio.run(main())
hello
world
```

注意：简单地调用一个协程并不会将其加入执行任务:

```python
>>> main()
<coroutine object main at 0x000001DD2975E140>
```

要真正运行一个协程，asyncio 提供了三种主要机制:

- `asyncio.run()` 函数用来运行最高层级的入口点 "main()" 函数 (参见上面的示例。)

- 等待一个协程。以下代码段会在等待 1 秒后打印 "hello"，然后 *再次* 等待 2 秒后打印 "world":

  ```python
  import time
  import asyncio
  
  async def say_after(delay, what):
      await asyncio.sleep(delay)
      print(what)
  
  async def main():
      print(f"started at {time.strftime('%X')}")
  
      await say_after(1, 'hello')  # 先执行
      await say_after(2, 'world')  # 再执行
  
      print(f"finished at {time.strftime('%X')}")
  
  asyncio.run(main())
  ```

  预期的输出:

  ```python
  started at 23:07:39
  hello
  world
  finished at 23:07:42
  ```

- `asyncio.create_task()` 函数用来并发运行作为 asyncio `任务`的多个协程。

  让我们修改以上示例，*并发* 运行两个 `say_after` 协程:

  ```python
  async def main():
      task1 = asyncio.create_task(
          say_after(1, 'hello'))
  
      task2 = asyncio.create_task(
          say_after(2, 'world'))
  
      print(f"started at {time.strftime('%X')}")
  
      # task1和task2同时执行，实现并发；一共用了2秒，因为时间最长的任务task2是2秒
      await task1
      await task2
  
      print(f"finished at {time.strftime('%X')}")
  ```

## 可等待对象

如果一个对象可以在 `await` 语句中使用，那么它就是 **可等待** 对象。许多 asyncio API 都被设计为接受可等待对象。

*可等待* 对象有三种主要类型: **协程**, **任务** 和 **Future**.

### 协程

Python 协程属于 *可等待* 对象，因此可以在其他协程中被等待:

```python
import asyncio

async def nested():
    return 42

async def main():
    # Nothing happens if we just call "nested()".
    # A coroutine object is created but not awaited,
    # so it *won't run at all*.
    nested()

    # Let's do it differently now and await it:
    print(await nested())  # will print "42".

asyncio.run(main())
```

**重要**：在本文档中 "协程" 可用来表示两个紧密关联的概念:

- *协程函数*: 定义形式为 `async def` 的函数;
- *协程对象*: 调用 *协程函数* 所返回的对象。

asyncio 也支持旧式的 `基于生成器的 `协程。

### 任务

*任务* 被用来设置调度以便 *并发* 执行协程。

当一个协程通过 `asyncio.create_task()`等函数被打包为一个 *任务*，该协程将自动排入日程准备立即运行:

```python
import asyncio

async def nested():
    return 42

async def main():
    # 使用create_task将nested()创建为一个任务，可以使用main函数执行
    task = asyncio.create_task(nested())

    # task可以取消，或者等待执行完毕
    await task 
    #print(await task)   42
    #print(task.cancel())  False
    #print(task.done())   True

asyncio.run(main())
```

### Future 对象

`Future` 是一种特殊的 **低层级** 可等待对象，表示一个异步操作的 **最终结果**。

- 当一个 Future 对象 *被等待*，这意味着协程将保持等待直到该 Future 对象在其他地方操作完毕。

- 在 asyncio 中需要 Future 对象以便允许通过 async/await 使用基于回调的代码。

- 通常情况下 **没有必要** 在应用层级的代码中创建 Future 对象。

Future 对象有时会由库和某些 asyncio API 暴露给用户，用作可等待对象:

```python
async def main():
    await function_that_returns_a_future_object()

    # this is also valid:
    await asyncio.gather(
        function_that_returns_a_future_object(),
        some_python_coroutine()
    )
```

一个很好的返回对象的低层级函数的示例是 [`loop.run_in_executor()`](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio.loop.run_in_executor)。

## 运行 asyncio 程序

### `asyncio.run`

`asyncio.run(coro, *, debug=False)`

- 执行 `coroutine `（**协程**）*coro*函数 并返回结果。

- 此函数会运行传入的协程，负责管理 asyncio 事件循环，*终结异步生成器*，并关闭线程池。

- 当有其他 asyncio 事件循环在同一线程中运行时，此函数不能被调用。

- 如果 *debug* 为 `True`，事件循环将以调试模式运行。

- 此函数总是会创建一个新的事件循环并在结束时关闭之。它应当被用作 **asyncio 程序的主入口点，理想情况下应当只被调用一次**。

示例:

```python
async def main():
    await asyncio.sleep(1)
    print('hello')

asyncio.run(main())
```

## 创建任务

### `asyncio.create_task`

`asyncio.create_task(coro, *, name=None)`

- 将 *coro* 协程打包为一个 [`Task`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.Task) 排入日程准备执行。返回 Task 对象。

- *name* 不为 `None`，它将使用 [`Task.set_name()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.Task.set_name) 来设为任务的名称。

- 该任务会在 [`get_running_loop()`](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio.get_running_loop) 返回的循环中执行，如果当前线程没有在运行的循环则会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/library/exceptions.html#RuntimeError)。

此函数 **在 Python 3.7 中被加入**。在 Python 3.7 之前，可以改用低层级的 [`asyncio.ensure_future()`](https://docs.python.org/zh-cn/3/library/asyncio-future.html#asyncio.ensure_future) 函数。

```python
async def coro():
    ...

# In Python 3.7+
task = asyncio.create_task(coro())
...

# This works in all Python versions but is less readable
task = asyncio.ensure_future(coro())
...
```

*3.7 新版功能.*

*在 3.8 版更改:* 添加了 `name` 形参。

## 休眠

### `asyncio.sleep`

`coroutine asyncio.sleep(delay, result=None, *, loop=None)`

- 阻塞 *delay* 指定的秒数。

- 如果指定了 *result*，则当协程完成时将其返回给调用者。

- `sleep()` 总是会挂起当前任务，以允许其他任务运行。

以下协程示例运行 5 秒，每秒显示一次当前日期:

```python
import asyncio
import datetime

async def display_date():
    loop = asyncio.get_running_loop()
    end_time = loop.time() + 5.0
    while True:
        print(datetime.datetime.now())
        if (loop.time() + 1.0) >= end_time:
            break
        await asyncio.sleep(1)  # 休眠1s

asyncio.run(display_date())
```

## 并发运行任务

### `asyncio.gather`

`awaitable asyncio.gather(*aws, loop=None, return_exceptions=False)`

- aws为一个或多个协程对象

- *并发* 运行 *aws* 序列中的 *可等待对象*。

-  *aws* 中的可等待对象为协程，自动作为一个任务加入调度。

- 如果所有可等待对象都成功完成，结果将是一个由所有返回值聚合而成的列表。结果值的顺序与 *aws* 中可等待对象的顺序一致。

- 如果 *return_exceptions* 为 `False` (默认)，所引发的首个异常会立即传播给等待 `gather()` 的任务。*aws* 序列中的其他可等待对象 **不会被取消** 并将继续运行。
- 如果 *return_exceptions* 为 `False` (默认)，当aws中某个任务抛出异常时，会影响其他没有完成的任务，会直接终止任务的执行。

- 如果 *return_exceptions* 为 `True`，异常会和成功的结果一样处理，并聚合至结果列表。

- 如果 `gather()` *被取消*，所有被提交 (尚未完成) 的可等待对象也会 *被取消*。

- 如果 *aws* 序列中的任一 Task 或 Future 对象 *被取消*，它将被当作引发了 [`CancelledError`](https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.CancelledError) 一样处理 -- 在此情况下 `gather()` 调用 **不会** 被取消。这是为了防止一个已提交的 Task/Future 被取消导致其他 Tasks/Future 也被取消。

示例：

```python
import asyncio

async def factorial(name, number):
    f = 1
    for i in range(2, number + 1):
        print(f"Task {name}: Compute factorial({i})...")
        await asyncio.sleep(1)
        f *= i
    print(f"Task {name}: factorial({number}) = {f}")

async def main():
    # 调度了三个任务
    await asyncio.gather(
        factorial('A', 1),
        factorial('B', 2),
        factorial('C', 3),
    )

asyncio.run(main())

# Expected output:
#
# Task A: factorial(1) = 1
# Task B: Compute factorial(2)...
# Task C: Compute factorial(2)...
# Task B: factorial(2) = 2
# Task C: Compute factorial(3)...
# Task C: factorial(3) = 6
```

> 注意：如果 *return_exceptions* 为 False，则在 gather() 被标记为已完成后取消它将不会取消任何已提交的可等待对象。 例如，在将一个异常传播给调用者之后，gather 可被标记为已完成，因此，在从 gather 捕获一个（由可等待对象所引发的）异常之后调用 `gather.cancel()` 将不会取消任何其他可等待对象。

- `return_exceptions =False`：

  ```python
  import asyncio
  
  async def factorial(name, number):
      f = 1
      for i in range(2, number + 1):
          print(f"Task {name}: Compute factorial({i})...")
          await asyncio.sleep(1)
          f *= i
      print(f"Task {name}: factorial({number}) = {f}")
  
  
  async def factorial2(name, number):
      task = asyncio.create_task(demo())
      task.cancel()
      await task  # task取消了，发生异常
      print(f"Task {name}: factorial({number})")
  
  async def demo():
      data = [i for i in range(1000)]
      await asyncio.sleep(1)
      print(data)
  
  async def main():
      # 调度了三个任务
      try:
          print(await asyncio.gather(
              factorial('A', 1),
              factorial('B', 2),
              factorial('C', 3),
              factorial2('D', 1),
              return_exceptions=False
          ))
      except asyncio.CancelledError as e:
          print(e)
  
  asyncio.run(main())
  
  # 没有执行完成的所有的任务都被停止执行
  # Expected output:
  #
  # Task A: factorial(1) = 1
  # Task B: Compute factorial(2)...
  # Task C: Compute factorial(2)...
  ```

- `return_exceptions =True`：

  ```python
  ...
  
  async def main():
      # 调度了三个任务
      try:
          print(await asyncio.gather(
              factorial('A', 1),
              factorial('B', 2),
              factorial('C', 3),
              factorial2('D', 1),
              return_exceptions=True
          ))
      except asyncio.CancelledError as e:
          print(e)
  
  
  asyncio.run(main())
  
  # 不会影响其他任务，没有执行完成的所有的任务会继续执行下去
  # 错误处理返回在任务结果列表里
  # Expected output:
  #
  # Task A: factorial(1) = 1
  # Task B: Compute factorial(2)...
  # Task C: Compute factorial(2)...
  # Task B: factorial(2) = 2
  # Task C: Compute factorial(3)...
  # Task C: factorial(3) = 6
  # [None, None, None, CancelledError()]
  ```

在 3.7 版更改: 如果 gather 本身被取消，则无论 return_exceptions 取值为何，消息都会被传播。

## 屏蔽取消操作

### `asyncio.shield`

`awaitable asyncio.shield(aw, *, loop=None)`

- 保护一个 *可等待对象* 防止其被 **取消**。

-  *aw* 是一个协程，作为任务加入调度。

以下语句:

```python
res = await shield(something())
```

相当于:

```python
res = await something()
```

*不同之处* 在于如果包含它的协程被取消，在 `something()` 中运行的任务不会被取消。从 `something()` 的角度看来，取消操作并没有发生。然而其调用者已被取消，因此 "await" 表达式仍然会引发 `CancelledError`。

如果通过其他方式取消 `something()` (例如在其内部操作) 则 `shield()` 也会取消。

如果希望完全忽略取消操作 (不推荐) 则 `shield()` 函数需要配合一个 try/except 代码段，如下所示:

```python
try:
    res = await shield(something())
except asyncio.CancelledError:
    res = None
```

> `shield` 似乎没什么效果，并不能屏蔽取消操作

## 超时

### `asyncio.wait_for`

`coroutine asyncio.wait_for(aw, timeout, *, loop=None)`

- 等待 *aw* 可等待对象完成，指定 timeout 秒数后超时。

- *aw* 是一个协程，自动作为任务加入调度。

- *timeout* 可以为 `None`，也可以为 float 或 int 型数值表示的等待秒数。如果 *timeout* 为 `None`，则等待直到完成。

- 如果发生超时，任务将取消并引发 `asyncio.TimeoutError`。

- 要避免任务取消，可以加上 `shield()`。

- 此函数将等待直到 Future 确实被取消，所以总等待时间可能超过 *timeout*。 如果在取消期间发生了异常，异常将会被传播。

- 如果等待被取消，则 *aw* 指定的对象也会被取消。

示例:

```python
async def eternity():
    # Sleep for one hour
    await asyncio.sleep(3600)
    print('yay!')

async def main():
    # Wait for at most 1 second
    try:
        await asyncio.wait_for(eternity(), timeout=1.0)
    except asyncio.TimeoutError:
        print('timeout!')

asyncio.run(main())

# Expected output:
#
#     timeout!
```

在 3.7 版更改: 当 aw 因超时被取消，wait_for 会等待 aw 被取消。之前版本则将立即引发` asyncio.TimeoutError`。

> **注意**：等待`create_task`创建的任务超时，调用`done()`获取的结果为True，令人迷惑

```python
import asyncio
async def eternity():
    # Sleep for one hour
    await asyncio.sleep(3600)
    print('yay!')

async def main():
    # Wait for at most 1 second
    task = asyncio.create_task(eternity())
    try:
        await asyncio.wait_for(task, timeout=1.0)
    except asyncio.TimeoutError:
        print('timeout!')
        print(task.cancelled())
        print(task.done())

asyncio.run(main())

# Expected output:
#
#	timeout!
#	True
#	True
```

## 简单等待

### `asyncio.wait`

`coroutine asyncio.wait(aws, *, loop=None, timeout=None, return_when=ALL_COMPLETED)`

- 并发运行 *aws* 指定的 可等待对象并阻塞线程直到满足` *return_when* `指定的条件。

- *aws* 集必须不为空。

- 返回两个 Task/Future 集合: `(done, pending)`。
- 指定 *timeout* (float 或 int 类型) 则它将被用于控制返回之前等待的最长秒数。
  - 请注意此函数不会引发 `asyncio.TimeoutError`。当超时发生时，未完成的 Future 或 Task 将在指定秒数后被返回。

用法:

```python
done, pending = await asyncio.wait(aws)
```

*return_when* 指定此函数应在何时返回。它必须为以下常数之一:

| 常数              | 描述                                                         |
| :---------------- | :----------------------------------------------------------- |
| `FIRST_COMPLETED` | 函数将在任意可等待对象结束或取消时返回。                     |
| `FIRST_EXCEPTION` | 函数将在任意可等待对象因引发异常而结束时返回。当没有引发任何异常时它就相当于 `ALL_COMPLETED`。 |
| `ALL_COMPLETED`   | 函数将在所有可等待对象结束或取消时返回。                     |

与 `wait_for()`不同，`wait()` 在超时发生时不会取消可等待对象。

> *3.8 版后已移除:* 如果 *aws* 中的某个可等待对象为协程，它将自动作为任务加入调度。直接向 `wait()` 传入协程对象已弃用，因为这会导致 令人迷惑的行为。

- 示例

  **注意：**`wait()` 会自动将协程作为任务加入调度，以后将以 `(done, pending)` 集合形式返回显式创建的任务对象。因此以下代码并不会有预期的行为:

  ```python
  import asyncio
  
  async def foo():
      return 42
  
  async def main():
      coro = foo()
      done, pending = await asyncio.wait({coro})
      if coro in done:
          # 跟预期的不一样，core不会在done集合里面
          print('ok')
      for task in done:
          # 但是可以获取任务结果，说明任务执行完毕
          print(task.result()) 
  
  if __name__ == '__main__':
      asyncio.run(main())
      
  # Expected output:
  #
  #  42
  ```

  以上代码段的修正方法如下:

  ```python
  import asyncio
  
  async def foo():
      return 42
  
  async def main():
      task = asyncio.create_task(foo())
      done, pending = await asyncio.wait({task})
      if task in done:
          # 跟预期的一样
          print('ok') 
      for task in done:
          # 但是可以获取任务结果，说明任务执行完毕
          print(task.result())
  
  if __name__ == '__main__':
      asyncio.run(main())
      
  # Expected output:
  #
  #  ok
  #  42
  ```

- 超时设置（timeout）

  > **注意**：与`wait_for()`相反，任务超时后，调用`done()`获取的结果为`False`，任务并没有被取消，也没有执行完成

  ```python
  import asyncio
  
  async def foo():
      await asyncio.sleep(3600)
      print('hello')
      return 42
  
  async def main():
      task = asyncio.create_task(foo())
      task.set_name('Task-foo1')
      done, pending = await asyncio.wait({task}, timeout=1)
      if task in pending:
          print(f'{task.get_name()} [cancelled] {task.cancelled()}')
          print(f'{task.get_name()} [done] {task.done()}')
  
      task2 = asyncio.create_task(foo())
      task2.set_name('Task-foo2')
      try:
          await asyncio.wait_for(task2, timeout=1)
      except asyncio.TimeoutError:
          print(f'{task2.get_name()} timeout')
      print(f'{task2.get_name()} [cancelled] {task2.cancelled()}')
      print(f'{task2.get_name()} [done] {task2.done()}')
  
  if __name__ == '__main__':
      asyncio.run(main())
  
  
  # Expected output:
  #
  # Task-foo1 [cancelled] False
  # Task-foo1 [done] False
  # Task-foo2 timeout
  # Task-foo2 [cancelled] True
  # Task-foo2 [done] True
  ```

- 指定参数`return_when `

  - `return_when`默认值为`ALL_COMPLETED`，当所有任务执行完毕后才会返回。

  - `return_when`为`FIRST_COMPLETED`时，函数将在任意任务结束或取消时返回，其他未完成的任务会被取消。

    ```python
    import asyncio
    
    async def foo():
        return 42
    
    async def bar():
        await asyncio.sleep(3600)
        return 10
    
    async def main():
        task1 = asyncio.create_task(foo())
        task2 = asyncio.create_task(bar())
        done, pending = await asyncio.wait({task1, task2}, return_when=asyncio.FIRST_COMPLETED)
        if task1 in done:
            print(f'[done] {task1.done()}')
            print(f'[result] {task1.result()}')
    
        if task2 in pending:
            print(f'[cancel] {task2.cancel()}')
            
    asyncio.run(main())
    
    # Expected output:
    #
    # [done] True
    # [result] 42
    # [cancel] True
    ```

  - `return_when`为`FIRST_COMPLETED`时，函数将在任意任务因引发异常而结束时返回。当没有引发任何异常时它就相当于 `ALL_COMPLETED`。

### `asyncio.as_completed`

`asyncio.as_completed(aws, *, loop=None, timeout=None)`

- 并发地运行 *aws* 集合中的 可等待对象。 返回一个协程的迭代器。 所返回的每个协程可被等待以从剩余的可等待对象集合中获得最早的下一个结果。

- 如果在所有 Future 对象完成前发生超时则将引发 `asyncio.TimeoutError`。

示例：

```python
import asyncio

async def foo():
    return 42

async def main():
    task1 = asyncio.create_task(foo())
    # for core in asyncio.as_completed({task1}):
    for core in asyncio.as_completed({foo()}):
        result = await core
        print(result)

if __name__ == '__main__':
    asyncio.run(main())

```

## 在线程中运行

### `asyncio.to_thread`

`coroutine asyncio.to_thread(func, /, *args, **kwargs)`

- 在不同的线程中异步地运行函数 *func*。

- 向此函数提供的任何 *args 和 **kwargs 会被直接传给 *func*。 并且，当前 [`contextvars.Context`](https://docs.python.org/zh-cn/3/library/contextvars.html#contextvars.Context) 会被传播，允许在不同的线程中访问- 来自事件循环的上下文变量。

- 返回一个可被等待以获取 *func* 的最终结果的协程。

这个协程函数主要是用于执行在其他情况下会阻塞事件循环的 IO 密集型函数/方法。 例如:

```python
def blocking_io():
    print(f"start blocking_io at {time.strftime('%X')}")
    # Note that time.sleep() can be replaced with any blocking
    # IO-bound operation, such as file operations.
    time.sleep(1)
    print(f"blocking_io complete at {time.strftime('%X')}")

async def main():
    print(f"started main at {time.strftime('%X')}")

    await asyncio.gather(
        asyncio.to_thread(blocking_io),
        asyncio.sleep(1))

    print(f"finished main at {time.strftime('%X')}")


asyncio.run(main())

# Expected output:
#
# started main at 19:50:53
# start blocking_io at 19:50:53
# blocking_io complete at 19:50:54
# finished main at 19:50:54
```

在任何协程中直接调用` blocking_io() `将会在调用期间阻塞事件循环，导致额外的 1 秒运行时间。 而通过改用` asyncio.to_thread()`，我们可以在不同的线程中运行它从而不会阻塞事件循环。

> **注意：**由于 [GIL](https://docs.python.org/zh-cn/3/glossary.html#term-gil) 的存在，asyncio.to_thread() 通常只能被用来将 IO 密集型函数变为非阻塞的。 但是，对于会释放 GIL 的扩展模块或无此限制的替代性 Python 实现来说，asyncio.to_thread() 也可被用于 CPU 密集型函数。

3.9 新版功能

## 来自其他线程的调度安排

### `asyncio.run_coroutine_threadsafe`

`asyncio.run_coroutine_threadsafe(coro, loop)`

- 向指定事件循环提交一个协程。线程安全。

- 返回一个 [`concurrent.futures.Future`](https://docs.python.org/zh-cn/3/library/concurrent.futures.html#concurrent.futures.Future) 以等待来自其他 OS 线程的结果。

此函数应该从另一个 OS 线程中调用，而非事件循环运行所在线程。示例:

```python
# Create a coroutine
coro = asyncio.sleep(1, result=3)

# Submit the coroutine to a given loop
future = asyncio.run_coroutine_threadsafe(coro, loop)

# Wait for the result with an optional timeout argument
assert future.result(timeout) == 3
```

如果在协程内产生了异常，将会通知返回的 Future 对象。它也可被用来取消事件循环中的任务:

```python
try:
    result = future.result(timeout)
except asyncio.TimeoutError:
    print('The coroutine took too long, cancelling the task...')
    future.cancel()
except Exception as exc:
    print(f'The coroutine raised an exception: {exc!r}')
else:
    print(f'The coroutine returned: {result!r}')
```

不同与其他 asyncio 函数，此函数要求显式地传入 *loop* 参数。

3.5.1 新版功能.

## 内省

### `asyncio.current_task`

`asyncio.current_task(loop=None)`

- 返回当前运行的 `Task` 实例，如果没有正在运行的任务则返回 `None`。

- 如果 *loop* 为 `None` 则会使用 [`get_running_loop()`](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio.get_running_loop) 获取当前事件循环。

*3.7 新版功能.*

### `asyncio.all_tasks`

`asyncio.all_tasks(loop=None)`

返回事件循环所运行的未完成的 `Task` 对象的集合。

如果 *loop* 为 `None`，则会使用 `get_running_loop()`获取当前事件循环。

*3.7 新版功能.*

示例：

```python
import asyncio

async def foo():
    print('ok')
    return 42

async def bar():
    print('ok')
    await asyncio.sleep(3)
    return 42

async def main():
    task = asyncio.create_task(foo())
    task.set_name('Task-foo')
    task2 = asyncio.create_task(bar())
    task2.set_name('Task-bar')
    loop = asyncio.get_running_loop()
    running_loop = asyncio.all_tasks(loop)
    for task in running_loop:
        print(f'{task.get_name()}  {task.done()}')


asyncio.run(main())


# Expected output:
# 
# ok
# ok
# Task-1
# False
```

## Task 对象

### `asyncio.Task`

`class asyncio.Task(coro, *, loop=None, name=None)`

一个与 [`Future `](https://docs.python.org/zh-cn/3/library/asyncio-future.html#asyncio.Future) 类似的对象，可运行 Python 协程。非线程安全。

Task 对象被用来在事件循环中运行协程。如果一个协程在等待一个 Future 对象，Task 对象会挂起该协程的执行并等待该 Future 对象完成。当该 Future 对象 *完成*，被打包的协程将恢复执行。

事件循环使用协同日程调度: 一个事件循环每次运行一个 Task 对象。而一个 Task 对象会等待一个 Future 对象完成，该事件循环会运行其他 Task、回调或执行 IO 操作。

使用高层级的 `asyncio.create_task()`函数来创建 Task 对象，也可用低层级的 `loop.create_task()`或 `ensure_future()`函数。不建议手动实例化 Task 对象。

要取消一个正在运行的 Task 对象可使用 `cancel()`方法。调用此方法将使该 Task 对象抛出一个 `CancelledError`异常给打包的协程。如果取消期间一个协程正在等待一个 Future 对象，该 Future 对象也将被取消。

`cancelled()`可被用来检测 Task 对象是否被取消。如果打包的协程没有抑制 `CancelledError`异常并且确实被取消，该方法将返回 `True`。

`asyncio.Task`从 `Future`继承了其除 `Future.set_result()`和 `Future.set_exception()`以外的所有 API。

Task 对象支持 [`contextvars`](https://docs.python.org/zh-cn/3/library/contextvars.html#module-contextvars) 模块。当一个 Task 对象被创建，它将复制当前上下文，然后在复制的上下文中运行其协程。

*在 3.7 版更改:* 加入对 `contextvars`模块的支持。

*在 3.8 版更改:* 添加了 `name` 形参。

- `cancel`(*msg=None*)

  请求取消 Task 对象。这将安排在下一轮事件循环中抛出一个 [`CancelledError`](https://docs.python.org/zh-cn/3/library/asyncio-exceptions.html#asyncio.CancelledError) 异常给被封包的协程。协程在之后有机会进行清理甚至使用 `try` ... ... `except CancelledError` ... `finally` 代码块抑制异常来拒绝请求。不同于 `Future.cancel()`，`Task.cancel()`不保证 Task 会被取消，虽然抑制完全取消并不常见，也很不鼓励这样做。*在 3.9 版更改:* 增加了 `msg` 形参。以下示例演示了协程是如何侦听取消请求的:

  ```python
  async def cancel_me():
      print('cancel_me(): before sleep')
  
      try:
          # Wait for 1 hour
          await asyncio.sleep(3600)
      except asyncio.CancelledError:
          print('cancel_me(): cancel sleep')
          raise
      finally:
          print('cancel_me(): after sleep')
  
  async def main():
      # Create a "cancel_me" Task
      task = asyncio.create_task(cancel_me())
  
      # Wait for 1 second
      await asyncio.sleep(1)
  
      task.cancel()
      try:
          await task
      except asyncio.CancelledError:
          print("main(): cancel_me is cancelled now")
  
  asyncio.run(main())
  
  # Expected output:
  #
  #     cancel_me(): before sleep
  #     cancel_me(): cancel sleep
  #     cancel_me(): after sleep
  #     main(): cancel_me is cancelled now
  ```

- `cancelled`()

  如果 Task 对象 被取消 则返回 True。

  当使用 `cancel() `发出取消请求时 Task 会被 取消，其封包的协程将传播被抛入的 `CancelledError `异常。

- `done`()

  如果 Task 对象 *已完成* 则返回 `True`。

  当 Task 所封包的协程返回一个值、引发一个异常或 Task 本身被取消时，则会被认为 *已完成*。

- `result`()

  返回 Task 的结果。

  如果 Task 对象 已完成，其封包的协程的结果会被返回 (或者当协程引发异常时，该异常会被重新引发)。

  如果 Task 对象 被取消，此方法会引发一个` CancelledError` 异常。

  如果 Task 对象的结果还不可用，此方法会引发一个` InvalidStateError` 异常。

- `exception`()

  返回 Task 对象的异常。

  如果所封包的协程引发了一个异常，该异常将被返回。如果所封包的协程正常返回则该方法将返回 None。

  如果 Task 对象 被取消，此方法会引发一个 `CancelledError `异常。

  如果 Task 对象尚未 完成，此方法将引发一个` InvalidStateError` 异常。

- `add_done_callback`(*callback*, ***, *context=None*)

  添加一个回调，将在 Task 对象 完成 时被运行。

  此方法应该仅在低层级的基于回调的代码中使用。


- `remove_done_callback`(*callback*)

  从回调列表中移除 callback 指定的回调。

  此方法应该仅在低层级的基于回调的代码中使用。

- `get_stack`(***, *limit=None*)

  返回此 Task 对象的栈框架列表。

  如果所封包的协程未完成，这将返回其挂起所在的栈。如果协程已成功完成或被取消，这将返回一个空列表。如果协程被一个异常终止，这将返回回溯框架列表。

  框架总是从按从旧到新排序。

  每个被挂起的协程只返回一个栈框架。

  可选的 limit 参数指定返回框架的数量上限；默认返回所有框架。返回列表的顺序要看是返回一个栈还是一个回溯：栈返回最新的框架，回溯返回最旧的框架。(这与 traceback 模块的行为保持一致。)

- `print_stack`(***, *limit=None*, *file=None*)

  打印此 Task 对象的栈或回溯。

  此方法产生的输出类似于` traceback` 模块通过 `get_stack() `所获取的框架。

  limit 参数会直接传递给` get_stack()`。

  file 参数是输出所写入的 I/O 流；默认情况下输出会写入` sys.stderr`

- `get_coro`()

  返回由 `Task`包装的协程对象。

  *3.8 新版功能.*

- `get_name`()

  返回 Task 的名称。

  如果没有一个 Task 名称被显式地赋值，默认的 asyncio Task 实现会在实例化期间生成一个默认名称。

  *3.8 新版功能.*

- `set_name`(*value*)

  设置 Task 的名称。

  *value* 参数可以为任意对象，它随后会被转换为字符串。

  在默认的 Task 实现中，名称将在任务对象的 [`repr()`](https://docs.python.org/zh-cn/3/library/functions.html#repr) 输出中可见

  。*3.8 新版功能.*

## 基于生成器的协程

> 注解：对基于生成器的协程的支持 **已弃用** 并计划在 Python 3.10 中移除。

基于生成器的协程是 async/await 语法的前身。它们是使用 `yield from` 语句创建的 Python 生成器，可以等待 Future 和其他协程。

基于生成器的协程应该使用 [`@asyncio.coroutine`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.coroutine) 装饰，虽然这并非强制。

- `@asyncio.coroutine`

  用来标记基于生成器的协程的装饰器。此装饰器使得旧式的基于生成器的协程能与 async/await 代码相兼容:

  ```python
  @asyncio.coroutine
  def old_style_coroutine():
      yield from asyncio.sleep(1)
  
  async def main():
      await old_style_coroutine()
  ```

- `asyncio.iscoroutine`(*obj*)

  如果 *obj* 是一个 协程对象则返回 `True`。此方法不同于 `inspect.iscoroutine()`因为它对基于生成器的协程返回 `True`。

- `asyncio.iscoroutinefunction`(*func*)

  如果 *func* 是一个 协程函数则返回 `True`。此方法不同于 `inspect.iscoroutinefunction()`因为它对以 `@coroutine`装饰的基于生成器的协程函数返回 `True`。