import fetch from "fetch-retry";
import Config from "app/config/client";

export default class ProductService {
    static createProduct(product) {
        return Config.fetch().then(config => {
            const url = `${config.services.admin}/product`;
            const { title, description, price, image } = product;
            const formData = new FormData();
            formData.append("title", title);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("image", image);
            const options = {
                method: "POST",
                body: formData
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

    static async getProducts() {
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

    static async getProduct(id) {
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
