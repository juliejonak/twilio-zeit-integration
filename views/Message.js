module.exports = clientState => `
    <Box>
      <P>To test if your credentials are working, use a number from your Twilio account to send a test message below. Check the View Texts logs to see if it was successful.</P>
    </Box>
    
    <Box>
        <Input label="To Number" name="toNumber" value="${clientState.toNumber ||
          ""}" />
        <Input label="From Number" name="fromNumber" value="${clientState.fromNumber ||
          ""}" />
        <Input label="Message" name="textMessage" value="${clientState.textMessage ||
          ""}" />
    </Box>
    <Box marginTop="25px">
        <Button small action="send-message">Submit</Button>
        <Button small action="clear-message">Reset</Button>
    </Box>
`;
