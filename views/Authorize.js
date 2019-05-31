const { htm } = require("@zeit/integration-utils");

module.exports = () => {
  const connectUrl = `https://zeit-test-integration.brandongardner2.now.sh/connect-with-twilio?next=${encodeURIComponent(
    payload.installationUrl
  )}`;

  return htm`
      <Page>
          <Link href=${connectUrl}>Authorize Twilio</Link>
      </Page>
      `;
};
