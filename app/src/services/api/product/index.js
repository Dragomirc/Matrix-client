import fetch from "fetch-retry";
import Config from "app/config/client";

export default class ProductService {
    static createProduct(product) {
        return Config.fetch().then(config => {
            const url = `${config.services.admin}/product`;
            const options = {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-type": "application/json"
                }
            };
            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 201:
                        return res;
                    case 422:
                        throw new Error(res);
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error(
                            "POST Product Service Error on createProduct"
                        );
                }
            });
        });
    }

    static updateProduct(product) {
        return Config.fetch().then(config => {
            const url = `${config.services.admin}/product`;
            const options = {
                method: "PUT",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 200:
                        return res;
                    case 422:
                        throw new Error(res);
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error(
                            "PUT Product Service Error on createProduct"
                        );
                }
            });
        });
    }

    static deleteProduct(productId) {
        return Config.fetch().then(config => {
            const url = `${config.services.admin}/product/${productId}`;
            const options = {
                method: "DELETE"
            };
            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 200:
                        return res;
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error(
                            "DELETE Product Service Error on deleteProduct."
                        );
                }
            });
        });
    }

    static getProducts() {
        return Config.fetch().then(config => {
            const url = `${config.services.shop}/products`;
            const options = {
                method: "GET"
            };
            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 200:
                        return res;
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error(
                            "GET Product Service Error on getProducts"
                        );
                }
            });
        });
    }

    static getProduct(id) {
        return Config.fetch().then(config => {
            const url = `${config.services.shop}/products/${id}`;
            const options = {
                method: "GET"
            };
            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 200:
                        return res;
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error("GET Product Service on getProduct()");
                }
            });
        });
    }
}
