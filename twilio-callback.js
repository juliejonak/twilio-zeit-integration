const { withUiHook, htm } = require('@zeit/integration-utils')
const { parse: parseUrl } = require('url');
const cookie = require('cookie');

function send(res, statusCode, content) {
    res.writeHead(statusCode);
    res.end(content)
}

module.exports = (req, res) => {
    res.writeHead(302, {
        Location: 'https://zeit-test-integration.juliejonak.now.sh/',
        'Set-Cookie': cookie.serialize('my-addon-context', '', { path: '/' })
    })

    res.end('Redirecting...')
}