import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div className="col-4">
                <div className="card text-left mb-4">
                    <img className="card-img-top" src={this.props.image} alt="" />
                    <div className="card-body">
                    <h4 className="card-title">{this.props.product_name}</h4>
                    <p className="card-text">{this.props.product_price}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;