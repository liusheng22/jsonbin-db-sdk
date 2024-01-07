# jsonbin-db

### 项目介绍
> 将jsonbin.org作为数据库，提供增删改查的能力

### 接入方式
> 安装埋点SDK
```shell
pnpm i @llius/jsonbin-db
```

> 项目使用
```javascript
import { JsonBinDb } from 'jsonbin-db-sdk'

// https://jsonbin.org 申请的apikey
export const db = new JsonBinDb({
  username: 'liusheng22',
  dbName: 'test1',
  apikey
})

const initDb = async () => {
  await db.initBin()

  // 获取数据
  const data = await db.getObjectDefault('.')

  // 存储数据
  await db.push('.list', [1, 2, 3])
}
initDb()
```

---

### 常用 API
> 参考`node-json-db`项目中的 API 使用
