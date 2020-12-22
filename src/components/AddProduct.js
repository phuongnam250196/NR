import React, { Component } from 'react';
import axios from 'axios';

const addProductAction = (product_name, product_price, image)=> (
    axios.post('/add', {product_name, product_price, image}).then((resp)=>resp.data))
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_price: '',
            image: ''
        }
    }
    
    onChange = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        console.log(name, value);
        this.setState({
            [name] : value
        });
    }
    submitFormGetInfo = () => {
        console.log(this.state)
        this.props.getInfo(this.state);
        var { product_name, product_price, image } = this.state;
        addProductAction(product_name, product_price, image).then((response)=>{
            console.log(response);
        });
    }
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input name="product_name" onChange={ (e)=> this.onChange(e) } className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input name="product_price" onChange={ (e)=> this.onChange(e) } className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Link</label>
                        <input name="image" onChange={ (e)=> this.onChange(e) } className="form-control" type="text" />
                    </div>
                    <input type="reset" value="Thêm mới" onClick={ ()=>this.submitFormGetInfo() } />
                </form>
            </div>
        );
    }
}

export default AddProduct;