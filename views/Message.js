const { htm } = require("@zeit/integration-utils");

module.exports = metadata => htm`
<Page>
    <P>SID: ${metadata.userTwilioSID}</P>
    <P>Auth: ${metadata.twilioAuth}</P>

    <Button action='send-message'>Send a message</Button>
</Page>
`;
