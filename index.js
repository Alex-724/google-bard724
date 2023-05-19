const axios = require('axios');

class Api {
    constructor(bardcokie) {
        this.bardcookie = bardcokie;
        if (!this.bardcookie) throw new Error('No bardcookie provided');
        this.api = axios.create({
            baseURL: 'https://bard-api.alex-724.repl.co'
        });
    }
    async ask(question) {
        const response = await this.api.get(`/?question=${question}&bardcookie=${this.bardcookie}`);
        return response.data;
    }
}

module.exports = Api;