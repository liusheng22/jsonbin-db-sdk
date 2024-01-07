// 同步的 try catch
export function tryCatchSync<T>(fn: () => T, defaultValue?: T): T {
  try {
    return fn()
  } catch (error) {
    console.log()
  }
  return defaultValue as T
}

// 异步的 try catch
export async function tryCatchAsync<T>(fn: () => Promise<T>, defaultValue?: T) {
  try {
    return await fn()
  } catch (error) {
    console.log()
  }
  return defaultValue as T
}
