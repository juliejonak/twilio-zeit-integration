const format = require('date-fns/format');

module.exports = messageList => {

    let contents = '';

    messageList.forEach(m => {
        contents = contents + `<Fieldset display="flex">
            <Box display="flex" marginTop="1em" marginBottom="1em">

                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <B>Sent to:</B><P>${m.sentTo}</P>
                </Box>

                <Box display="flex" alignItems="baseline" width="75%">
                    <B>Message:</B><P>${m.message}</P>
                </Box>
            </Box>

            <Box display="flex">

                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <B>Date:</B><P>${format(m.date, 'ddd MMMM D YYYY [at] H[:]mm A')}</P>
                </Box>
                
                <Box display="flex" alignItems="baseline" >
                    <B>Status:</B><P>${m.status}</P>
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