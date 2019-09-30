class ClientConfig {
    static fetch() {
        let services = {
            proxy: "http://localhost:8080",
            xForwardedHost: "",
            shop: "http://localhost:3000/api/shop",
            admin: "http://localhost:3000/api/admin",
            auth: "http://localhost:3000/api/auth",
            imageUpload: "http://localhost:3000/api/image"
        };

        if (process.env.NODE_ENV === "production") {
            services = {
                proxy: "https://matrix-rest.herokuapp.com",
                xForwardedHost: "matrix-client.herokuapp.com",
                shop: "https://matrix-client.herokuapp.com/api/shop",
                admin: "https://matrix-client.herokuapp.com/api/admin",
                auth: "https://matrix-client.herokuapp.com/api/auth",
                imageUpload: "https://matrix-client.herokuapp.com/api/image"
            };
        }
        return new Promise(resolve => {
            const config = {
                services
            };
            resolve(config);
        });
    }
}

export default ClientConfig;
