const { parse: parseUrl } = require('url');
const cookie = require('cookie');

const { TWILIO_APP_SID } = process.env;

module.exports = (req, res) => {
    const {query} = parseUrl(req.url, true);
    if (!query.next) {
        res.writeHead(403);
        res.end('Query param next is required');
        return;
    }

    const state = `state_${Math.random()}`;
    const redirectUrl = `https://www.twilio.com/authorize/${TWILIO_APP_SID}`
    const context = {next: query.next, state};

    res.writeHead(302, {
        Location: redirectUrl,
        'Set-Cookie': cookie.serialize('my-addon-context', JSON.stringify(context), {path: '/'})
    });
    res.end('Redirecting...');

    // When successfully approved, Twilio returns the user back to the specified redirect URL with their account SID as a query param - we need to pull that out and add it to the metadata store on Zeit ( const Twilio_Acct_SID = req.query.AccountSid)

    // https://zeit.co/oauth/authorize?AccountSid=SOMENUMBER

    // Make Twilio requests with the user's SID and my own Twilio Auth Token

    // Had to set the Twilio Connect app authorize URL to the installation url on the zeit withUiHook payload for it to redirect back properly:

    // installationUrl: 'https://zeit.co/dashboard/integrations/icfg_wOPCpRYq5QgV0rNoVAPNaDIa' 

}