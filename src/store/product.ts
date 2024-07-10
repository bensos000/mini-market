import { defineStore } from 'pinia'
import { Product, ProductState } from '../models/product'

const productsUrl = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {      
      return this.ids.map(i => this.items[i])
    },

    loaded(): boolean {      
      return this.ids.length > 0
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded)
        return
      
      try {
        const res = await fetch(productsUrl)
        const data: Product[] = await res.json()
        this.ids = data.map((product) => {
          this.items[product.id] = product
          return product.id
        })  
      } catch (error) {
        return error
      }
    },
  },
})