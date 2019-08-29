import React from "react";
import PropTypes from "prop-types";
import ProductCard from "app/components/product-card";

const ProductList = props => {
    const { products } = props;
    const productList = products.map(
        ({ title, price, imageUrl, description }) => (
            <ProductCard
                key={price + title}
                title={title}
                price={price}
                imageUrl={imageUrl}
                description={description}
            />
        )
    );
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {productList}
        </div>
    );
};

export default ProductList;

ProductList.propTypes = {
    products: PropTypes.array.isRequired
};
