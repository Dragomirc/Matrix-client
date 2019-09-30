import fetch from "fetch-retry";
import Config from "app/config/client";

export default class ImageUploadService {
    static getPresignedUrl() {
        return Config.fetch().then(config => {
            const url = `${config.services.imageUpload}/presigned-url`;
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
                            "Product Service Error getPresigneUrl()"
                        );
                }
            });
        });
    }

    static uploadImageToS3(presignedUrl, file) {
        const options = {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type
            }
        };
        return fetch(presignedUrl, options).then(res => {
            const statusCode = res.status;
            switch (statusCode) {
                case 200:
                    return res;
                case 500:
                    throw new Error(res.message);
                default:
                    throw new Error("Product Service Error getPresigneUrl()");
            }
        });
    }
}
