const format = require('date-fns/format');

module.exports = messageList => {

    let contents = '';

    messageList.forEach(m => {
        contents = contents + `<Fieldset display="flex">
            <Box display="flex" marginTop="1em" marginBottom="1em">

                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>Sent to:</B></Box>
                    <Box><P>${m.sentTo}</P></Box>
                </Box>

                <Box display="flex" alignItems="baseline" width="75%">
                    <Box marginRight="1em"><B>Message:</B></Box>
                    <Box><P>${m.message}</P></Box>
                </Box>
            </Box>

            <Box display="flex">

                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>Date:</B></Box>
                    <Box><P>${format(m.date, 'ddd MMMM D YYYY [at] H[:]mm A')}</P></Box>
                </Box>
                
                <Box display="flex" alignItems="baseline" >
                   <Box marginRight="1em"><B>Status:</B></Box>
                   <Box><P>${m.status.charAt(0).toUpperCase() + m.status.slice(1)}</P></Box>
                </Box>
            </Box>
        </Fieldset>`
    })

    return `
        <Container>
            <H2>Message Logs</H2>
            ${contents}
        </Container>
    `
}