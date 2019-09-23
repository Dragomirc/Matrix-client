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
                // credentials: "same-origin",
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

    static logout() {
        return Config.fetch().then(config => {
            const url = `${config.services.auth}/logout`;
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
                        throw new Error("GET Auth Service Error on logout()");
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

    static resetPassword(email) {
        return Config.fetch().then(config => {
            const url = `${config.services.auth}/reset-password`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            };

            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 200:
                        return res;
                    case 404:
                        throw new Error(res.message);
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error(
                            "POST Auth Service Error on resetPassword(email)"
                        );
                }
            });
        });
    }

    static setNewPassword(body) {
        return Config.fetch().then(config => {
            const url = `${config.services.auth}/new-password`;
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            };
            return fetch(url, options).then(async response => {
                const statusCode = response.status;
                const res = await response.json();
                switch (statusCode) {
                    case 200:
                        return res;
                    case 422:
                        throw new Error(res.message);
                    case 500:
                        throw new Error(res.message);
                    default:
                        throw new Error(
                            "POST Auth Service Error on setNewPassword(body)"
                        );
                }
            });
        });
    }
}
