const { ImapFlow } = require('imapflow');
const { GMAIL_IMAP_SERVER,GMAIL_IMAP_PORT,GMAIL_IMAP_SECURE } = require('../config');

const client = new ImapFlow({
    host: GMAIL_IMAP_SERVER,
    port: GMAIL_IMAP_PORT,
    secure: GMAIL_IMAP_SECURE,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});


async function getGmailMessages(){
    await client.connect();

    lock = await client.getMailboxLock('INBOX');
    try {
                    
        let message = await client.fetchOne(client.mailbox.exists, { source: true });
        console.log(message.source.toString());

        for await (let message of client.fetch('1:*', { envelope: true })) {
            console.log(`${message.uid}: ${message.envelope.subject}`);
        }
    } finally {
        lock.release();

    }
    await client.logout();

}

module.exports = { getGmailMessages }
