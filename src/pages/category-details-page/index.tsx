import {useParams} from "react-router-dom"
import Breadcrumb from "../../components/breadcrumb"
import useApi from "../../hooks/userApi"
import {CategoryType, ProductType, RouteCodeParamsType} from "../../types"
import {ChangeEvent, useState} from "react"
import {AxiosResponse} from "axios"
import ProductBox from "./components/product-box"
import {useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"

export type AscDescOrderType = 'asc' | 'desc'


function CategoryDetailsPage() {
  const categoryState = useSelector((state: RootStateType) => state.category)

  const routeParams = useParams<RouteCodeParamsType>()
  const api = useApi()
  const [initialized, setInitialized] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductType[]>([])

  const [page, setPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(2)

  const [orderPrice, setOrderPrice] = useState<AscDescOrderType>('asc')
  const [orderCreatedAt, setOrderCreatedAt] = useState<AscDescOrderType>('asc')

  if (initialized === false) {
    const params = {
      page,
      itemsPerPage,
      "productTaxons.taxon.code": routeParams.code,
      "order[price]": orderPrice,
      "order[createdAt]": orderCreatedAt,
    }

    // /api/v2/shop/products?page=1&itemsPerPage=10&productTaxons.taxon.code=t_shirts&order[price]=asc
    api.get<ProductType[]>('shop/products', {params})
      .then((response: AxiosResponse<ProductType[]>) => {
        setProducts(response.data)
        setInitialized(true)
      })
  }

  // bu bölgede kategori detay bilgisini almış bulunmaktayız.

  const foundCategory: CategoryType | undefined = categoryState.categories
    .find((item: CategoryType) => item.code === routeParams.code)

  console.log('>> FOUND CAT', foundCategory)

  return (
    <>
      <Breadcrumb items={[
        {url: '/', title: 'Home'},
        {url: '/category', title: 'Category'},
        {url: '/category-details/' + routeParams.code, title: foundCategory?.name as string},
      ]}/>

      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
              <div id="cssmenu">
                <ul>
                  <li className="has-sub active">
                    <a>
                      SUB CATEGORIES
                    </a>
                    <ul style={{display: 'block'}}>
                      <li className="even"><a href="#">Smart Phones</a></li>
                      <li className="odd"><a href="#">Cell Phones</a></li>
                      <li className="last even"><a href="#">Android Phones</a></li>
                    </ul>
                  </li>
                </ul>

              </div>
            </div>

            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb10 alignright">

                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4">

                      <div className="select-option form-group">
                        <select
                          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            setOrderCreatedAt(event.target.value as AscDescOrderType)
                            setInitialized(false)
                          }}
                          className="form-control"
                        >
                          <option selected={orderCreatedAt === 'asc'} value="asc">
                            Tarihe Göre Artan
                          </option>
                          <option selected={orderCreatedAt === 'desc'} value="desc">
                            Tarihe Göre Azalan
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">

                      <div className="select-option form-group">
                        <select
                          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            setOrderPrice(event.target.value as AscDescOrderType)
                            setInitialized(false)
                          }}
                          className="form-control"
                        >
                          <option selected={orderPrice === 'asc'} value="asc">
                            Fiyata Göre Artan
                          </option>
                          <option selected={orderPrice === 'desc'} value="desc">
                            Fiyata Göre Azalan
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-4">

                      <div className="select-option form-group">
                        <select
                          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                            setItemsPerPage(parseInt(event.target.value))
                            setInitialized(false)
                          }}
                          className="form-control"
                        >
                          <option selected={itemsPerPage === 2} value="2">
                            2 Ürün Göster
                          </option>
                          <option selected={itemsPerPage === 3} value="3">
                            3 Ürün Göster
                          </option>
                          <option selected={itemsPerPage === 5} value="5">
                            5 Ürün Göster
                          </option>
                          <option selected={itemsPerPage === 10} value="10">
                            10 Ürün Göster
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="row">

                {
                  initialized === true
                    ? products.map((product: ProductType, index) => {
                      return <ProductBox key={index} product={product}/>
                    })
                    : <>
                      <br/>
                      <h2 className={"text-center"}>
                        LOADING...
                      </h2>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                    </>
                }

              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="st-pagination">
                    <ul className="pagination">
                      <li>
                        <a
                          onClick={() => {
                            if (page > 1) {
                              setPage(page - 1)
                              setInitialized(false)
                            }
                          }}
                          aria-label="previous"
                        >
                          <span aria-hidden="true">
                            &lt;
                            Prev
                          </span>
                        </a>
                      </li>
                      <li className="active">
                        <a>
                          {page}
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            if (products.length > 0) {
                              setPage(page + 1)
                              setInitialized(false)
                            }
                          }}
                          aria-label="next"
                        >
                          <span aria-hidden="true">
                            Next
                            &gt;
                          </span>
                        </a>
                      </li>
                    </ul>
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

export default CategoryDetailsPage

