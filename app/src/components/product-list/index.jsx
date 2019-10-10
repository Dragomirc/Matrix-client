import React from "react";
import PropTypes from "prop-types";
import ProductCard from "app/components/product-card";

const ProductList = props => {
    const { products } = props;
    const productList = products.map(
        ({ title, price, imageUrls, description, _id }) => {
            const firstImg = imageUrls.find(img => img.includes("first"));
            return (
                <ProductCard
                    key={_id}
                    _id={_id}
                    title={title}
                    price={price}
                    imageUrl={firstImg || imageUrls[0]}
                    description={description}
                />
            );
        }
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
