export interface SnippetMeta {
  name: string
}

export interface Bin {
  private: boolean
  snippetMeta: SnippetMeta
  record: string
  createdAt: string
}

export interface BinList extends Array<Bin> {}

export interface BinMetadata {
  metadata: {
    id: string
    createdAt: string
    private: boolean
    name: string
  }
}

export interface BinResponse extends BinData, BinMetadata {}

// 新的类型
export interface BinData {
  [key: string]: any
}
