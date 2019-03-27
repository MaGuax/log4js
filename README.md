###### app.js 
    在项目中使用 log4js 

###### logger.js
> log4js 的配置
- 主要说明两个参数，appenders 和 categories
- 参数说明：
appenders 日志输出的配置
appenders 是一个字典形式的参数，其中的每一个 key 作为日志的一种输出方式，每一种方式对应更具体的设置
例子：
```javascript
var appenders = {
    out: {
        type: 'console'
    }，
    file: {
        type: 'dateFile'
        filename: './logs,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: true
    }
}
```
上面写了两个具体的例子，每一种输出方式的设置中，必须包含 type 属性
参数说明
type：日志输出方式 
console 输出到终端
dateFile 以追加的方式，将日志输出到文件中
filename： 如果是将日志输出到文件，需要写上日志输出文件的相对路径
pattern：定义日志输出文件名，会和 filename 参数结合起来作为文件名
        
categories 日志输出的级别和方式
categories 是一个字典形式的参数，是给 logger 实例用的配置，
其中的每一个 key 作为 logger 实例的一个类别，也就是 logger 的 category 参数，
category对应的设置为 logger 实例的级别和输出方式，如果在 categories 中能找到对应的配置，
则用对应配置的输出级别和配置，如果没有则用默认的 category 配置，也就是 default
例子（和上面的例子是关联的）：
```javascript
categories: {
    default: {
        appenders: ['out'],
        level: 'info'
    },
    test_log: {
        appenders: ['out', 'trace'],
        level: 'info'
    },
    test_error: {
        appenders: ['out', 'error'],
        level: 'error'
    }
}
```

上面的例子中，default 类别会作为当 logger 实例找不到它的 category 配置时，默认使用的配置。其他的类别名称由用户自定义
参数说明
appenders：每个 category 下的 logger 的输出设置是根据它所拥有的 appenders 来决定的，拥有几个 appenders 就会实现几种输出
level：定义 logger 的输出级别

connectLogger 函数
用于中间件函数，会根据参数在每次访问时输出日志，
它接受两个参数，参数一是一个 logger 实例，参数二是输出日志的内容配置
这里需要注意一点，虽然在创建 logger 实例时已经通过 logger 的 category 参数指定了 logger 的输出和级别，但是在 connectLogger 里，可以再设置 logger 实例的级别，并且优先考虑这里的级别配置，默认级别使用 info
