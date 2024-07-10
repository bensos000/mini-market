import { defineStore } from 'pinia'
import { Product, ProductState } from '../models/product'

const productsUrl = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    filteredItems: {},
    ids: [],
    categories: [],
    filtering: false
  }),

  getters: {
    list(): Product[] {      
      return this.ids.map(i => this.items[i])
    },

    loaded(): boolean {      
      return this.ids.length > 0
    },

    categoriesList(): string[] {
      return [...new Set(this.list.map(product => product.category))]
    },

    filteredList(): Product[] {
      return this.ids.map(i => this.filteredItems[i]).filter(product => product)
    }
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

    filterAll(category: string, price: {min: number, max: number}) {
      
      this.filteredItems = {}
      this.filtering = true
      let productsList = this.list

      if (price) {
        productsList = productsList.filter(product => {
          return product.price >= price.min && product.price <= price.max
        })        
      }      
    
      if (category) {
        productsList = productsList.filter(product => product.category === category)
      }      

      productsList.forEach(product => {
        this.filteredItems[product.id] = product
      })

    }
  },
})