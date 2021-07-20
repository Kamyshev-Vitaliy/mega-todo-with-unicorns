export default class FetchService {

    constructor(baseUrl, baseOptions = {}) {
        this.baseUrl = baseUrl;
        this.baseOptions = baseOptions;
    }

    async checkStatus(response) {
        if (response.status >= 400 && response.status < 600) {
            const error = new Error();
            error.response = (await response.json()).error;
            throw error;
        }
    }

    async get(url, headers) {
        const response = await fetch(this.baseUrl + url, {
            ...this.baseOptions,
            method: "GET",
            headers: {...this.baseOptions.headers, ...headers}
        });
        await this.checkStatus(response)
        return response.json();
    }

    async post(url, data, headers) {
        const response = await fetch(this.baseUrl + url, {
            ...this.baseOptions,
            headers: {...this.baseOptions.headers, ...headers},
            method: 'POST',
            body: JSON.stringify(data)
        });
        await this.checkStatus(response)
        return response.json();
    }

    async delete(url, data, headers) {
        const response = await fetch(this.baseUrl + url, {
            ...this.baseOptions,
            headers: {...this.baseOptions.headers, ...headers},
            method: 'DELETE',
            body: JSON.stringify(data)
        })
        await this.checkStatus(response)
        return response.json();
    }

    async patch(url, data, headers) {
        const response = await fetch(this.baseUrl + url, {
            ...this.baseOptions,
            headers: {...this.baseOptions.headers, ...headers},
            method: 'PATCH',
            body: JSON.stringify(data)
        })
        await this.checkStatus(response)
        return response.json();
    }
}
