const axios = require('axios');
const fs = require('fs');
class Api {
    constructor(bardcokie, options) {
        this.bardcookie = bardcokie;
        if (!this.bardcookie) throw new Error('No bardcookie provided');
        if (!options) options = {};
        this.options = {
            saveChats: options.saveChats || false,
            saveChatsPath: options.saveChatsPath || './chats.json',
            saveChatsLimit: options.saveChatLimit || 6
        };
        this.api = axios.create({
            baseURL: 'https://bard-api.alex-724.repl.co'
        });
    }
    async ask(question, chatId) {
        if (!question) throw new Error('No question provided');
        if (this.options.saveChats && chatId) {
            await this.checkLimit(chatId);
            await this.saveChat(chatId, question, 'user');
            let data = await this.getChat(chatId);
            if (data.length > 1) {
                question = '';
                for (let i = 0; i < data.length; i++) {
                    question += `${data[i].type} : ${data[i].text}\n`;
                }
            }
        }
        let response = await this.api.get(`/?question=${question}&bardcookie=${this.bardcookie}`);
        console.log(response.data);
        if (response.data.error) throw new Error(response.data.message);
        if (response.data.startsWith('Bard: ')) response.data = response.data.slice(6);
        if (this.options.saveChats && chatId) await this.saveChat(chatId, response.data, 'Bard');
        return response.data;
    }
    async getChats() {
        return require(this.options.saveChatsPath);
    }
    async saveChat(chatId, text, type = 'user') {
        if (!this.options.saveChats) return;
        if (!chatId) throw new Error('No chatId provided');
        if (!text) throw new Error('No text provided');
        this.addChat(chatId, text, type);
    }
    async addChat(chatId, text, type) {
        let chats = await this.getChats();
        if (!chats[chatId]) chats[chatId] = [];
        chats[chatId].push({ text: text, type: type });
        this.save(chats);
    }
    async save(obj) {
        fs.writeFileSync(this.options.saveChatsPath, JSON.stringify(obj));
    }
    async getChat(chatId) {
        if (!chatId) throw new Error('No chatId provided');
        let chats = await this.getChats();
        if (!chats[chatId]) return [];
        return chats[chatId];
    }
    async checkLimit(chatId) {
        if (!chatId) throw new Error('No chatId provided');
        let chats = await this.getChats();
        if (!chats[chatId]) return false;
        // remove first 2 elements
        if (chats[chatId].length >= this.options.saveChatsLimit - 2) {
            chats[chatId].shift();
            chats[chatId].shift();
            this.save(chats);
            return true;
        }
    }
}

module.exports = Api;