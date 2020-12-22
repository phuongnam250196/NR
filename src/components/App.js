import './App.css';
import React, { Component } from 'react';
import HeadTitle from './HeadTitle';
import Product from './Product';
import axios from 'axios';

const addProductAction = (product_name, product_price, image)=> (
  axios.post('/add', {product_name, product_price, image}).then((resp)=>resp.data))
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d: {},
      product_name: '',
      product_price: '',
      image: ''
    }
  }
  
  getInfo = (val) => {
    console.log(val);
    // axios.post('http://localhost:4000/add', {product_name, product_price, image}).then((resp)=>resp.data);
  }

  componentWillMount () {
    axios.get('http://localhost:4000/getdata')
    .then((response)  => {
      this.setState({
        d : response.data
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    }); 
  }

  showListProduct = () => {
    var a= this.state.d;
    return Object.keys(this.state.d).map(function(item, i){
      return <Product 
              key={i}
              product_name={a[i].product_name}
              product_price={a[i].product_price}
              image={a[i].image}
            />
    })
  }

  onChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
        [name] : value
    });
  }
  submitFormGetInfo = () => {
      console.log(this.state)
      var { product_name, product_price, image } = this.state;
      let dataTemp = [];
      let item = {};
      item.product_name = product_name;
      item.product_price = product_price;
      item.image = image;
      addProductAction(product_name, product_price, image).then((response)=>{
        console.log(response);
      });
      dataTemp = this.state.d;
      if (item.product_name !== '') {
        dataTemp.push(item);
      }
      this.setState({
        d: dataTemp
      });
  }

  render() {
    

    return (
      <div className="container">
          <HeadTitle />
          <br />
          <div className="row">
            <div className="col">
              <div className="row">
                { this.showListProduct() }
              </div>
            </div>
            <div className="col-4">
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
          </div>
      </div>
    );
  }
}

export default App;
