const { withUiHook, htm } = require('@zeit/integration-utils')
const twilio = require('twilio');

const { TWILIO_AUTH_TOK } = process.env;

function sendMessage(sid, auth){
    const client = new twilio(sid, auth);

    try {
        client.messages.create({
            body: 'Sent from Zeit',
            to: '+18328595441',
            from: '+19412567546'
        })
        .then(response => console.log('message res: ', response))
    } catch(err){
        console.log('uh oh: ', err)
    }
}

module.exports = withUiHook(async ({payload, zeitClient}) => {

    const metadata = await zeitClient.getMetadata();
    const {clientState, action, query} = payload;

    if(payload.action === 'disconnect'){
        delete metadata.twilioToken;
        await zeitClient.setMetadata(metadata);
    }

    if(action === 'send-message'){
        console.log('metadata: ', metadata.userTwilioSID, metadata.twilioAuth)
        sendMessage(metadata.userTwilioSID, metadata.twilioAuth);

        return htm`
        <Page>
            <P>SID: ${metadata.userTwilioSID}</P>
            <P>Auth: ${metadata.twilioAuth}</P>
        </Page>
    `
    }

    if (query.AccountSid){
        metadata.userTwilioSID = query.AccountSid
        metadata.twilioAuth = TWILIO_AUTH_TOK
        await zeitClient.setMetadata(metadata);

        return htm`
            <Page>
                <P>SID: ${metadata.userTwilioSID}</P>
                <P>Auth: ${metadata.twilioAuth}</P>

                <Button action='send-message'>Send a message</Button>
            </Page>
        `
    }

    if (metadata.userTwilioSID && metadata.twilioAuth) {
        sendMessage(metadata.userTwilioSID, metadata.twilioAuth);
    }

    // if res is error=unauthorized_client, Twilio declined access

    const connectUrl = `https://zeit-test-integration.juliejonak.now.sh/connect-with-twilio?next=${encodeURIComponent(payload.installationUrl)}`

    return htm`
    <Page>
        <Link href=${connectUrl}>Authorize Twilio</Link>
    </Page>
    `
});


// withUiHook payload looks like:

// payload:  { query: {},
//   action: 'view',
//   clientState: {},
//   token: 'MhQ9oeijaN11Nyf5FfD11bBZ',
//   slug: 'test-form',
//   configurationId: 'icfg_wOPCpRYq5QgV0rNoVAPNaDIa',
//   integrationId: 'oac_i3pobAPVQFqWcYfwbvuPxpv4',
//   teamId: null,
//   user: 
//    { id: 'wpGioM859wMklCzaAuZnGBTi',
//      username: 'juliejonak',
//      email: 'juliejonak10@gmail.com',
//      name: 'Julie Jonak',
//      profiles: [] },
//   team: null,
//   project: null,
//   projectId: null,
//   installationUrl: 'https://zeit.co/dashboard/integrations/icfg_wOPCpRYq5QgV0rNoVAPNaDIa' }