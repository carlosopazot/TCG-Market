import { cards } from "../data/data"

export const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cards)
    }, 3000)
  })
}