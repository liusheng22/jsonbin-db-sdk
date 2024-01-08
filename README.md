# jsonbin-db

### 项目介绍
> 写这个项目的原因在于，在将自己 nextjs 服务部署到 vercel 时，有一定的限制
> 1. 不能使用本地文件系统（Serverless不允许操作本地文件系统）
> 2. 不能使用数据库（数据库的费用昂贵）
> 3. 不能使用本地缓存（每次部署后本地数据都会重置）

> 于是有了这个项目，将 json 数据作为持久化 db 使用，可以对 json 进行增删读写作为远端db使用，提供增删改查的能力
> 1. 所以寻找了一些免费的json存储服务，最终选择了[jsonbin.org](https://jsonbin.org)
> 2. 能够有免费的存储空间，且提供了api接口，可以对json进行增删改查


### 接入方式
> 安装埋点SDK
```shell
pnpm i @llius/jsonbin-db
```

> 项目使用
```javascript
import { JsonBinDb } from '@llius/jsonbin-db'

// https://jsonbin.org 申请的apikey
const db = new JsonBinDb({
  username: 'YOUR_NAME',
  dbName: 'CUSTOM_FILE_NAME',
  apikey: ''
})

const initDb = async () => {
  await db.initBin()

  // 获取所有数据
  await db.getObjectDefault('.')

  // 存储数据
  await db.push('.list', [
    { id: 0, name: 'test1' },
    { id: 1, name: 'test2' },
    { id: 2, name: 'test3'},
    { id: 3, name: 'test4'}
  ])

  // 获取某个字段的值，如果没获取到，则设置默认值为{}
  await db.getObjectDefault('.list[0].name', {})

  // 获取某个 id 的下标
  await db.getIndex(`.list`, 0) // output -> 0
  // 获取某个字段的index
  await db.getIndex(`.list`, 'test2', 'name') // output -> 1

  // 删除某个字段
  await db.delete('.list')
  // 删除某个字段的某个值
  await db.delete('.list[0].name')
  // 删除所有
  await db.delete('.')
}
initDb()
```

#### 初始化字段说明
| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| username | jsonbin.org 用户名 | string | - |
| dbName | 自定义存储的文件名 | string | - |
| apikey | jsonbin.org apikey | string | - |

---

### 常用 API
> 可参考 [node-json-db](https://www.npmjs.com/package/node-json-db) 项目中的 API 使用

| API | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| initBin | 初始化 bin | - | - |
| getData | 获取数据 | path: string | any |
| getObjectDefault | 获取数据，如果获取不到，则设置默认值 | path: string, defaultValue: any | any |
| count | 获取数据长度 | path: string | number |
| getIndex | 获取某个字段的下标 | path: string, value: any, field?: string | number |
| push | 存储数据 | path: string, data: any | - |
| delete | 删除数据 | path: string | - |
