import { defineStore } from 'pinia'
import { useProductStore } from './product'
import { CartPreview, CartState } from '../models/cart'

export const useCartStore = defineStore({
  id: 'cart',

  state: (): CartState => ({
    contents: {},
  }),

  getters: {
    count(): number {
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity
      }, 0)
    },

    total(): number {
      const products = useProductStore()
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.items[id].price * this.contents[id].quantity
      }, 0)
    },

    formattedCart(): CartPreview[] {
      const products = useProductStore()

      if (!products.loaded)
        return []

      return Object.keys(this.contents).map((productId) => {
        const purchase = this.contents[productId]

        return {
          id: purchase.productId,
          image: products.items[purchase.productId].image,
          title: products.items[purchase.productId].title,
          quantity: purchase.quantity,
          cost: purchase.quantity * products.items[purchase.productId].price,
        }
      })
    },
  },

  actions: {
    increment(productId: number) {
      if (this.contents[productId]) {
        this.contents[productId].quantity += 1
      }
      else {
        this.contents[productId] = {
          productId,
          quantity: 1,
        }
      }
    },
    decrement(productId: number) {
      if (!this.contents[productId])
        return

      this.contents[productId].quantity -= 1

      if (this.contents[productId].quantity === 0)
        delete this.contents[productId]
    },
    delete(productId: number) {
      delete this.contents[productId]
    }
  },
})