export const useBin = () => {
  let binKey = ''

  const setBinKey = (key: string) => {
    binKey = key
  }

  const getBinKey = () => {
    return binKey
  }

  return {
    setBinKey,
    getBinKey
  }
}
