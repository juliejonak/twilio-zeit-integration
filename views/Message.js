module.exports = metadata => `
<Container>
    <P>SID: ${metadata.userTwilioSID}</P>
    <P>Auth: ${metadata.twilioAuth}</P>

    <Button action='send-message'>Send a message</Button>
</Container>
`;
