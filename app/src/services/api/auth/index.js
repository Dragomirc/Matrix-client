import fetch from "fetch-retry";
import Config from "app/config/client";

export default class AuthService {
    static signup(user) {
        return Config.fetch().then(config => {
            const url = `${config.services.auth}/signup`;
            console.log(user);
            const options = {
                method: "POST",
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
}
