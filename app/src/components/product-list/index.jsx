import React from 'react';
import ProductCard from 'app/components/product-card';

const ProductList = () => {
  //   const { products } = props;
  const products = [
    {
      _id: '1',
      title: 'Product title',
      description: 'Product description',
      price: 3,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      _id: '1',
      title: 'Product title',
      description: 'Product description',
      price: 3,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      _id: '1',
      title: 'Product title',
      description: 'Product description',
      price: 3,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      _id: '1',
      title: 'Product title',
      description: 'Product description',
      price: 3,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      _id: '1',
      title: 'Product title',
      description: 'Product description',
      price: 3,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ];
  const productList = products.map(product => (
    <ProductCard key={product.price + product.title} {...product} />
  ));
  return (
    <div className="d-flex flex-wrap justify-content-center">{productList}</div>
  );
};

export default ProductList;
