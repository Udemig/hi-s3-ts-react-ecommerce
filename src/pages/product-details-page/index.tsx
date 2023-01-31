// ürün detay bilgisini aldıktan sonra gelen JSON datasında `variants` dizisindeki
// stringlerin '/' karakterine göre bölümündeki son elemanı şu adrese gönder:
// `shop/product-variants/{code}`


import Breadcrumb from "../../components/breadcrumb"
import {useParams} from "react-router-dom"
import {
  CartType,
  CategoryType,
  ProductImageType,
  ProductType,
  ProductVariantType,
  RouteCodeParamsType
} from "../../types"
import ImageGallery, {ReactImageGalleryItem} from 'react-image-gallery'

import styles from './index.module.css'
import {ChangeEvent, FormEvent, useState} from "react"
import useApi from "../../hooks/userApi"
import {AxiosResponse} from "axios"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {setCart} from "../../redux/cartSlice"


function ProductDetailsPage() {
  const cartState = useSelector((state: RootStateType) => state.cart)

  const routeParams = useParams<RouteCodeParamsType>()
  const api = useApi()

  const dispatch = useDispatch()

  const [productDetails, setProductDetails] = useState<ProductType | null>(null)
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(null)
  const [productVariants, setProductVariants] = useState<ProductVariantType[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  const [selectedVariant, setSelectedVariant] = useState<ProductVariantType | null>(null)

  if (initialized === false) {
    (async () => {
      const productResult = await api.get<ProductType>(`shop/products/${routeParams.code}`)

      const promises: any[] = []
      for (let i = 0; i < productResult.data.variants.length; i++) {
        let variantCode: string = productResult.data.variants[i].split('/').reverse()[0]
        promises.push(api.get('shop/product-variants/' + variantCode))
      }

      const variantResponses: AxiosResponse<ProductVariantType>[] = await Promise.all(promises)
      console.log('>> RESOLVED RESPONSES', variantResponses)

      let productVariants: ProductVariantType[] = variantResponses.map((item) => item.data)

      let taxonCode: string = productResult.data.mainTaxon.split('/').reverse()[0]
      const categoryResult = await api.get<CategoryType>(`shop/taxons/${taxonCode}`)

      console.log('>> PRODUCT RESULT DATA', productResult.data)

      setProductDetails(productResult.data)
      setCategoryDetails(categoryResult.data)
      setProductVariants(productVariants)
      setSelectedVariant(productVariants[0])
      setInitialized(true)
    })()

    return <>
      <div className={'content'}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="box">
                <div className="box-body">
                  <br/>
                  <br/>
                  <br/>
                  <h1 className={'text-center'}>
                    LOADING...

                  </h1>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  }

  function onVariantChange(event: ChangeEvent<HTMLSelectElement>) {
    let foundVariant: ProductVariantType | undefined = productVariants.find(
      (item) => item.code === event.target.value
    )

    if (foundVariant) {
      setSelectedVariant(foundVariant)
    }
  }


  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.target as HTMLFormElement)
    const formValue: any = Object.fromEntries(data.entries())

    formValue.quantity = parseInt(formValue.quantity)

    console.log(formValue)

    if (cartState.cart) {

      api.post<CartType>(`shop/orders/${cartState.cart.tokenValue}/items`, formValue)
        .then((response: AxiosResponse<CartType>) => {
          console.log('>> API RESP', response.data)

          dispatch(setCart(response.data))
        })
    }
  }


  const images: ReactImageGalleryItem[] = []

  productDetails?.images.map((item: ProductImageType, index) => {
    images.push({
      original: 'https://ecommerce-api.udemig.dev' + item.path,
      thumbnail: 'https://ecommerce-api.udemig.dev' + item.path,
    })
  })


  return (
    <>
      <Breadcrumb items={[
        {url: '/', title: 'Home'},
        {url: '/product', title: 'Product'},
        {url: '/product-details/' + routeParams.code, title: routeParams.code as string},
      ]}/>

      <div className={'content'}>


        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="box">
                <div className="box-body">
                  <div className="row">

                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                      <ImageGallery items={images}/>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                      <form onSubmit={onFormSubmit}>
                        <div className="product-single">
                          <h2>
                            {productDetails?.name}
                          </h2>
                          <div className="product-rating">
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star"></i></span>
                            <span><i className="fa fa-star-o"></i></span>
                            <span className="text-secondary">
                            &nbsp;
                              (
                              {productDetails?.averageRating}
                              &nbsp;
                              Review Stars
                            )
                          </span>
                          </div>
                          <p className="product-price" style={{fontSize: "38px"}}>

                            ${selectedVariant?.price}

                          </p>
                          <p>
                            {productDetails?.description.substring(0, 100)}
                            ...
                          </p>


                        </div>


                        <div className={'row'}>
                          <div className={'col-md-2'}>
                            <div className="product-quantity">
                              <h5>Quantity</h5>
                              <div className="quantity mb20">
                                <input
                                  type="number"
                                  name="quantity"
                                  className="input-text qty text"
                                  step="1" min="1" max="6"
                                  value="1" title="Qty" pattern="[0-9]*"/>
                              </div>
                            </div>
                          </div>

                          <div className={'col-md-3'}>
                            <div className="product-quantity">
                              <h5>
                                Variants
                              </h5>
                              <div className="quantity mb20">
                                <select
                                  onChange={onVariantChange}
                                  name={'productVariant'}
                                  className={"form-control " + styles.product_variant_select}
                                >
                                  {
                                    productVariants.map((item: ProductVariantType, index) => {
                                      return <option
                                        key={index}
                                        value={item.code}
                                      >
                                        {item.name}
                                      </option>
                                    })
                                  }

                                </select>


                              </div>
                            </div>
                          </div>
                        </div>

                        <button type="submit" className="btn btn-default"><i
                          className="fa fa-shopping-cart"></i>&nbsp;Add to cart
                        </button>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="box-head scroll-nav">
                <div className="head-title">
                  <a className="page-scroll active">
                    Product Details
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="box">
                <div className="box-body">
                  {productDetails?.description}
                </div>
              </div>
            </div>
          </div>


        </div>


      </div>

    </>
  )
}

export default ProductDetailsPage


