module.exports = metadata => `
    <Box>
        <Input label="Twilio-SID" name="userTwilioSID" value="${metadata.userTwilioSID ||
          ""}" />
        <Input label="Twilio-Auth" name="twilioAuth" value="${metadata.twilioAuth ||
          ""}" />
    </Box>
    <Box>
        <Button action="set-envs">Submit</Button>
        <Button action="clear-envs">Reset</Button>
    </Box>
`;
