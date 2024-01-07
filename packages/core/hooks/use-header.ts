export const useHeaders = () => {
  const headers: Record<string, string> = {}

  const assignHeader = (newHeaders: Record<string, string>) => {
    return Object.assign(headers, newHeaders)
  }

  const setHeader = (key: string, value: string) => {
    headers[key] = value
  }

  const getHeader = (key?: string) => {
    if (!key) {
      return headers
    }

    return headers[key]
  }

  return {
    assignHeader,
    setHeader,
    getHeader
  }
}
