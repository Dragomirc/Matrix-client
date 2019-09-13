import fetch from "fetch-retry";
import Config from "app/config/client";

export default class AuthService {
    static signup(user) {
        return Config.fetch().then(config => {
            const url = `${config.services.auth}/signup`;
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
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
                        throw new Error("POST Auth Service Error on signup");
                }
            });
        });
    }

    static login(user) {
        return Config.fetch().then(config => {
            const url = `${config.services.auth}/login`;
            const options = {
                credentials: "same-origin",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
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
                        throw new Error("POST Auth Service Error on login");
                }
            });
        });
    }

    static checkAuthState(token) {
        return Config.fetch().then(config => {
            const url = `${config.services.auth}/user-details`;
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 200:
                        return res;
                    case 401:
                        throw new Error(res.message);
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error(
                            "POST Auth Service Error on checkAuthState()"
                        );
                }
            });
        });
    }
}
