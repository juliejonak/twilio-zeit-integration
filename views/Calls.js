const format = require('date-fns/format');

module.exports = callList => {

    let contents = '';

    callList.forEach(m => {
        contents = contents + `<Fieldset display="flex">
            <Box display="flex" marginTop="1em" marginBottom="1em">

                <Box display="flex" alignItems="baseline" marginRight="4em" marginLeft="1em">
                    <Box marginRight="1em"><B>Called:</B></Box>
                    <Box><P>${m.called.slice(2,5)}-${m.called.slice(5,8)}-${m.called.slice(8,12)}</P></Box>
                </Box>

                <Box display="flex" alignItems="baseline" width="75%">
                    <Box marginRight="1em"><B>Duration:</B></Box>
                    <Box><P>${m.duration}</P></Box>
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
            <H2>Call Logs</H2>
            ${contents}
        </Container>
    `
}