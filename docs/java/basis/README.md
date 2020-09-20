# Java基础知识

> 源于《疯狂Java讲义 第5版》



**略过的知识**

所有的练习

3.1.2 文档注释

3.7.3 位运算符

4.6.6 数组应用举例

## 第二章 理解面向对象

略...

Java完全支持面向对象的三种基本特征：继承、封装和多态

结构化程序设计里最小的程序单元是函数（相当于方法），面向对象的程序单位是类（Java就是）

程序的三种基本结构：

- 顺序结构
- 选择结构
- 循环结构

消息：对象间的这种相互合作需要一个机制协助进行，这样的机制称为“消息”。消息是一个实例与另一个实例之间相互通信的机制。

提示：==Java不支持多继承==

在Java语言中，除8个基本数据类型值之外，一切都是对象

对象的抽象化是类，类的具体化就是对象，也可以说类的实例是对象。



## 第三章 数据类型和运算符

Java是一门强类型语言。

强类型包含两方面的含义：

- 所有的变量必须先声明、后使用
- 指定类型的变量只能接受类型与之匹配的值

### **标识符**

Java的标识符必须以字母、下划线（_）、美元符（$）开通，后面可以跟中文

==从Java9开始，不允许使用单独的下划线（_）作为标识符==

### **关键字**

Java的所有关键字都是小写的，TRUE、FALSE和NULL都不是Java关键字

==从Java10开始引入的var并不是关键字==

### **数据类型**

支持的类型分为两类：基本类型和引用类型

基础类型包含boolean类型和数值类型

引用类型包含类、接口和数组类型，还有一种特殊的null类型

空类型（null type）就是null值的类型。==空引用（null）可以转换为任何引用类型，不能转换为基本类型==

### 基本数据类型

基本数据类型：

- boolean类型

- 数值类型
  - 整数类型
    - 1字节：byte
    - 2字节：short
    - 4字节：int
    - 8字节：long
  - 字符类型
    - 2字符：char
  - 浮点类型
    - 4字节：float
    - 8字节double

字符型值必须使用单引号（''）括起来

Java使用16位的Unicode字符集作为编码方式

==char类型的值也可以直接作为整型值来使用相当于一个16位的无符号整数，表数范围是0~65535==

String类表示字符串

==注意：char类型使用单引号括起来，而字符串使用双引号括起来==

只有浮点类型的数值才可以使用科学计数法形式表示

==Java的浮点类型默认是double类型==

三个特殊的浮点数值：

- 正无穷大（POSITIVE_INFINITY）
- 负无穷大（NEGATIVE_INFINITY）
- 非数（NaN）

无穷大是相等的，而非数是不相等的

只有浮点数除以0才可以得到正负无穷大，整数值会报错

无论是整数数值还是浮点数数值可以使用下划线（_）分隔，如`double pi = 3.14_15_92_65_36;`

**var类型**

var相当于一个动态类型，使用var定义的局部变量的类型由编译器自动推断——定义变量时分配了什么类型的初始值，那该变量就是什么类型。

==使用var时必须在定义局部变量的同时指定初始值==

### 类型转换

类型转换方式分为：

- 自动转换
  - 当把一个表数范围小的数值或变量直接赋给另一个表数范围大的变量时，系统将可以进行自动类型转换

- 强制转换
  - 语法格式：`(targetType)value`

表达式类型的自动提升：当一个算术表达式中包含多个基本类型的值时，整个算术表达式的数据类型将发生自动提升（向上提升）。

### 直接量

能指定直接量（定义时给定初始值）的通常只有三种类型

- 基本类型
- 字符串
- null类型

字符串直接量需要注意的是：==当程序第一次使用某个字符串直接量时，Java会使用常量池（constant pool）来缓存该字符串，后面用到该字符串时会直接从常量池取==

### 运算法

- 算术运算符
- 赋值运算符
- 比较运算符
- 逻辑运算符
- 位运算符
- 类型相关运算符

#### 比较运算符

> 提示：基本类型的变量、值不能和引用类型的变量、值使用`==`进行比较；boolean类型的变量、值不能与其他任意类型的变量、值使用`==`比较；如果两个引用类型之间没有父子继承关系，那么它们的变量也不能使用`==`进行比较。

`==`和`!=`：如果进行比较的两个操作数都是数值类型，即使它们的数据类型不相同，都可以比较，如`97 == 'a'`，`97 ！= ’a'`。如果两个操作数都是引用类型，那么只有当两个引用变量的类型具有父子关系时才可以比较，两个引用指向同一个对象时使用`==`比较返回true。

#### 逻辑运算符

主要有6个：

- &&：与
- &：不短路与
- ||：或
- |：不短路或
- !：非
- ^：异或

#### 运算符的结合性和优先级

所有的数学运算符都认为是从左向右运算的，Java的大部分运算符也是从左向右结合的，只有单目运算符、赋值运算符和三目运算符是从右向左结合的，也就是从右向左运算



## 第四章 流程控制与数组

两种基本的流程控制结构：分支结构和循环结构

Java的流程结构：

- 分支结构
  - if
  - switch
- 循环结构
  - while
  - do while
  - for
  - foreach

break和continue控制循环结构

### 分支结构

#### switch语句

> switch语句后面的控制表达式的数据类型只能是byte、short、char、int四种整数类型，枚举类型和java.lang.String类型，不能是boolean类型

```java
switch (expression)
{
    case condition1:
        {
            statement(s)
            break;
        }
    case condition2:
        {
            statement(s)
                break;
        }
    case condition3:
        {
            statement(s)
                break;
        }
    default: //都不符合上面的条件时
        {
            statement(s)
        }
}
```

### 控制循环结构

> Java不支持goto语句

**break**

break语句不仅可以结束其所在的循环，还可以直接结束其外层循环。此时需要在break后紧跟一个标签，这个标签用于表示一个外层循环。

**continue**

continue跟break一样，也支持对外层操作，也可以支持标签

```java
public class HelloWorld {
    public static void main(String[] args) {
        //外层循环，outer作为标识符
        outer:
        for (var i = 0; i < 5; i++) {
            //内层循环
            for (var j = 0; j < 3; j++) {
                System.out.println(i + j);
                if (j == 1) {
                    //跳出outer标签所标识的循环
                    break outer;
                    //忽略outer标签所指定的循环体中本次循环所剩下的语句
                    //continue outer;
                }
            }
        }
    }
}

```



提示：`return`也可以结束一个循环，但与`break`和`continue`不同的是，`return`直接结束整个方法



### 数组类型

数组也是一种类型，它本身是一种引用类型

> 数组的长度不可改变
>
> 数组元素的类型是唯一的，即一个数组里只能存储一种数据类型的数据

#### 数组的定义

Java支持这两种定义数组的方式：

```java
type[] arrayName;
type arrayName[];
```

==定义数组时不能指定数组的长度==

#### 数组的初始化

==Java的数组必须先初始化才能使用==

数组的初始化有两种方式：

- 静态初始化：初始化时由程序员显示指定每个数组元素的初始值，由系统决定数组长度
  - 法一：`arrayName = new type[] {element1, element2, element3...};`
    - `type`跟定义时的类型一样，如果是引用类型可以是其子类的实例
  - 法二：定义和初始化一起完成：`type[] arrayName = {element1, element2, element3...};`
- 动态初始化：初始化时由程序员只指定数组长度，由系统为数组元素分配初始值
  - 法一：`arrayName = new type[length];`
  - 法二：定义和初始化一起完成：`type[] arrayName = new type[length];`

#### foreach循环

foreach循环遍历数组和集合更加简洁，且无须获得数组和集合长度，无须根据索引来访问数组元素和集合元素（无须循环条件，无须循环迭代语句）

==使用foreach循环迭代数组元素时，并不能改变数组元素的值，因此不要对foreach的循环变量进行赋值==

```java
public class HelloWorld {
    public static void main(String[] args) {
        String[] books = {"轻量级Java EE企业应用实战", "疯狂java讲义", "疯狂超人"};
        //使用foreach循环来遍历数组元素
        //其中book将会自动迭代每个数组元素
        //String book可以使用var book代替，这样更加简洁
        for (String book : books)
        {
            System.out.println(book);
        }
    }
}

```



### 深入数组

数组是一种引用类型，数组引用变量只是一个引用，数组元素和数组变量在内存里是分开存放的；定义和初始化一个数组后，在内存中分配了两个空间，一个用于存放数组的引用变量（栈内存），另一个用于存放数组本身（堆内存）。

#### 多维数组

Java支持二维数组，从数组底层的运行机制来看，多维数组实际上是一维数组

二维数组的定义：

```java
type[][] arrName;
```

初始化：

```java
arrName = new type[length][];
```

定义和初始化一起完成：

```java
type[][] arrName = new type[length][];
```

#### 操作数组的工具类：Arrays

见书本P103



### 练习

- 九九乘法表

```java
public class HelloWorld {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        for (int i : arr1) {
            for (int j : arr1) {
                if (j < i) {
                    System.out.print(String.valueOf(j) + 'x' + i + '=' + i * j + ',');
                }
                if (j == i) {
                    System.out.println(String.valueOf(j) + 'x' + i + '=' + i * j);
                }
            }
        }
    }
}
```



- 等腰三角形

```java
public class HelloWorld {
    public static void main(String[] args) {
        int num = 4;
        int n = num * 2 - 1;
        int a;
        for (int i = 1; i <= num; i++) {
            a = (n - (i * 2 - 1)) / 2; //左右显示空字符的数量
            for (int j = 1; j <= n; j++) {
                if (j <= a || j >= a + (i * 2 - 1) + 1) {
                    System.out.print(' ');
                } else {
                    System.out.print('*');
                }
            }
            System.out.println(' ');
        }
    }
}

```



## 第五章 面向对象上

类可以被认为是一种自定义的数据类型，==可以使用类来定义变量==，所有使用类定义的变量都是引用变量，他们将会引用到类的对象。Java使用类的构造器来创建该类的对象。

面向对象：

- 封装
  - private
  - protected
  - public
- 继承
  - 继承
    - 多态性
    - 灵活性
  - 组合
    - 不惧多态和灵活性
- 多态

### 类和对象

#### 定义类

定义类：

```java
[修饰符] class 类名
{
    零个到多个构造器定义...
    零个到多个成员变量...
    零个到多个方法...
}
```

修饰符可以是：public、final、abstract，或者完全省略这三个修饰符

类定义中三种最常见的成员（都可以定义零个或多个）：

- **构造器**

  - 构造器用于构造该类的实例，Java语言用过new关键字来调用构造器，从而返回该类的实例

  - 如果没有定义构造器，系统会为该类提供一个默认的构造器，==系统提供的构造器没有参数==

  - ==构造器是一个特殊的方法，没有返回值，不能使用void声明==

  - 定义

    - ```java
      [修饰符] 构造器名(形参列表)
      {
          //执行体
      }
      ```

  - 修饰符(==可以省略；下面三种之一==)

    - public
    - protected
    - private

  - 构造器名

    - 构造器名必须和类名相同

- **成员变量**

  - 定义

    - ```
      [修饰符] 类型 成员变量明 [= 默认值]；
      ```

  - 修饰符（==可以省略；public、protected、private三个最多只能出现其中之一，可以与static、final组合使用==）

    - public
    - protected
    - private
    - static
    - final

  - 类型

    - Java允许的任何数据类型

- **方法**

  - 定义

    - ```java
      [修饰符] 方法返回值类型 方法名(形参列表)
      {
          //方法体
      }
      ```

  - 修饰符（==可以省略；public、protected、private三个最多只能出现其中之一，可以与static、final组合使用；abstract和final最多只能出现其中之一==）

    - public
    - protected
    - private
    - static
      - static修饰的成员表明它属于这个类本身，而不属于该类的单个实例，通常把static修饰的成员变量和方法称为类变量、类方法，而非static修饰的成员变量则称为实例变量、实例方法
    - final
    - abstract

提示：==static修饰的成员不能访问没有static修饰的成员==

#### 对象的产生和使用

创建对象的根本途径是构造器，通过new关键字来调用类的构造器创建该类的实例。如：

```java 
Person p;
p = new Person();
#或者
Person p = new Person();
```

如果访问权限允许，类里定义的方法和成员变量都可以通过类或实例调用：

- 类.类变量|方法
- 实例变量|方法

提示：==static修饰的方法和成员变量，既可通过类调用，也可通过实例调用；非static修饰的方法和成员变量，只能通过实例调用==

#### 对象的this引用

this关键字总是指向调用该方法的对象。根据this出现位置的不同，this作为对象的默认引用有两种情形：

- 构造器中引用该构造器正在初始化的对象
  - this在构造器中代表该构造器正在初始化的对象
- 在方法中引用调用该方法的对象
  - this代表该类的对象

this关键字最大的作用就是让类中一个方法，访问该类里的另一个方法或实例变量

Java允许对象的一个成员直接调用另一个成员，可以省略this前缀

注意：==static修饰的方法不能使用this引用，static修饰的方法不能访问不使用static修饰的普通成员==

大部分时候，普通方法访问其他方法、成员变量时无须使用this前缀，但如果**方法里有局部变量和成员变量同名**，但程序又需要在该方法里访问这个被覆盖的成员变量，则**必须使用this前缀**

```java
public class HelloWorld {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.run();
    }
}

class Dog {
    public void jump() {
        System.out.println("jump方法");
    }

    public void run() {
//        Dog d = new Dog();
//        d.jump();
//        this.jump(); //使用this关键字，减少一个对象，同时依赖的是自己的jump()方法
        jump();//省略this
        System.out.println("run方法");
    }
}
```



当this作为对象的默认引用使用时，程序可以像访问普通引用变量一样来访问这个this引用，甚至可以把this当成普通方法的返回值：

```java
public class HelloWorld {
    public int age;

    public HelloWorld grow() {
        age++;
        //return this返回调用该方法的对象
        return this;
    }

    public static void main(String[] args) {
        HelloWorld rt = new HelloWorld();
        //可以连续调用同一个方法          
        rt.grow().grow().grow();
        System.out.println(rt.age);
    }
}
```



### 方法

#### 属性

- 方法不能独立定义，方法只能在类体里定义
- 从逻辑意义上来看，方法要么属于该类本身，要么属于该类的一个对象
- 永远不能独立执行方法，执行方法必须使用类（static修饰的方法）或对象(通过this）作为调用者

#### 参数传递机制

Java里方法的参数(包括引用类型参数）传递方式只有一种：值传递

#### 形参个数可变的方法

形参个数可变的方法：在最后一个形参的类型后增加三点(...)，则表明该形参可以接受多个形参数值，多个形参数值化被当成数组传入。

```
public class ClassName{
	public static void test(int a, String... books){
		for (var tmp : books) {
			System.out.println(tmp);
		}
	}
	public static void main(String[] args) {
        test(5, "你好", "世界");
    }
}
```

特性：

- 个数可变的形参只能处于形参列表的最后
- 一个方法最多只能包含一个个数可变的形参
- 个数可变的形参本质就是一个数组类型的形参，因此调用包含个数可变形参的方法时，该形参可以传入多个参数，也可以传入一个数组

#### 方法重载

如果同一个类中包含了两个或两个以上方法的方法名相同，但形参列表不同，则被称为方法重载

要求：

- 同一个类中方法名相同，参数列表不同
- 方法的其他部分，如方法返回值类型、修饰等，与方法重载没有任何关系

#### 成员变量与局部变量

所有变量：

- 成员变量
  - 实例变量（不以static修饰）
  - 类变量（以static修饰，作用域比实例变量更大）
- 局部变量
  - 形参（方法签名中定义的变量）
  - 方法局部变量（在方法内定义）
  - 代码块局部变量（在代码块内定义）

提示：==与成员变量不同的是，局部变量除形参之外，都必须显示初始化，否则不能访问。局部变量不属于任何类或实例。==


### 隐藏和封装

#### 控制符

Java提供了三个控制符：private、protected和public，分别代表三个访问控制级别，另外还有个不加任何访问控制符的访问控制级别（default），提供了4个访问控制级别

- private（当前类权限）
  - 被修饰的成员只能在当前类的内部被访问，用于修饰成员变量最合适
- default（包访问权限）
  - default访问控制的成员或外部类可以被想用包下的其他类访问
- protected（子类访问权限）
  - 被修饰的成员既可以被同一个包中的其他类访问，也可以被不同包中的子类访问。如果修饰方法，通常是希望其子类来重写这个方法。
- public（公共访问权限）
  - 最宽松的访问控制级别

|            | private | default | protected | public |
| ---------- | ------- | ------- | --------- | ------ |
| 同一个类中 | 是      | 是      | 是        | 是     |
| 同一个包中 |         | 是      | 是        | 是     |
| 子类中     |         |         | 是        | 是     |
| 全局范围内 |         |         |           | 是     |

提示：==外部类只能有两种访问控制级别：public和默认，外部类不能使用private和protected修饰==

#### package、import和import static

**package**

- 指该源文件定义的所有类都属于该包packageName

- package语句放在Java源程序的第一个非注释行
- 一个源文件只能指定一个包

```java
package packageName;
```

- 如果父包中的类需要使用子包中的类，必须使用子包的全名，而不能省略父包部分

**import**

- import语句位于package语句之后、类定义之前
- import使用`*`导入某个父包的全部类时，不会导入该父包的子包内的类
- Java默认导入`java.lang`包下的所有类

**import static**

- 用于导入指定类的某个静态成员变量、方法或全部的静态成员变量、方法
- 可以减少程序中代码编写量

#### Java的常用包

- java.lang：Java语言核心类，如String、Math、System和Thread类等，无须手动导入，系统自动导入
- java.util：Java的大量工具类/接口和集合框架类/接口，如Arrays、List和Set等
- java.net：Java网络编程相关的类/接口
- java.io：Java输入/输出编程相关的类/接口
- java.text：Java格式化相关的类
- java.sql：Java进行JDBC数据库编程的相关类/接口
- java.awt：抽象窗口工具集的相关类/接口
- java.swing：Swing图形用户界面编程的相关类/接口

### 构造器

构造器是一个特殊的方法，用于创建实例时执行初始化。

#### 使用构造器执行初始化

当创建对象时，这个对象实例变量默认初始化会把所有基本类型的实例变量设为0（对数值类型实例变量）或false（对布尔型实例变量），把所有引用类型的实例变量设为null

java类至少包含一个构造器，如果没有编写构造器，系统默认使用没有参数

#### 构造器重载

同一个类里具有多个构造器，多个构造器的形参列表不同，被称为构造器重载

为了在构造器B中调用构造器A中的初始化代码（构造器B是构造器A的重载），又不会重新创建一个Java对象，可以使用**this关键字**来调用相应的构造器。如：

```java
public class Apple {
    public String name;
    public String color;
    public double weight;

    public Apple() {
    }

    public Apple(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public Apple(String name, String color, double weight) {
        //通过this调用另一个重载的构造器的初始化代码
        this(name, color);
        this.weight = weight;
    }
}

```

==提示：this调用重载构造器必须出现在构造器执行的第一行==

### 类的继承

#### 继承的特点

- Java的继承用过extends关键字实现，实现继承的类被称为子类，被继承的类被称为父类，有的也称其为基类、超类

- 父类包含的范围总比子类包含的范围大

- ==子类只能从被继承的父类获得成员变量、方法和内部类（包括内部接口、枚举），不能获得构造器和初始化块==
- 每个类最多只有一个**直接父类**
- 未指定直接父类时，默认继承`java.lang.Object`类。`java.lang.Object`类是所有类的父类，要么是直接父类，要么是简接父类

#### 重写父类的方法

子类包含于父类同名方法的现象被称为方法重写（override），也被称为方法覆盖

方法重写遵循“两同两小一大”规则：

- “两同”：方法名相同、形参列表相同
- “两小”：子类方法返回值类型应比父类返回值类型更小或相等；子类方法声明抛出的异常类应比父类方法声明抛出的异常类更小或相等
- “一大”：子类方法的访问权限应比父类方法的访问权限更大或相等

重写的方法和被重写的方法要么是类方法，要么是实例方法

**方法重载和重写的区别**

- 重载主要发生在同一个类的多个同名方法之间

- 重写发生在子类和父类的同名方法之间

#### super限定

如果需要在子类方法中调用父类中被重写的方法，可以使用super作为调用者调用：`super.被重写的实例或类方法()`

super用于限定该对象调用它从父类继承得到的**实例变量或方法**

提示：==super不能出现在static修饰的方法中==

查询变量的顺序：

1、该方法

2、当前类

3、直接父类

4、简接父类

5、直到`java.lang.Object`类，没有则报错

**如果被重写的是类变量，在子类的方法中可以通过父类名作为调用者访问该变量**

```java
class BaseClass {
    public int a = 5;
}

public class SubClass extends BaseClass {
    public int a = 7;

    public void accessOwner() {
        System.out.println(a);
    }

    public void accessBase() {
        //通过super来限定访问父类继承得到的a实例变量
        System.out.println(super.a);
    }

    public static void main(String[] args) {
        SubClass sc = new SubClass();
        sc.accessBase();
        sc.accessOwner();
    }
}

```



#### super调用父类构造器

子类不会获得父类的构造器，但**子类构造器里**可以调用父类构造器的初始化代码，类似一个构造器里调用被重载的构造器

父类构造器总会在子类构造器之前执行

==使用super调用父类构造器也必须出现在子类构造器执行体的第一行，所以this调用和super调用不会同时出现==

### 多态

Java引用变量有两个类型：一个是编译时类型，一个是运行时类型。编译时类型由声明该变量时使用的类型决定，运行时类型由实际赋给该变量的对象决定。如果编译时类和运行时类型不一致，就可能出现多态（Ploymorphism）

#### 多态性

```java
class BaseClass {
    public int book = 6;
    public void base() {
        System.out.println("父类的普通方法");
    }
    public void test() {
        System.out.println("父类的被重写的方法");
    }
}

public class SubClass extends BaseClass {
    //重写定义book实例变量隐藏父类的book变量
    public String book = "Python图书";
    //重写父类test方法
    public void test() {
        System.out.println("子类重写父类的方法");
    }
    public void sub() {
        System.out.println("子类的普通方法");
    }

    public static void main(String[] args) {
        //编译时类型和运行时类型完全一样，因此不存在多态
        BaseClass bc = new BaseClass();
        //输出6
        System.out.println(bc.book);
        //下面两次的调用，执行BaseClass的方法
        bc.base();
        bc.test();

        //编译时类型和运行时类型完全一样，因此不存在多态
        SubClass sc = new SubClass();
        //输出"Python图书"
        System.out.println(sc.book);
        //调用和执行从父类父类继承到的base方法
        sc.base();
        //下面两次调用和执行执行当前类SubClass的方法
        sc.test();
        sc.sub();

        //编译时类型和运行时类型不一样，多态发生
        BaseClass ploymophicBC = new SubClass();
        //实例变量不具备多态，输出6——表明访问的是父类对象的实例变量
        System.out.println(ploymophicBC.book);
        //调用和执行从父类父类继承到的base方法
        ploymophicBC.base();
        //下面两次调用和执行执行当前类SubClass的方法
        ploymophicBC.test();
        //因为ploymophicBC编译时类型是BaseClass，BaseClass类没有提供sub()方法，所以下面代码编译时会出错
        //ploymophicBC.sub();
    }
}

```

相同类型的变量、调用同一个方法时呈现多种不同的行为特征，这就是多态

**引用变量在编译阶段只能调用编译时类型所具有的方法，但运行时则执行它运行时类型所具有的方法。因此，编写Java代码时，引用变量只能调用声明该变量时所用类里包的方法。如通过Object p = new Person()代码定义一个变量p，则这个p只能调用Object类的方法，而不能调用Person类里定义的方法。**

提示：==与方法不同的是，对象的实例变量不具备多态性==

#### 引用变量的强制类型转换

如果需要让**编译时类型与运行时类型不同的引用变量**调用它运行时类型的方法，则必须把它强制类型转换成运行时类型，强制类型转换需要借助于类型转换运算符

类型转换运算符的用法：(type) variable

通常在进行类型强制转换之前要使用instanceof运算符来判断是否可以成功转换

```java
if (objPri instanceof String)
{
    var str = (String)bojPri;
}
```

#### instanceof运算符

instanceof运算符的前一个操作数通常是一个引用类型变量，后一个操作数通常是一个类（也可以是接口），判断前面的对象是否是后面的类，或者其子类、实现类的实例。是返回true，否则返回false

### 继承和组合

#### 使用继承的注意点

继承的缺点：继承严重地破坏了父类的封装性。子类可以直接访问父类的成员变量（内部信息）和方法，从而造成子类和父类的严重耦合

为了保证父类的内部数据，不会被子类随意改变，设计父类通常应该遵循如下规则：

- 尽量隐藏父类的内部数据。
  - 尽量把父类的所有成员都设置成private访问类型，不要让子类直接访问
- 不要让子类可以随意访问、修改父类的方法
  - 父类中那些仅为辅助其他的工具方法，应该使用private访问控制符修饰，让子类无法访问
  - 如果父类的方法需要被外部类调用，则必须以public修饰，但又不希望子类重写该方法，可以使用final修饰符来修饰该方法
  - 如果希望父类的方法被子类重写，但不希望被其他类自由访问，则可以使用protected来修饰该方法
- 尽量不要在父类构造器中调用将要被子类重写的方法（该方法会变成子类中重写的方法）

提示：如果想把某些类设置成最终类，即不能当成父类，可以使用final修饰这个类。此外，使用private修饰这个类的所有构造器，可以保证子类无法调用该类的构造器，也就无法继承该类

#### 组合

对于继承而言，子类可以直接获得父类的public方法，程序使用子类时，将可以直接访问该子类从父类继承的方法；而组合则是**把==旧类对象==作为新类的成员变量**组合起来，用以实现新类的功能，用户看到的是新类的方法，而不能看到被组合对象的方法。

**继承和组合的区别：**

继承：

```java
class Animal {
    private void beat() {
        System.out.println("心跳");
    }

    public void breathe() {
        beat();
        System.out.println("呼吸");
    }
}

//继承Animal，直接复用父类的breathe方法
class Bird extends Animal {
    public void fly() {
        System.out.println("飞翔");
    }
}

public class InheritTest {
    public static void main(String[] args) {
        Bird b = new Bird();
        b.breathe();
        b.fly();
    }
}

```

组合：

```java
class Animal {
    private void beat() {
        System.out.println("心跳");
    }

    public void breathe() {
        beat();
        System.out.println("呼吸");
    }
}

class Bird {
    //将原来的父类组合到原来的子类，作为子类的一个组合成分
    private Animal a;

    public Bird(Animal a) {
        this.a = a;
    }

    //重新定义一个自己的breathe方法
    public void breathe() {
        a.breathe();
    }

    public void fly() {
        System.out.println("飞翔");
    }
}

public class CompositeTest {
    public static void main(String[] args) {
        //需要显式创建被组合的对象
        Animal a = new Animal();
        Bird b = new Bird(a);
        b.breathe();
        b.fly();
    }
}

```

### 初始化块

一个类里可以有多个初始化块，相同的初始化块之间有顺序，先定义先执行。语法格式如下：

```java
[修饰符] {
    //初始化块的可执行语句
}
```

初始化块的修饰符只能是static，使用static修饰的初始化块被称为类初始化块（静态初始化块），没有static修饰的初始化块被称为实例初始化块

**初始化块没有名字，有没有标识，不能通过类、对象来调用；初始化块只在创建Java对象时隐式执行，在构造器之前自动执行**

```java
public class InstanceInitTest {
    //先执行实例初始化块，将a赋值为6
    {
        a = 6;
    }
    //再执行将a赋值为9
    int a = 9;
    ...
}
```

提示：两者顺序调换的话a==6

#### 实例初始化块和构造器

实例初始化块是构造器的补充

如果有一段初始化处理代码对所对象完全相同，且无须接受任何参数，可以从构造器中提取出，并归类在实例初始化块里

#### 类初始化块

类初始化块总是比实例初始化块先执行，类初始化块中不能有实例变量

#### 执行顺序

假设有三个类，C类继承B类，B类继承A类

```java 
class A {
    static {
        //类初始化块
    }
    {
        //实例初始化块
    }
    public A{
        //构造器
    }
    ...
}
class B extends A {
    static {
        //类初始化块
    }
    {
        //实例初始化块
    }
    public B{
        //构造器
    }
    ...
}
class C extends B {
    static {
        //类初始化块
    }
    {
        //实例初始化块
    }
    public C{
        //构造器
    }
    ...
}
```

初始化块和构造器的执行顺序：

- 最先执行的是类初始化块
  - 依次执行A类、B类、C类的类初始化块
- 然后依次执行A类的实例初始化块和构造器、B类的实例初始化块和构造器、C类的实例初始化块和构造器

## 第六章 面向对象下




