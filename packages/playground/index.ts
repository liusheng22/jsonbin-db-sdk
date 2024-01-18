import { db } from './db'

const fn = async () => {
  await db.initBin()

  // delete
  // console.log('delete ===>', await db.delete(`.jpr2svp2is9`))

  console.log('getObjectDefault ===>', await db.getObjectDefault(`.`, {}))

  // push list
  console.log(
    'push list ===>',
    await db.push('.list', [
      { id: 0, a: 1 },
      { id: 1, a: 2 },
      { id: 2, a: 3 },
      { id: 3, a: 4 }
    ])
  )

  // get index
  console.log('getIndex ===>', await db.getIndex(`.list`, 1, 'a'))

  // 随机一个对象的 key
  const randomKey = Math.random().toString(36).slice(2)
  console.log(
    'patchDbData ===>',
    await db.push(`.${randomKey}`, { [randomKey]: randomKey })
  )

  console.log('getData ===>', await db.getData(`.`))

  // getObject 这是一个没有定义的方法，直接通过 proxy 动态生成
  console.log('getTestFn1 ===>', await db.getObject(`.`))
}
fn()
