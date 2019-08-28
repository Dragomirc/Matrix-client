import fetch from 'fetch-retry';
import Config from 'app/config/client';

export default class ProductService {
  static createProduct(product) {
    return Config.fetch().then(config => {
      const url = `${config.services.admin}/product`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      };
      return fetch(url, options).then(async response => {
        const statusCode = response.status;
        const res = await response.json();
        switch (statusCode) {
          case 201:
            return res;
          case 500:
            throw new Error(res.message);
          default:
            throw new Error('POST Product Service Error on createProduct');
        }
      });
    });
  }

  static getProducts() {
    return Config.fetch().then(config => {
      const url = `${config.services.admin}/products`;
      const options = {
        method: 'GET'
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
            throw new Error('GET Product Service Error on getProducts');
        }
      });
    });
  }
}
