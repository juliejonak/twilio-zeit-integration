// An element that returns the metadata saved SID and Auth, plus a button with which to test sending a message from that user's Twilio account

const { htm } = require('@zeit/integration-utils');

module.exports = metadata => htm`
    <Page>
        <P>SID: ${metadata.userTwilioSID}</P>
        <P>Auth Token: ${metadata.twilioAuth}</P>

        <Button action='send-message'>Send a message!</Button>
    </Page>
`;
