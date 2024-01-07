import { JsonBinDb } from 'jsonbin-db-sdk'
import { apikey } from 'jsonbin-db-shared/constants'

export const db = new JsonBinDb({
  username: 'liusheng22',
  dbName: 'test1',
  apikey
})
