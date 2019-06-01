const { htm } = require("@zeit/integration-utils");

module.exports = metadata => htm`
    <Container>
        <Input label="Twilio-SID" name="userTwilioSID" value=${metadata.userTwilioSID ||
          ""} />
        <Input label="Twilio-Auth" name="twilioAuth" value=${metadata.twilioAuth ||
          ""} />
    </Container>
    <Container>
        <Button action="set-envs">Submit</Button>
        <Button action="clear-envs">Reset</Button>
    </Container>
`;
