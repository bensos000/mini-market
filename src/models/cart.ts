export interface Purchase {
  productId: number;
  quantity: number;
}

export interface CartState {
  contents: Record<string, Purchase>;
}

export interface CartPreview {
  id: number;
  image: string;
  title: string;
  quantity: number;
  cost: number;
}
