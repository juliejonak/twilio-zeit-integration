const { htm } = require("@zeit/integration-utils");

module.exports = metadata => htm`
<Page>
    <P>SID: ${metadata.userTwilioSID}</P>
    <P>Auth: ${metadata.twilioAuth}</P>
</Page>
`;
