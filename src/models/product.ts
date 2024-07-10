export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate : number,
  }
}

export interface ProductState {
  items: Record<string, Product>
  ids: number[]
}