import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ProductService from 'app/services/api/product';
import ProductList from 'app/components/product-list';

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    ProductService.getProducts().then(res => {
      this.setState({ products: res });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <Container>
        <ProductList products={products} />
      </Container>
    );
  }
}

export default ProductsPage;
