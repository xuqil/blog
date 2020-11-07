# streams 

流是用于处理网络连接的支持 async/await 的高层级原语。 流允许发送和接收数据，而不需要使用回调或低级协议和传输。

## 示例

- ### 使用流的 TCP 回显客户端

  下面是一个使用 asyncio streams 编写的 TCP echo 客户端示例:

  ```python
  import asyncio
  
  async def tcp_echo_client(message):
      reader, writer = await asyncio.open_connection(
          '127.0.0.1', 8888)
  
      print(f'Send: {message!r}')
      writer.write(message.encode())
  
      data = await reader.read(100)
      print(f'Received: {data.decode()!r}')
  
      print('Close the connection')
      writer.close()
  
  asyncio.run(tcp_echo_client('Hello World!'))
  ```
  
  > **参见：**使用低层级 [`loop.create_connection()`](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio.loop.create_connection) 方法的 [TCP 回显客户端协议](https://docs.python.org/zh-cn/3/library/asyncio-protocol.html#asyncio-example-tcp-echo-client-protocol) 示例。


- ### 使用流的 TCP 回显服务器

  TCP 回显服务器使用 `asyncio.start_server()` 函数:

  ```python
  import asyncio
  
  async def handle_echo(reader, writer):
      data = await reader.read(100)
      message = data.decode()
      addr = writer.get_extra_info('peername')
  
      print(f"Received {message!r} from {addr!r}")
  
      print(f"Send: {message!r}")
      writer.write(data)
      await writer.drain()
  
      print("Close the connection")
      writer.close()
  
  async def main():
      server = await asyncio.start_server(
          handle_echo, '127.0.0.1', 8888)
  
      addr = server.sockets[0].getsockname()
      print(f'Serving on {addr}')
  
      async with server:
          await server.serve_forever()
  
  asyncio.run(main())
  ```

  > **参见**：使用 [`loop.create_server()`](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio.loop.create_server) 方法的 [TCP 回显服务器协议](https://docs.python.org/zh-cn/3/library/asyncio-protocol.html#asyncio-example-tcp-echo-server-protocol) 示例。

- ### 获取 HTTP 标头

  查询命令行传入 URL 的 HTTP 标头的简单示例:

  ```python
  import asyncio
  import urllib.parse
  import sys
  
  async def print_http_headers(url):
      url = urllib.parse.urlsplit(url)
      if url.scheme == 'https':
          reader, writer = await asyncio.open_connection(
              url.hostname, 443, ssl=True)
      else:
          reader, writer = await asyncio.open_connection(
              url.hostname, 80)
  
      query = (
          f"HEAD {url.path or '/'} HTTP/1.0\r\n"
          f"Host: {url.hostname}\r\n"
          f"\r\n"
      )
  
      writer.write(query.encode('latin-1'))
      while True:
          line = await reader.readline()
          if not line:
              break
  
          line = line.decode('latin1').rstrip()
          if line:
              print(f'HTTP header> {line}')
  
      # Ignore the body, close the socket
      writer.close()
  
  url = sys.argv[1]
  asyncio.run(print_http_headers(url))
  ```

  用法:

  ```python
  python example.py http://example.com/path/page.html
  ```

  或使用 HTTPS:

  ```python
  python example.py https://example.com/path/page.html
  ```

- ### 注册一个打开的套接字以等待使用流的数据

  使用 `open_connection()` 函数实现等待直到套接字接收到数据的协程:

  ```python
  import socket
  
  async def wait_for_data():
      # Get a reference to the current event loop because
      # we want to access low-level APIs.
      loop = asyncio.get_running_loop()
  
      # Create a pair of connected sockets.
      rsock, wsock = socket.socketpair()
  
      # Register the open socket to wait for data.
      reader, writer = await asyncio.open_connection(sock=rsock)
  
      # Simulate the reception of data from the network
      loop.call_soon(wsock.send, 'abc'.encode())
  
      # Wait for data
      data = await reader.read(100)
  
      # Got data, we are done: close the socket
      print("Received:", data.decode())
      writer.close()
  
      # Close the second socket
      wsock.close()
  
  asyncio.run(wait_for_data())
  ```

  > **参见**：使用低层级协议以及 [`loop.create_connection()`](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio.loop.create_connection) 方法的 [注册一个打开的套接字以等待使用协议的数据](https://docs.python.org/zh-cn/3/library/asyncio-protocol.html#asyncio-example-create-connection) 示例。
  >
  > 使用低层级的 [`loop.add_reader()`](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio.loop.add_reader) 方法来监视文件描述符的 [监视文件描述符以读取事件](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio-example-watch-fd) 示例。

## Stream 函数

下面的高级 asyncio 函数可以用来创建和处理流:

### `asyncio.open_connection`

`coroutine asyncio.open_connection(host=None, port=None, *, loop=None, limit=None, ssl=None, family=0, proto=0, flags=0, sock=None, local_addr=None, server_hostname=None, ssl_handshake_timeout=None)`

- 建立网络连接并返回一对` (reader, writer) `对象。

- 返回的 reader 和 writer 对象是` StreamReader` 和` StreamWriter `类的实例。

- loop 参数是可选的，当从协程中等待该函数时，总是可以自动确定。

- limit 确定返回的 `StreamReader` 实例使用的缓冲区大小限制。默认情况下，limit 设置为 64 KiB 。

- 其余的参数直接传递到` loop.create_connection()` 。

3.7 新版功能: `ssl_handshake_timeout` 形参。

### `asyncio.start_server`

`coroutine asyncio.start_server(client_connected_cb, host=None, port=None, *, loop=None, limit=None, family=socket.AF_UNSPEC, flags=socket.AI_PASSIVE, sock=None, backlog=100, ssl=None, reuse_address=None, reuse_port=None, ssl_handshake_timeout=None, start_serving=True)`

- 启动套接字服务。

- 当一个新的客户端连接被建立时，回调函数 `client_connected_cb` 会被调用。该函数会接收到一对参数 `(reader, writer) `，reader是类 `StreamReader` 的实例，而writer是类 `StreamWriter `的实例。

- `client_connected_cb` 即可以是普通的可调用对象也可以是一个 协程函数; 如果它是一个协程函数，它将自动作为 Task 被调度。

- loop 参数是可选的。当在一个协程中await该方法时，该参数始终可以自动确定。

- limit 确定返回的` StreamReader` 实例使用的缓冲区大小限制。默认情况下，limit 设置为 64 KiB 。

- 余下的参数将会直接传递给` loop.create_server()`.

## Unix 套接字

### `asyncio.open_unix_connection`

`coroutine asyncio.open_unix_connection(path=None, *, loop=None, limit=None, ssl=None, sock=None, server_hostname=None, ssl_handshake_timeout=None)`

- 建立一个 Unix 套接字连接并返回` (reader, writer) `这对返回值。

- 与 `open_connection() `相似，但是是在 Unix 套接字上的操作。
- 套接字family为`AF_UNIX`; 套接字类型为`SOCK_STREAM`。
- 成功返回一个元组。`(transport, prostocol)`
- *path*是Unix域套接字的名称，并且是必需的，除非指定了*sock*参数。摘要Unix套接字， `str`，`bytes`，和`Path`路径的支持。

> 可用性: Unix。

3.7 新版功能: ssl_handshake_timeout 形参。

在 3.7 版更改: path 现在是一个 path-like object

### `asyncio.start_unix_server`

`coroutine asyncio.start_unix_server(client_connected_cb, path=None, *, loop=None, limit=None, sock=None, backlog=100, ssl=None, ssl_handshake_timeout=None, start_serving=True)`

- 启动一个 Unix 套接字服务。

- 与 `start_server() `相似，但是是在 Unix 套接字上的操作。
- 套接字family为`AF_UNIX`; 套接字类型为`SOCK_STREAM`。
- 成功返回一个元组。`(transport, protocol)`
- *path*是Unix域套接字的名称，并且是必需的，除非指定了*sock*参数。摘要Unix套接字， `str`，`bytes`，和`Path`路径的支持。

> 可用性: Unix。

3.7 新版功能: The ssl_handshake_timeout and start_serving parameters.

在 3.7 版更改: path 形参现在可以是 path-like object 对象。

## StreamReader

`class asyncio.StreamReader`

这个类表示一个读取器对象，该对象提供api以便于从IO流中读取数据。

不推荐直接实例化 *StreamReader* 对象，建议使用 open_connection() 和 start_server() 来获取 *StreamReader* 实例。

- `coroutine read(n=-1)`

  至多读取 *n* 个byte。 如果没有设置 *n* , 则自动置为 `-1` ， -1时表示读至 EOF 并返回所有读取的byte。

  如果读到EOF，且内部缓冲区为空，则返回一个空的 `bytes` 对象。

- `coroutine readline()`

  读取一行，其中“行”指的是以 `\n` 结尾的字节序列。

  如果读到EOF而没有找到 `\n` ，该方法返回部分读取的数据。

  如果读到EOF，且内部缓冲区为空，则返回一个空的 `bytes` 对象。

- `coroutine readexactly(n)`

  精确读取 *n* 个 bytes，不会超过也不能少于。

  如果在读取完 *n* 个byte之前读取到EOF，则会引发 `IncompleteReadError` 异常。使用 `IncompleteReadError.partial` 属性来获取到达流结束之前读取的 bytes 字符串。

- `coroutine readuntil(separator=b'\n')`

  从流中读取数据直至遇到 `separator`

  成功后，数据和指定的`separator`将从内部缓冲区中删除(或者说被消费掉)。返回的数据将包括在末尾的指定`separator`。

  如果读取的数据量超过了配置的流限制，将引发` LimitOverrunError `异常，数据将留在内部缓冲区中并可以再次读取。

  如果在找到完整的`separator`之前到达EOF，则会引发` IncompleteReadError` 异常，并重置内部缓冲区。 `IncompleteReadError.partial `属性可能包含指定separator的一部分。

  3.5.2 新版功能.

- `at_eof()`

  如果缓冲区为空并且 `feed_eof()` 被调用，则返回 `True` 。

## StreamWriter

`class asyncio.StreamWriter`

这个类表示一个写入器对象，该对象提供api以便于写数据至IO流中。

不建议直接实例化 `StreamWriter`；而应改用 `open_connection()` 和 `start_server()`。

- `write(data)`

  此方法会尝试立即将 *data* 写入到下层的套接字。 如果写入失败，数据会被排入内部写缓冲队列直到可以被发送。

  此方法应当与 `drain()` 方法一起使用:

  ```python
  stream.write(data)
  await stream.drain()
  ```

- `writelines(data)`

  此方法会立即尝试将一个字节串列表（或任何可迭代对象）写入到下层的套接字。 如果写入失败，数据会被排入内部写缓冲队列直到可以被发送。

  此方法应当与 `drain()` 方法一起使用:

  ```python
  stream.writelines(lines)
  await stream.drain()
  ```

- `close()`

  此方法会关闭流以及下层的套接字。

  此方法应与 `wait_closed()` 方法一起使用:

  ```python
  stream.close()
  await stream.wait_closed()
  ```

- `can_write_eof()`

  如果下层的传输支持 `write_eof()`方法则返回``True``，否则返回 `False`。

- `write_eof()`

  在已缓冲的写入数据被刷新后关闭流的写入端。

- `transport`

  返回下层的` asyncio` 传输。

- `get_extra_info(name, default=None)`

  访问可选的传输信息；详情参见 [`BaseTransport.get_extra_info()`](https://docs.python.org/zh-cn/3/library/asyncio-protocol.html#asyncio.BaseTransport.get_extra_info)。

- `coroutine drain()`

  等待直到可以适当地恢复写入到流。 示例:

  ```python
  writer.write(data)
  await writer.drain()
  ```

  这是一个与下层的 IO 写缓冲区进行交互的流程控制方法。 当缓冲区大小达到最高水位（最大上限）时，`drain() `会阻塞直到缓冲区大小减少至最低水位以便恢复写入。 当没有要等待的数据时，`drain() `会立即返回。

- `is_closing()`

  如果流已被关闭或正在被关闭则返回 `True`。

  *3.7 新版功能.*

- `coroutine wait_closed()`

  等待直到流被关闭。

  应当在 `close()` 之后被调用以便等待直到下层的连接被关闭。

  3.7 新版功能.