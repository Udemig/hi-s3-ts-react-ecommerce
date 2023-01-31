import Breadcrumb from "../../components/breadcrumb"
import {Link} from "react-router-dom"
import {FormEvent} from "react"
import useApi from "../../hooks/userApi"
import {useDispatch} from "react-redux"
import {setAuthToken} from "../../redux/authSlice"

export default function LoginPage() {
  const api = useApi()
  const dispatch = useDispatch()

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.target as HTMLFormElement)
    const formValue: any = Object.fromEntries(data.entries())

    console.log('>> FORM VAL', formValue)

    api.post('shop/authentication-token', formValue)
      .then((response: any) => {
        const customerId = response.data.customer.split('/').reverse()[0]
        const token = response.data.token

        console.log('>> RESP', response)

        dispatch(setAuthToken(token))

        setTimeout(() => document.location.href = '/', 1e3)
      })
  }


  return (
    <>
      <Breadcrumb items={[
        {url: '/', title: 'Home'},
        {url: '/login', title: 'Login'},
      ]}/>


      <div className="content">
        <div className="container">
          <div className="box">
            <div className="row">
              <div className="col-lg-offset-1 col-lg-5 col-md-offset-1 col-md-5 col-sm-12 col-xs-12 ">
                <div className="box-body">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 mb20">
                      <h3 className="mb10">Login</h3>
                    </div>

                    <form onSubmit={onFormSubmit}>

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <div className="login-input">
                            <input name="email" type="text" className="form-control"
                                   placeholder="Enter your email id" required/>
                            <div className="login-icon"><i className="fa fa-user"></i></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group">
                          <label className="control-label sr-only"></label>
                          <div className="login-input">
                            <input name="password" type="password" className="form-control" placeholder="******"
                                   required/>
                            <div className="login-icon"><i className="fa fa-lock"></i></div>
                            <div className="eye-icon"><i className="fa fa-eye"></i></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb20 ">
                        <button
                          type={"submit"}
                          className="btn btn-primary btn-block mb10">
                          Login
                        </button>

                        <div>
                          <p>You want to join? <Link to="/register">Register</Link></p>
                        </div>
                      </div>
                    </form>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                      <h4 className="mb20">Login With</h4>
                      <div className="social-media">
                        <a href="#" className="btn-social-rectangle btn-facebook"><i
                          className="fa fa-facebook"></i><span className="social-text">Facebook</span></a>
                        <a href="#" className="btn-social-rectangle btn-twitter"><i className="fa fa-twitter"></i><span
                          className="social-text">Twitter</span> </a>
                        <a href="#" className="btn-social-rectangle btn-googleplus"><i
                          className="fa fa-google-plus"></i><span className="social-text">Google Plus</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 ">
                <div className="box-body">
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="assets/images/feature_icon_1.png" alt=""/>
                    </div>
                    <div className="feature-content">
                      <h4>Loyalty Points</h4>
                      <p>Aenean lacinia dictum risvitae pulvinar disamer seronorem ipusm dolor sit manert.</p>
                    </div>
                  </div>
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="assets/images/feature_icon_2.png" alt=""/>
                    </div>
                    <div className="feature-content">
                      <h4>Instant Checkout</h4>
                      <p>Aenean lacinia dictum risvitae pulvinar disamer seronorem ipusm dolor sit manert.</p>
                    </div>
                  </div>
                  <div className="feature-left">
                    <div className="feature-icon">
                      <img src="assets/images/feature_icon_3.png" alt=""/>
                    </div>
                    <div className="feature-content">
                      <h4>Exculsive Offers</h4>
                      <p>Aenean lacinia dictum risvitae pulvinar disamer seronorem ipusm dolor sit manert.</p>
                    </div>
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
