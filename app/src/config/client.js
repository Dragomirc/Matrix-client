class ClientConfig {
    static fetch() {
        return new Promise(resolve => {
            const config = {
                services: {
                    shop: "http://localhost:8080/shop",
                    admin: "http://localhost:8080/admin",
                    auth: "http://localhost:8080/auth"
                }
            };
            resolve(config);
        });
    }
}

export default ClientConfig;
