export type CategoryType = {
  id: number,
  code: string,
  children: string[],
  name: string,
  slug: string,
  description: string
}


export type ProductImageType = {
  id: number,
  type: string,
  path: string
}


export type ProductType = {
  id: number,
  code: string,
  productTaxons: string[],
  mainTaxon: string,
  reviews: string[],
  averageRating: number,
  images: ProductImageType[],
  variants: string[],
  options: string[],
  shortDescription: string,
  name: string,
  description: string,
  slug: string,
  defaultVariant: string,
  createdAt: string,
  updatedAt: string,
}


export type ProductVariantType = {
  id: number,
  code: string,
  product: string,
  optionValues: string[],
  name: string,
  price: number,
  originalPrice: number,
  inStock: boolean
}

export type RouteCodeParamsType = {
  code: string
}


export type CartItemType = {
  id: number,
  variant: string,
  productName: string,
  quantity: number,
  unitPrice: number,
  originalUnitPrice: number,
  total: number,
  subtotal: number
}

export type CartType = {
  id: number,
  tokenValue: string,
  channel: string,
  payments: any[],
  shipments: any[],
  currencyCode: string,
  localeCode: string,
  checkoutState: string,
  paymentState: string,
  shippingState: string,
  items: CartItemType[],
  itemsTotal: number,
  total: number,
  state: string,
  taxTotal: number,
  shippingTotal: number,
  orderPromotionTotal: number
}


export type ProvinceType = {
  code: string,
  name: string
}

export type CountryType = ProvinceType & {
  provinces: ProvinceType[]
}

