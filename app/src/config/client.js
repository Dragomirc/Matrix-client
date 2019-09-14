class ClientConfig {
    static fetch() {
        let services = {
            proxy: "http://localhost:8080",
            xForwardedHost: "'localhost:3000'",
            shop: "http://localhost:3000/api/shop",
            admin: "http://localhost:3000/api/admin",
            auth: "http://localhost:3000/api/auth"
        };

        if (process.env.NODE_ENV === "production") {
            services = {
                proxy: "https://git.heroku.com/matrix-rest.git",
                xForwardedHost: "",
                shop: "https://git.heroku.com/matrix-client.git/api/shop",
                admin: "https://git.heroku.com/matrix-client.git/api/admin",
                auth: "https://git.heroku.com/matrix-client.git/api/auth"
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
