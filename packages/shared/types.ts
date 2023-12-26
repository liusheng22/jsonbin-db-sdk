export type defaultParams = {
  [key: string]: any
}
export interface FunctionProps<P = defaultParams, R = any> {
  (params: P, extra?: any): Promise<R>
}

// 该类型 接收一个返回结果的类型
export type Props<P = defaultParams, R = any> = FunctionProps<P, R>
