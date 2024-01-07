import { JsonBinDb } from 'core/index'
import request from 'core/utils/try-request'
import { Props } from 'jsonbin-db-shared/types'
import { BinData } from 'types/json-bin'

export const readBin: Props<JsonBinDb, BinData> = async ({
  access,
  getHeader
}) => {
  const { username, binKey } = access
  const headers = getHeader()
  const options = {
    method: 'GET',
    url: `/${username}/${binKey}`,
    headers
  }

  return await request(options)
}
