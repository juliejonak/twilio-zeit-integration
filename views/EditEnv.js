module.exports = metadata => {
  if (metadata.userTwilioSID && metadata.twilioAuth) {
    return `
    <Box>
      <Notice type="success">Twilio Authentication Details saved!</Notice>
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
      <Notice type='error'>Input your Twilio Account SID and Auth Token to be stored with Zeit:</Notice>
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
