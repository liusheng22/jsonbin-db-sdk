import { baseUrl } from 'constants/index'
import request from 'request'

interface RequestOpts extends request.CoreOptions {
  url: string
}

export default function (options: RequestOpts): Promise<any> {
  const { url, method, headers } = options
  const requestUrl = baseUrl + url
  const header = headers || {}
  const methodType = method || 'GET'

  if (['POST', 'PUT'].includes(methodType)) {
    header['Content-Type'] = 'application/json'
  }
  options.headers = header
  return new Promise((resolve, reject) => {
    if (!url) {
      reject('url is required')
      throw new Error('url is required')
    }

    request(requestUrl, options, function (error, response) {
      if (error) {
        reject(error)
        throw new Error(error)
      }

      let result = response.body
      try {
        result = JSON.parse(response.body)
      } catch (error) {
        reject(error)
      }

      console.log(`<----- 请求 ${methodType} ${url} ===>`, options)
      console.log(`-----> 返回 ${methodType} ${url} ===>`, result)
      resolve(result)
    })
  })
}
