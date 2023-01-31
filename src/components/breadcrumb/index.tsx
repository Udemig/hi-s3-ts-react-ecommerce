import {Link} from "react-router-dom"

export type BreadCrumbItemType = {
  url: string,
  title: string
}

export type BreadcrumbPropsType = {
  items: BreadCrumbItemType[]
}


function Breadcrumb(props: BreadcrumbPropsType) {
  return (
    <div className="page-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="page-breadcrumb">
              <ol className="breadcrumb">
                {
                  props.items.map((item: BreadCrumbItemType, index: number) => {
                    if (index < (props.items.length - 1)) {
                      return <li key={index}>
                        <Link to={item.url}>
                          {item.title}
                        </Link>
                      </li>
                    } else {
                      return <li key={index}>
                        {item.title}
                      </li>
                    }
                  })
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Breadcrumb
