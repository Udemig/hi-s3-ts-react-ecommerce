import Breadcrumb from "../../components/breadcrumb"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {CartItemType, CartType} from "../../types"
import useApi from "../../hooks/userApi"
import axios, {Axios, AxiosResponse} from "axios"
import {refreshCart, setCart} from "../../redux/cartSlice"
import {ChangeEvent, useContext} from "react"
import {LoadingContext} from "../../components/loading-context"
import {Link} from "react-router-dom"

export default function CartPage() {
  const cartState = useSelector((state: RootStateType) => state.cart)
  const api = useApi()
  const dispatch = useDispatch()
  const loadingContext = useContext(LoadingContext)


  function onItemDelete(itemId: number) {
    if (!cartState.cart) {
      return
    }

    loadingContext.setLoading(true)
    api.delete<CartType>('shop/orders/' + cartState.cart.tokenValue + '/items/' + itemId)
      .then((response: AxiosResponse<CartType>) => {
        //loadingElement[0].classList.remove('active')
        loadingContext.setLoading(false)

        dispatch(refreshCart())
      })

  }

  function onQuantityChange(itemId: number, quantity: number | string) {
    if (!cartState.cart) {
      return
    }

    loadingContext.setLoading(true)

    //const loadingElement = document.getElementsByClassName("loading")
    //loadingElement[0].classList.add('active')

    const patchData = {
      "quantity": parseInt(quantity.toString())
    }
    api.patch<CartType>(
      'shop/orders/' + cartState.cart.tokenValue + '/items/' + itemId,
      patchData,
      {
        headers: {
          "content-type": "application/merge-patch+json"
        }
      }
    )
      .then((response: AxiosResponse<CartType>) => {
        //loadingElement[0].classList.remove('active')
        loadingContext.setLoading(false)

        dispatch(setCart(response.data))
      })
  }

  const totalItemQuantity = cartState.cart?.items.reduce((total, item: CartItemType) => {
    return total + item.quantity
  }, 0)

  const totalPrice = cartState.cart?.items.reduce((total, item: CartItemType) => {
    return total + item.total
  }, 0)


  /*
  19887+2556+5348+1034


   */

  return (
    <>
      <Breadcrumb items={[
        {url: '/', title: 'Home'},
        {url: '/cart', title: 'Cart'},
      ]}/>


      <div className="space-medium">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <div className="box">
                <div className="box-head">
                  <h3 className="head-title">My Cart (02)</h3>
                </div>
                <div className="box-body">
                  <div className="table-responsive">
                    <div className="cart">
                      <table className="table table-bordered ">
                        <thead>
                        <tr>
                          <th>
                            <span>Item</span></th>
                          <th>
                            <span>Price</span></th>
                          <th>
                            <span>Quantity</span></th>
                          <th>
                            <span>Total</span></th>
                          <th>
                          </th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                          cartState.cart?.items.map((item: CartItemType, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <span>
                                    <a href="#">
                                      {item.productName}
                                    </a>
                                  </span>
                                </td>
                                <td>
                                  ${item.unitPrice}
                                </td>
                                <td>
                                  <div className="product-quantity">
                                    <div className="quantity">
                                      <input type="number" className="input-text qty text"
                                             step="1" min="1" max="10"
                                             name="quantity"
                                             onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                               onQuantityChange(item.id, event.target.value)
                                             }}
                                             defaultValue={item.quantity}
                                             title="Qty" pattern="[0-9]*"/>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  ${item.total}
                                </td>
                                <th scope="row">
                                  <a
                                    onClick={() => onItemDelete(item.id)}
                                    className="btn-close"
                                  >
                                    <i className="fa fa-times-circle-o"></i>
                                  </a>
                                </th>
                              </tr>

                            )

                          })
                        }


                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#" className="btn-link"><i className="fa fa-angle-left"></i> back to shopping</a>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div className="box mb30">
                <div className="box-head">
                  <h3 className="head-title">
                    Price Details
                  </h3>
                </div>
                <div className="box-body">
                  <div className=" table-responsive">
                    <div className="pay-amount ">
                      <table className="table mb20">
                        <tbody>
                        <tr>
                          <th>
                            <span>Price (
                              {totalItemQuantity}
                              &nbsp;
                              items
                              )</span></th>
                          <td>${totalPrice}</td>
                        </tr>
                        <tr>
                          <th>
                            <span>Delivery Charges</span></th>
                          <td><strong className="text-green">Free</strong></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                          <th>
                            <span className="mb0" style={{fontWeight: "700"}}>Amount Payable</span></th>
                          <td style={{fontWeight: "700", color: "#1c1e1e"}}>${totalPrice}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>

                    <Link to={'/checkout'} className="btn btn-primary btn-block">Proceed To Checkout</Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

