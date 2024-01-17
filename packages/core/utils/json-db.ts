import { updateBin } from 'core/helper/update-bin'
import { readBin } from 'helper/read-bin'
import { Config, JsonDB } from 'node-json-db'
import { unlink } from 'node:fs'
import { JsonBinDb } from '../index'
import { tryCatchAsync } from './try-catch'

const db = new JsonDB(new Config('/tmp/jsonbin-db.json', true, true, '.'))

export type FindCallback = (entry: any, index: number | string) => boolean

export class LocalDb {
  constructor(jsonBinDb: JsonBinDb) {
    this.jsonBinDb = jsonBinDb

    return new Proxy(this, {
      get(target: LocalDb, propKey: string) {
        if (typeof propKey === 'string' && !(propKey in target)) {
          target[propKey] = async function (...args: any[]) {
            await rewriteLocalJson(this.jsonBinDb)
            // @ts-expect-error 动态调用db中的方法
            const data = await tryCatchAsync(() => db[propKey].apply(db, args))
            return data
          }
        }
        return target[propKey]
      }
    })
  }

  public jsonBinDb: JsonBinDb

  public async initBin() {
    unlink('json-bin-db.json', () => {
      console.log('unlink json-bin-db.json')
    })
    return
  }

  public async getData(path: string, defaultValue?: any) {
    await rewriteLocalJson(this.jsonBinDb)
    const data = await tryCatchAsync(
      () => db.getObjectDefault(path),
      defaultValue
    )
    return data || defaultValue
  }

  public async getIndex(
    path: string,
    searchValue: string | number,
    propertyName?: string
  ) {
    await rewriteLocalJson(this.jsonBinDb)
    const data = await tryCatchAsync(() =>
      db.getIndex(path, searchValue, propertyName)
    )
    return data
  }

  public async delete(path: string) {
    await rewriteLocalJson(this.jsonBinDb)
    await tryCatchAsync(() => db.delete(path))
    const allJson = await db.getObjectDefault('.')
    // 写入到远端
    await updateBin(this.jsonBinDb, allJson)
    return allJson
  }

  public async push(path: string, data: any, isSave = true) {
    await rewriteLocalJson(this.jsonBinDb)
    await tryCatchAsync(() => db.push(path, data, isSave))
    const allJson = await db.getObjectDefault('.')
    // 写入到远端
    await updateBin(this.jsonBinDb, allJson)
    return allJson
  }

  public async find<T>(
    rootPath: string,
    callback: FindCallback
  ): Promise<T | unknown> {
    await rewriteLocalJson(this.jsonBinDb)
    const data = await tryCatchAsync(() => db.find(rootPath, callback))
    return data
  }

  [key: string]: any
}

const rewriteLocalJson = async (jsonBinDb: JsonBinDb) => {
  // 获取远端json数据（所有）
  const json = await readBin(jsonBinDb)
  // 先临时写入到本地
  await tryCatchAsync(() => db.push('.', json, true))
  return json
}
