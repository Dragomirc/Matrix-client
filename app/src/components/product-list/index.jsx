import React from 'react';
import ProductCard from 'app/components/product-card';

const ProductList = props => {
  const { products } = props;
  const productList = products.map(product => (
    <ProductCard key={product.price + product.title} {...product} />
  ));
  return (
    <div className="d-flex flex-wrap justify-content-center">{productList}</div>
  );
};

export default ProductList;
