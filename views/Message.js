module.exports = clientState => `
    <Box>
        <Input label="To Number" name="toNumber" value="${clientState.toNumber ||
          ""}" />
        <Input label="From Number" name="fromNumber" value="${clientState.fromNumber ||
          ""}" />
        <Input label="Message" name="textMessage" value="${clientState.textMessage ||
          ""}" />
    </Box>
    <Box>
        <Button action="send-message">Submit</Button>
        <Button action="clear-message">Reset</Button>
    </Box>
`;
