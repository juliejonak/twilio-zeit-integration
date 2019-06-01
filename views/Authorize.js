// The authorize button returned when a user needs to initially connect to Twilio

const { htm } = require('@zeit/integration-utils');

module.exports = payload => {
    const connectUrl = `https://twilio-zeit-integration.juliejonak.now.sh/connect-with-twilio?next=${encodeURIComponent(payload.installationUrl)}`

    return htm`
        <Page>
            <Button>
                <Link href=${connectUrl}>Authorize Twilio</Link>
            </Button>
        </Page>
    `;
};
