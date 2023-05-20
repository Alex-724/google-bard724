const google_bard724 = require('./index.js'); // replace with 'google-bard724' if you installed it from npm

const bard = new google_bard724('bardcookie'); // replace bardcookie with your bardcookie

bard.ask('What is the meaning of life?').then(console.log); // replace with your question


// save chats
const Bard = new google_bard724('bardcookie', {
    saveChats: true,
    saveChatsPath: './chats.json',
    saveChatsLimit: 6
}); // replace bardcookie with your bardcookie
async function test() {
    await Bard.ask('What is the meaning of life?', 'USER#0000').then(console.log); // replace with your question
    await Bard.ask('My name is Alex.', 'USER#0000').then(console.log); // replace with your question
    await Bard.ask('What is my name?', 'USER#0000').then(console.log); // replace with your question
    await Bard.ask('hi bard', 'USER#0000').then(console.log); // replace with your question
}
test()