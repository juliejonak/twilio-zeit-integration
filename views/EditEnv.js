module.exports = metadata => {
  if (metadata.userTwilioSID && metadata.twilioAuth) {
    return `
    <Box>
      <P>Twilio Authentication Details saved!</P>
    </Box>
    <Box>
        <Input label="Twilio-SID" type="password" name="userTwilioSID" value="${metadata.userTwilioSID ||
          ""}" />
        <Input label="Twilio-Auth" type="password" name="twilioAuth" value="${metadata.twilioAuth ||
          ""}" />
    </Box>
    <Box>
        <Button action="set-envs">Submit</Button>
        <Button action="clear-envs">Reset</Button>
    </Box>
`
  } else {
    return `
    <Box>
      <P>Input your Twilio account SID and Auth Token to be stored with Zeit:</P>
    </Box>
    <Box>
        <Input label="Twilio-SID" type="password" name="userTwilioSID" value="${metadata.userTwilioSID ||
          ""}" />
        <Input label="Twilio-Auth" type="password" name="twilioAuth" value="${metadata.twilioAuth ||
          ""}" />
    </Box>
    <Box>
        <Button action="set-envs">Submit</Button>
        <Button action="clear-envs">Reset</Button>
    </Box>
`
  }
}
