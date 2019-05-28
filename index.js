const { withUiHook, htm } = require('@zeit/integration-utils')
const twilio = require('twilio');

const client = new twilio(store.AccountID, store.AuthTok);

const store = {
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
        store.AccountID = clientState.AccountID;
        store.AuthTok = clientState.AuthTok;
        store.Phone = clientState.Phone;
        store.Message = clientState.Message;

        client.messages.create({
            body: store.Message,
            to: store.Phone,
            from: '+19412567546'
          })
          .then((response) => {
            store.MessageSent = true
          });
    }

    if (store.MessageSent === true) {
        messageContainer = `<Container><h3>Successfully sent!</h3></Container>`
    }

    return htm`
        <Page>
            <Container>
                <Input label="AccountID" type='password' name="AccountID" value=${store.AccountID} />
                <Input label="AuthTok" type='password'  name="AuthTok" value=${store.AuthTok} />
                <Input label="Phone" name="Phone" value=${store.Phone} />
                <Input label="Message" name="Message" value=${store.Message} />
            </Container>

            <Container>
                <Button action="submit">Submit</Button>
            </Container>

            ${messageContainer}

        </Page>
    `
});
