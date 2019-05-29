const { withUiHook, htm } = require('@zeit/integration-utils')
const twilio = require('twilio');

const storeInfo = {
    Phone: '',
    Message: '',
    MessageSent: false
}

messageContainer = `<Container><h3>Not yet sent</h3></Container>`

module.exports = withUiHook(async ({payload, zeitClient}) => {
    const twilioAuth = await zeitClient.getMetadata();
    const {clientState, action} = payload;
    const client = new twilio(twilioAuth.AccountID, twilioAuth.AuthTok);

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
            from: '+19412567546'
          })
          .then((response) => {
            console.log(response)
            storeInfo.MessageSent = true
          });
    }

    if (storeInfo.MessageSent === true) {
        messageContainer = `<Container><h3>Successfully sent!</h3></Container>`
    }

    return htm`
        <Page>
            <Container>
                <Input label="AccountID" type='password' name="AccountID" value=${twilioAuth.AccountID || ''} />
                <Input label="AuthTok" type='password'  name="AuthTok" value=${twilioAuth.AuthTok || ''} />
            </Container>

            <Container>
                <Input label="Phone" name="Phone" value=${storeInfo.Phone} />
                <Input label="Message" name="Message" value=${storeInfo.Message} />
            </Container>

            <Container>
                <P>Account ID: ${twilioAuth.AccountID}</P>
                <P>Auth: ${twilioAuth.AuthTok}</P>
                <P>Number: ${storeInfo.Phone}</P>
                <P>Message: ${storeInfo.Message}</P>
            </Container>

            <Container>
                <Button action="set">Set</Button>
                <Button action="send">Send!</Button>
            </Container>

            ${messageContainer}

        </Page>
    `
});
