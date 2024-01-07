import { db } from './db'

// console.log('header =>', db.getHeader())
// console.log('getObjectDefault =>', db.getObjectDefault())
const fn = async () => {
  // TODO: 根据 name 来确认 binId
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
}
fn()
