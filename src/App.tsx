import React from 'react'
import Header from "./components/header"
import Footer from "./components/footer"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/home-page"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "./redux/store"
import useApi from "./hooks/userApi"
import {CartType, CategoryType} from "./types"
import {AxiosResponse} from "axios"
import {setCategories} from "./redux/categorySlice"
import CategoryDetailsPage from "./pages/category-details-page"
import ProductDetailsPage from "./pages/product-details-page"
import {setCart} from "./redux/cartSlice"
import CartPage from "./pages/cart-page"
import CheckoutPage from "./pages/checkout-page"
import {setAuthToken} from "./redux/authSlice"
import LoginPage from "./pages/login-page"

function App() {
  const categoryState = useSelector((state: RootStateType) => state.category)
  const cartState = useSelector((state: RootStateType) => state.cart)
  const authState = useSelector((state: RootStateType) => state.auth)
  const api = useApi()
  const dispatch = useDispatch()

  console.log('>> APP CAT STATE', categoryState)

  const localStorageAuthToken = localStorage.getItem('authToken')

  if (localStorageAuthToken && (localStorageAuthToken !== authState.token)) {
    dispatch(setAuthToken(localStorageAuthToken))
  }

  if (categoryState.initialized === false) {
    // shop/taxons?page=1&itemsPerPage=30
    const params = {
      page: 1,
      itemsPerPage: 30
    }

    // https://ecommerce-api.udemig.dev/api/v2/shop/taxons?page=1&itemsPerPage=30
    api.get<CategoryType[]>('shop/taxons', {params})
      .then((response: AxiosResponse<CategoryType[]>) => {
        console.log('>> TAXON RESP', response)

        dispatch(setCategories(response.data))
      })
  }

  if (cartState.initialized === false) {
    const existingCartToken: string | null = localStorage.getItem('cartToken')

    console.log('>> Getting CART info from API, token: ' + existingCartToken)

    if (existingCartToken) {

      api.get<CartType>('shop/orders/' + existingCartToken)
        .then((response: AxiosResponse<CartType>) => {
          dispatch(setCart(response.data))
        })

    } else {

      const postData = {
        "localeCode": "en_US"
      }

      // XaOChTTSQn
      // rPTHL~T~lK

      api.post<CartType>('shop/orders', postData)
        .then((response: AxiosResponse<CartType>) => {
          localStorage.setItem('cartToken', response.data.tokenValue)

          dispatch(setCart(response.data))
        })

    }
  }

  return (
    <>
      <BrowserRouter>

        <Header/>

        <Routes>

          <Route index element={<HomePage/>}/>

          <Route path={'category-details/:code'} element={<CategoryDetailsPage/>}/>
          <Route path={'product-details/:code'} element={<ProductDetailsPage/>}/>
          <Route path={'cart'} element={<CartPage/>}/>
          <Route path={'checkout'} element={<CheckoutPage/>}/>
          <Route path={'login'} element={<LoginPage/>}/>

        </Routes>


        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
