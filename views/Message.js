module.exports = clientState => `
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
