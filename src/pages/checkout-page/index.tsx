import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import useApi from "../../hooks/userApi"
import {ChangeEvent, useContext, useState} from "react"
import {LoadingContext} from "../../components/loading-context"
import Breadcrumb from "../../components/breadcrumb"
import {CountryType, ProvinceType} from "../../types"
import {AxiosResponse} from "axios"

export default function CheckoutPage() {
  const cartState = useSelector((state: RootStateType) => state.cart)
  const api = useApi()
  const dispatch = useDispatch()
  const loadingContext = useContext(LoadingContext)

  const [selectedCountry, setSelectedCountry] = useState<CountryType | undefined>(undefined)

  const [countries, setCountries] = useState<CountryType[]>([])
  const [initialized, setInitialized] = useState<boolean>(false)

  if ((cartState.cart === null) || (cartState.cart.items.length === 0)) {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="box checkout-form">
                <div className="box-head">
                  <h2 className="head-title text-center">
                    Please add something to cart.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    )
  }


  if (initialized === false) {
    loadingContext.setLoading(true);

    (async () => {
      // burası asenkron bölge

      const countryResponse: AxiosResponse<CountryType[]> = await api.get<CountryType[]>('shop/countries?page=1&itemsPerPage=500')
      console.log('>> COUNTRY RESP', countryResponse.data)

      setCountries(countryResponse.data)
      setInitialized(true)
      loadingContext.setLoading(false)
    })()

    return <></>
  }

  console.log('>> selectedCountry:', selectedCountry)

  return (
    <>
      <Breadcrumb items={[
        {url: '/', title: 'Home'},
        {url: '/checkout', title: 'Checkout'},
      ]}/>

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <div className="box checkout-form">
                <div className="box-head">
                  <h2 className="head-title">Your Detail</h2>
                </div>
                <div className="box-body">
                  <div className="row">
                    <form>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only" htmlFor="name"></label>
                          <input name="name" type="text" className="form-control" placeholder="Enter Your First NAme"
                                 required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only" htmlFor="name"></label>
                          <input id="name" name="name" type="text" className="form-control"
                                 placeholder="Enter Your last NAme" required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only" htmlFor="email">Email</label>
                          <input id="email" name="email" type="text" className="form-control"
                                 placeholder="Enter Email Address" required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only" htmlFor="phone"></label>
                          <input id="phone" name="phone" type="text" className="form-control"
                                 placeholder="Enter Mobile Number" required/>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <input name="phone" type="text" className="form-control" placeholder="street Address"
                                 required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"> </label>
                          <select
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                              let selectedCountry = countries.find((item) => item.code === event.target.value)
                              setSelectedCountry(selectedCountry)
                            }}
                            name="country"
                            className="form-control"
                            required
                          >
                            <option value="">
                              [ Please Select ]
                            </option>

                            {
                              countries.map((item: CountryType, index) => {
                                return <option key={index} value={item.code}>
                                  {item.name}
                                </option>
                              })
                            }

                          </select>

                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only "></label>

                          {
                            (selectedCountry && (selectedCountry.provinces.length > 0))
                              ? (
                                <select name="city" className="form-control" required>
                                  <option value="">[ Please Select ]</option>
                                  {
                                    selectedCountry.provinces.map((item: ProvinceType, index) => {
                                      return <option key={index} value={item.code}>
                                        {item.name}
                                      </option>
                                    })
                                  }
                                </select>
                              )
                              : (
                                <input name="city" type="text"
                                       className="form-control" placeholder="Enter Province"
                                       required/>
                              )
                          }

                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <input name="postcode" type="text" className="form-control"
                                 placeholder="Enter Your zipcode"
                                 required/>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <textarea className="form-control" name="notes"
                                    placeholder="Notes About Your Order"></textarea>
                        </div>

                        <button className="btn btn-primary ">Procced to Payment</button>
                        <div className="checkbox alignright mt20">
                          <label>
                            <input type="checkbox" value=""/>
                            <span>Create An Account?</span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <div className="box mb30">
                <div className="box-head">
                  <h3 className="head-title">Your Order</h3>
                </div>
                <div className="box-body">
                  <div className="table-responsive">

                    <div className="pay-amount ">
                      <table className="table mb20">
                        <thead className="">
                        <tr>
                          <th>
                            <span>Product</span></th>
                          <th>
                            <span>Total</span></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <th>
                            <span>Google Pixle X 1</span></th>
                          <td>$2400</td>
                        </tr>
                        <tr>
                          <th>
                            <span>Apple iPhone 6S X 1 </span></th>
                          <td>$1300</td>
                        </tr>
                        <tr>
                          <th>
                            <span>Sub Total </span></th>
                          <td>$2400</td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                          <th>
                            <span>Amount Payable</span></th>
                          <td>$2400</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box">
                <div className="box-head">
                  <h3 className="head-title">Check Payment</h3>
                </div>
                <div className="box-body">
                  <p>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store
                    Postcode.</p>
                  <button className="btn btn-default btn-block">Place Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>

  )
}

