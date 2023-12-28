type defaultParams = {
  [key: string]: any
}
interface FunctionProps<P = defaultParams, R = any> {
  (params: P, extra?: any): Promise<R>
}

// 该类型 接收一个返回结果的类型
type Props<P = defaultParams, R = any> = FunctionProps<P, R>
