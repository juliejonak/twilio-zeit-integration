module.exports = ({ metadata, projectId }) => {
  const sid = metadata.userTwilioSID;
  const auth = metadata.twilioAuth;

  if (sid && auth) {
    return `
    <ProjectSwitcher />
    <Box>
      <Notice type="success">Twilio Authentication Details saved!</Notice>
    </Box>
    <Box>
        <Input label="Twilio-SID" type="password" name="userTwilioSID" value="${sid ||
          ""}" />
        <Input label="Twilio-Auth" type="password" name="twilioAuth" value="${auth ||
          ""}" />
    </Box>
    <Box marginTop="25px">
        <Button small action="set-envs">Submit</Button>
        <Button small action="clear-envs">Reset</Button>
        <Button small action="set-project-envs" disabled="${!projectId}">${
      projectId ? "Set To Project" : "Pick A Project"
    }</Button>
    </Box>
`;
  } else {
    return `
    <ProjectSwitcher />
    <Box>
      <Notice type='error'>Input your Twilio Account SID and Auth Token to be stored with Zeit:</Notice>
    </Box>
    <Box>
        <Input label="Twilio-SID" type="password" name="userTwilioSID" value="" />
        <Input label="Twilio-Auth" type="password" name="twilioAuth" value="" />
    </Box>
    <Box marginTop="25px">
        <Button small action="set-envs">Submit</Button>
        <Button small action="clear-envs">Reset</Button>
    </Box>
`;
  }
};
