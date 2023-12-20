import { cards } from "../data/data"

export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cards)
    }, 1000)
  })
}