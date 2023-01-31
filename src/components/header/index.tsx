import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "../../redux/store"
import {CategoryType} from "../../types"
import {logout} from "../../redux/authSlice"

function Header() {
  const categoryState = useSelector((state: RootStateType) => state.category)
  const cartState = useSelector((state: RootStateType) => state.cart)
  const authState = useSelector((state: RootStateType) => state.auth)
  const dispatch = useDispatch()


  return (
    <>

      <div className="top-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-sm-6 hidden-xs">
              <p className="top-text">Flexible Delivery, Fast Delivery.</p>
            </div>
            <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
              <ul>
                <li>+180-123-4567</li>
                <li>info@demo.com</li>
                <li><a href="#">Help</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
              <div className="logo">
                <Link to="/"><img src="assets/images/logo.png" alt=""/> </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="search-bg">
                <input type="text" className="form-control" placeholder="Search Here"/>
                <button type="submit"><i className="fa fa-search"></i></button>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className="account-section">
                <ul>

                  {
                    authState.token
                      ? (
                        <>
                          <li>
                            <a href="#" className="title hidden-xs">
                              {authState.email}
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                dispatch(logout())
                              }}
                              className="title hidden-xs">
                              Logout
                            </a>
                          </li>
                        </>
                      )
                      : (
                        <>
                          <li>
                            <Link to="/login" className="title hidden-xs">
                              Login / Register
                            </Link>
                          </li>
                        </>
                      )
                  }
                  <li>
                    <Link to={"/cart"} className="title">
                      <i className="fa fa-shopping-cart"></i>
                      <sup className="cart-quantity">
                        {cartState.cart?.items.length}
                      </sup>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div id="navigation">
                  <ul>
                    <li className="active">
                      <Link to="/">Home</Link>
                    </li>


                    {
                      categoryState.initialized === false
                        ? (<li><a href="about.html">LOADING...</a></li>)
                        : (
                          <>
                            {categoryState.categories.map((category: CategoryType, index) => {
                              return <li key={index}>
                                <Link to={`category-details/${category.code}`}>
                                  {category.name}
                                </Link>
                              </li>
                            })}

                          </>
                        )
                    }


                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Header

