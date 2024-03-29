const format = require('date-fns/format');

module.exports = callList => {

    let contents = '';

    callList.forEach(m => {
        contents = contents + `<Fieldset display="flex">

            <Box display="flex" marginTop="1em">
                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>To:</B></Box>
                    <Box><P>(${m.to.slice(2,5)})-${m.to.slice(5,8)}-${m.to.slice(8,12)}</P></Box>
                </Box>

                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>From:</B></Box>
                    <Box><P>(${m.from.slice(2,5)})-${m.from.slice(5,8)}-${m.from.slice(8,12)}</P></Box>
                </Box>
            </Box>

            <Box display="flex">
                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>Duration:</B></Box>
                    <Box><P>${m.duration} seconds</P></Box>
                </Box>

                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>Date:</B></Box>
                    <Box><P>${format(m.date, 'ddd MMMM D YYYY [at] H[:]mm A')}</P></Box>
                </Box>
            </Box>

            <Box display="flex" marginBottom="1em">
                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>Call Direction:</B></Box>
                    <Box><P>${m.direction} seconds</P></Box>
                </Box>
                
                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                   <Box marginRight="1em"><B>Status:</B></Box>
                   <Box><P>${m.status.charAt(0).toUpperCase() + m.status.slice(1)}</P></Box>
                </Box>
            </Box>
        </Fieldset>`
    })

    return `
        <Container>
            <H2>Call Logs</H2>
            ${contents}
        </Container>
    `
}