const { withUiHook, htm } = require('@zeit/integration-utils')
const twilio = require('twilio');

const { TWILIO_SID, TWILIO_AUTH_TOK } = process.env;


const storeInfo = {
    Phone: '',
    Message: '',
    MessageSent: false
}

messageContainer = `<Container><h3>Not yet sent</h3></Container>`

module.exports = withUiHook(async ({payload, zeitClient}) => {
    const twilioAuth = await zeitClient.getMetadata();
    const {clientState, action} = payload;
    // const client = new twilio(`${TWILIO_SID}`, `${TWILIO_AUTH_TOK}`);

    if (action === 'set'){
        twilioAuth.AccountID = clientState.AccountID;
        twilioAuth.AuthTok = clientState.AuthTok;
        await zeitClient.setMetadata(twilioAuth)

        storeInfo.Phone = clientState.Phone;
        storeInfo.Message = clientState.Message;
        storeInfo.MessageSent = true;
    }

    if (action === 'send'){
        client.messages.create({
            body: `${storeInfo.Message}`,
            to: `${storeInfo.Phone}`,
            from: '+19412567546' // Change this to user's Twilio phone number
          })
          .then((response) => {
            console.log(response)
            storeInfo.MessageSent = true
          });
    }

    if (storeInfo.MessageSent === true) {
        messageContainer = `<Container><h3>Successfully sent!</h3></Container>`
    }

    // if res is error=unauthorized_client, Twilio declined access

    return htm`
        <Page>
            <Link href="https://www.twilio.com/authorize/CNe6cf47e469390206f80becb70d94774f">Authorize Twilio</Link>
        </Page>
    `
});
