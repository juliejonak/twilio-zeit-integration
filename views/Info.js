// An element that returns the metadata once successfully stored to the meta store to ensure it matches the expected result

const { htm } = require('@zeit/integration-utils');

module.exports = metadata => htm`
    <Page>
        <P>Saved SID: ${metadata.userTwilioSID}</P>
        <P>Saved Auth Token: ${metadata.twilioAuth}</P>
    </Page>
`;
