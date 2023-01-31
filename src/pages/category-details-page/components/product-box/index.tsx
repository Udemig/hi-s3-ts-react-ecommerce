import {ProductType} from "../../../../types"
import {Link} from "react-router-dom"


export type ProductBoxPropsType = {
  product: ProductType
}

function ProductBox(props: ProductBoxPropsType) {

  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 mb30">
      <div className="product-block">
        <div className="product-img">
          <Link to={`/product-details/${props.product.code}`}>
            <img src={'https://ecommerce-api.udemig.dev' + props.product.images[0].path} alt=""/>
          </Link>
        </div>

        <div className="product-content">

          <h5>
            <Link to={`/product-details/${props.product.code}`} className="product-title">
              <strong>{props.product.name}</strong>
            </Link>
          </h5>

          <div className="product-meta">
            <a href="#" className="product-price">$1100</a>
            <a href="#" className="discounted-price">$1400</a>
            <span className="offer-price">20%off</span>
          </div>

          <div className="shopping-btn">
            <Link to={`/product-details/${props.product.code}`} className="product-btn btn-like">
              <i className="fa fa-eye"/>
            </Link>
            &nbsp;
            &nbsp;
            &nbsp;
            <a href="#" className="product-btn btn-cart">
              <i className="fa fa-shopping-cart"/>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductBox
