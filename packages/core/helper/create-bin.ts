import request from 'core/utils/try-request'
import { Props } from 'jsonbin-db-shared/types'
import { BinData } from 'types/json-bin'
import { JsonBinDb } from '..'

export const createBin: Props<JsonBinDb, BinData> = async ({
  getHeader,
  access
}) => {
  const headers = getHeader()
  const { username, binKey } = access
  const options = {
    method: 'POST',
    url: `/${username}/${binKey}`,
    headers,
    body: JSON.stringify({ [binKey]: binKey })
  }

  return await request(options)
}
