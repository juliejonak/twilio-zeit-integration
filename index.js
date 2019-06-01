// The main output of the Zeit Integration - this is where the logic is handled and pulls in elements from /lib and /utils to handle authorization or htm returns.

const { withUiHook } = require('@zeit/integration-utils');
const { TWILIO_AUTH_TOK } = process.env;

// Actions
const disconnect = require('./lib/disconnect');
const sendMsg = require('./lib/send-message');

// Views
const InfoView = require('./views/Info');
const MessageView = require('./views/Message');
const AuthorizeView = require('./views/Authorize');

module.exports = withUiHook(async ({ payload, zeitClient }) => {
    const metadata = await zeitClient.getMetadata();
    const { action, query } = payload;

    try {
        switch (action) {
            case 'disconnect':
                await disconnect(zeitClient, metadata);
                break;
            case 'send-message':
                await sendMsg(metadata.userTwilioSID, metadata.twilioAuth);
                return InfoView(metadata);
        }

        if (query.AccountSid) {
            metadata.userTwilioSID = query.AccountSid;
            metadata.twilioAuth = TWILIO_AUTH_TOK;
            await zeitClient.setMetadata(metadata);

            return MessageView(metadata)
        }

        if (metadata.userTwilioSID && metadata.twilioAuth) {
            await sendMsg(metadata.userTwilioSID, metadata.twilioAuth);
        }

        // if res is error=unauthorized_client, Twilio denied access
        return AuthorizeView(payload);
    } catch (error) {
        console.log('Index.js main catch error: ', error)
    }
});