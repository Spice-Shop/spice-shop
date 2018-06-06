import React, { Component } from 'react';
import store, { fetchProducts } from '../store/index';

export default class AllProducts extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    // const fetchThunk = fetchProducts();
    // store.dispatch(fetchThunk);
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const products = this.state.products;
    if (products.length === 0) {
        return (
          <div>
            <h3>Products</h3>
            <div>
            <h3>There are no products to display</h3>
            </div>
          </div>
          )
    }
    return (
      <div>
        <h3>Campuses</h3>
        <Link to="/new-campus">Add Campus</Link >
        <div className="row">
          {campuses.map(campus => {
            return (
              <div className="col-sm-4" key={campus.id}>
                <Link className="thumbnail" to={`/campuses/${campus.id}`}>
                  <img className="img-thumbnail" src='https://i.pinimg.com/originals/96/04/8b/96048b660f19ac329e69cc9572c5af49.jpg' />
                  <div className="caption">
                    <h4>
                      <span>{campus.name}</span>
                    </h4>
                  </div>
                </Link>
                <div>
                  <Link to={`/edit-campus/${campus.id}`}>Edit Campus</Link>
                </div>
                <button
                  value={`${campus.id}`} 
                  onClick={this.handleDelete}
                  type="button"
                  className="btn btn-danger btn-sm"
                  >Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
