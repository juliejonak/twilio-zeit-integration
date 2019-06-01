// A utility function for redirecting the user to the Twilio Connect authentication and then routing them back to the Zeit Integration upon success.

// When successfully approved, Twilio returns the user back to the Integration with their aliased account SID as a query param. We will parse that information and save it to the Meta Store for future use with Zeit.

const { parse: parseUrl } = require('url');
const cookie = require('cookie');

const { TWILIO_APP_SID } = process.env;

module.exports = (req, res) => {
    const {query} = parseUrl(req.url, true);

    if (!query.next) {
        res.writeHead(403);
        res.end('Query param next is required!');
        return;
    }

    const state = `state_${Math.random()}`;
    const redirectUrl = `https://www.twilio.com/authorize/${TWILIO_APP_SID}`;
    const context = {next: query.next, state};

    res.writeHead(302, {
        Location: redirectUrl,
        'Set-Cookie': cookie.serialize('my-addon-context',
        JSON.stringify(context), {path: '/'})
    });
    res.end('Redirecting...');
}