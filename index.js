const { withUiHook, htm } = require('@zeit/integration-utils')

const store = {
    AID: '',
    AuthTok: '',
    Phone: '',
    Message: ''
}

module.exports = withUiHook(async ({payload}) => {
    const {clientState, action} = payload;

    if (action === 'submit'){
        store.AID = clientState.AID;
        store.AuthTok = clientState.AuthTok;
        store.Phone = clientState.Phone;
        store.Message = clientState.Message;
    }

    return htm`
        <Page>
            <Container>
                <Input label="AID" name="AID" value=${store.AID} />
                <Input label="AuthTok" name="AuthTok" value=${store.AuthTok} />
                <Input label="Phone" name="Phone" value=${store.Phone} />
                <Input label="Message" name="Message" value=${store.Message} />
            </Container>

            <Container>
                <Button action="submit">Submit</Button>
            </Container>
        </Page>
    `
});
