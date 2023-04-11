require('dotenv').config()
const { getGmailMessages } = require('./email/gmail');
(async () => { 
    await getGmailMessages();
})()

console.log("Hello from index.js");
console.log(process.env.GMAIL_USER);
