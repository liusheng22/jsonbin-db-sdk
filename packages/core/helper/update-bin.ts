import request from 'core/utils/try-request'
import { Props } from 'jsonbin-db-shared/types'
import { BinData } from 'types/json-bin'
import { JsonBinDb } from '..'

export const updateBin: Props<JsonBinDb, BinData> = async (
  { getHeader, access },
  data
) => {
  const headers = getHeader()
  // headers['X-Bin-Name'] = BIN_NAME
  const { username, binKey } = access
  const options = {
    method: 'POST',
    url: `/${username}/${binKey}`,
    headers,
    body: JSON.stringify(data)
  }

  return await request(options)
}
