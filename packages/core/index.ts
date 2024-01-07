import { createBin } from 'helper/create-bin'
import { useBin } from 'hooks/use-bin'
import { useHeaders } from 'hooks/use-header'
import { LocalDb } from 'utils/json-db'
import { DB_PREFIX } from './constants/name'

const { assignHeader, getHeader } = useHeaders()
const { getBinKey } = useBin()

interface JsonBinDbConfig {
  username: string
  dbName: string
  apikey: string
}

interface AccessConfig {
  username: string
  binKey: string
}

export class JsonBinDb {
  constructor(config: JsonBinDbConfig) {
    const { username, dbName, apikey } = config
    if (!username || !dbName || !apikey) {
      throw new Error('name and apikey are required')
    }
    const access = {
      username,
      binKey: `${DB_PREFIX}${dbName}`
    }
    assignHeader({
      authorization: `token ${apikey}`
    })
    this.access = access

    this.localDb = new LocalDb(this)
  }

  public localDb: LocalDb

  public access: AccessConfig = {
    username: '',
    binKey: ''
  }

  public async initBin() {
    await this.localDb.initBin()
    this.create()
    return
  }

  public getHeaderValue(key: string) {
    return getHeader(key) as string
  }

  public getHeader() {
    return getHeader() as Record<string, any>
  }

  public getBinKey() {
    return getBinKey()
  }

  public create: () => Promise<any> = async () => {
    console.log('this.access -->', this.access)
    return await createBin(this)
  }

  public async getObjectDefault(path?: string, defaultValue?: any) {
    return await this.localDb.getData(path || '.', defaultValue)
  }

  public async getData(path: string, defaultValue?: any) {
    return await this.localDb.getData(path, defaultValue)
  }

  public async getIndex(
    path: string,
    searchValue: string | number,
    propertyName?: string
  ) {
    return await this.localDb.getIndex(path, searchValue, propertyName)
  }

  public async delete(path: string) {
    return await this.localDb.delete(path)
  }

  public async push(path: string, data: any, isSave: boolean = true) {
    console.log('db push', isSave)
    return await this.localDb.push(path, data)
  }
}
