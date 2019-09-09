class ClientConfig {
    static fetch() {
        return new Promise(resolve => {
            const config = {
                services: {
                    shop: "http://localhost:3000/api/shop",
                    admin: "http://localhost:3000/api/admin",
                    auth: "http://localhost:3000/api/auth"
                }
            };
            resolve(config);
        });
    }
}

export default ClientConfig;
