const { withUiHook, htm } = require('@zeit/integration-utils')
const twilio = require('twilio');

const storeInfo = {
    AccountID: '',
    AuthTok: '',
    Phone: '',
    Message: '',
    MessageSent: false
}

messageContainer = `<Container><h3>Not yet sent</h3></Container>`

module.exports = withUiHook(async ({payload}) => {
    const {clientState, action} = payload;

    if (action === 'submit'){
        storeInfo.AccountID = clientState.AccountID;
        storeInfo.AuthTok = clientState.AuthTok;
        storeInfo.Phone = clientState.Phone;
        storeInfo.Message = clientState.Message;

        const client = new twilio(storeInfo.AccountID, storeInfo.AuthTok);

        client.messages.create({
            body: storeInfo.Message,
            to: storeInfo.Phone,
            from: '+19412567546'
          })
          .then((response) => {
            storeInfo.MessageSent = true
          });
    }

    if (storeInfo.MessageSent === true) {
        messageContainer = `<Container><h3>Successfully sent!</h3></Container>`
    }

    return htm`
        <Page>
            <Container>
                <Input label="AccountID" type='password' name="AccountID" value=${storeInfo.AccountID} />
                <Input label="AuthTok" type='password'  name="AuthTok" value=${storeInfo.AuthTok} />
                <Input label="Phone" name="Phone" value=${storeInfo.Phone} />
                <Input label="Message" name="Message" value=${storeInfo.Message} />
            </Container>

            <Container>
                <h4>Account ID: ${storeInfo.AccountID}</h4>
                <h4>Auth: ${storeInfo.AuthTok}</h4>
                <h4>Number: ${storeInfo.Phone}</h4>
                <h4>Message: ${storeInfo.Message}</h4>
            </Container>

            <Container>
                <Button action="submit">Submit</Button>
            </Container>

            ${messageContainer}

        </Page>
    `
});
