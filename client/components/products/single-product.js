import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const Product = (props) => {
    // const products = props.products;
   // if (products.length === 0) {
        return (
          // <div className="col-sm-4" key={product.id}>
          // //             <Link className="thumbnail" to={`/products/${product.id}`}>
          // //               <img className="img-thumbnail" src='https://i.pinimg.com/originals/96/04/8b/96048b660f19ac329e69cc9572c5af49.jpg' />
          // //               <div className="caption">
          // //                 <h4>
          // //                   <span>{product.name}</span>
          // //                 </h4>
          // //               </div>
          // //             </Link>
          // //             <div>
          // //               <Link to={`/edit-product/${product.id}`}>Edit Product</Link>
          // //             </div>
          // //             <button
          // //               value={`${product.id}`} 
          // //               onClick={this.handleDelete}
          // //               type="button"
          // //               className="btn btn-danger btn-sm"
          // //               >Delete</button>
          // //           </div>
          <div>Single Product</div>
          )
   // }
    // return (
    //   <div>
    //     <h3>Products</h3>
    //     <Link to="/new-product">Add Product</Link >
    //     <div className="row">
    //       {products.map(product => {
    //         return (
    //           <div className="col-sm-4" key={product.id}>
    //             <Link className="thumbnail" to={`/products/${product.id}`}>
    //               <img className="img-thumbnail" src='https://i.pinimg.com/originals/96/04/8b/96048b660f19ac329e69cc9572c5af49.jpg' />
    //               <div className="caption">
    //                 <h4>
    //                   <span>{product.name}</span>
    //                 </h4>
    //               </div>
    //             </Link>
    //             <div>
    //               <Link to={`/edit-product/${product.id}`}>Edit Product</Link>
    //             </div>
    //             <button
    //               value={`${product.id}`} 
    //               onClick={this.handleDelete}
    //               type="button"
    //               className="btn btn-danger btn-sm"
    //               >Delete</button>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // );
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error
//   }
// }

// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit (evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     }
//   }
// }

export const SingleProduct = connect()(Product)

/**
 * PROP TYPES
 */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }
