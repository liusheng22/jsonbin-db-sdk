import { Props } from 'jsonbin-db-shared/types'

import { DB_PREFIX } from 'constants/name'
import request from 'core/utils/try-request'
import { BinData } from 'types/json-bin'
import { JsonBinDb } from '..'

export const getBinList: Props<JsonBinDb, BinData> = async ({
  getHeader,
  access
}) => {
  const { username } = access
  const options = {
    method: 'GET',
    url: `/${username}`,
    headers: getHeader()
  }

  const binJson = await request(options)
  const json = {} as BinData
  Object.keys(binJson).forEach((key) => {
    if (key.startsWith(DB_PREFIX)) {
      json[key] = binJson[key]
    }
  })

  return json
}
