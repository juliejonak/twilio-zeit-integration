const { withUiHook, htm } = require("@zeit/integration-utils");
const { TWILIO_AUTH_TOK } = process.env;

//Actions
const disconnect = require("./lib/disconnect");
const sendMsg = require("./lib/send-message");

//Views
const InfoView = require("./views/Info");
const MessageView = require("./views/Message");
const AuthorizeView = require("./views/Authorize");

module.exports = withUiHook(
  async ({ payload: { action, query }, zeitClient }) => {
    const metadata = await zeitClient.getMetadata();

    switch (action) {
      case "disconnect":
        await disconnect(zeitClient, metadata);
        break;
      case "send-message":
        htmResp = await sendMsg(metadata.userTwilioSID, metadata.twilioAuth);
        return InfoView(metadata);
    }

    if (query.AccountSid) {
      metadata.userTwilioSID = query.AccountSid;
      metadata.twilioAuth = TWILIO_AUTH_TOK;
      await zeitClient.setMetadata(metadata);

      return MessageView(metadata);
    }

    if (metadata.userTwilioSID && metadata.twilioAuth) {
      await sendMsg(metadata.userTwilioSID, metadata.twilioAuth);
    }

    // if res is error=unauthorized_client, Twilio declined access
    return AuthorizeView();
  }
);

// withUiHook payload looks like:

// payload:  { query: {},
//   action: 'view',
//   clientState: {},
//   token: 'MhQ9oeijaN11Nyf5FfD11bBZ',
//   slug: 'test-form',
//   configurationId: 'icfg_wOPCpRYq5QgV0rNoVAPNaDIa',
//   integrationId: 'oac_i3pobAPVQFqWcYfwbvuPxpv4',
//   teamId: null,
//   user:
//    { id: 'wpGioM859wMklCzaAuZnGBTi',
//      username: 'juliejonak',
//      email: 'juliejonak10@gmail.com',
//      name: 'Julie Jonak',
//      profiles: [] },
//   team: null,
//   project: null,
//   projectId: null,
//   installationUrl: 'https://zeit.co/dashboard/integrations/icfg_wOPCpRYq5QgV0rNoVAPNaDIa' }

//   if (action === "disconnect") {
//     await disconnect(zeitClient, metadata);
//   }

//   if (action === "send-message") {
//     console.log("metadata: ", metadata.userTwilioSID, metadata.twilioAuth);
//     response = await sendMsg(metadata.userTwilioSID, metadata.twilioAuth);

//     return htm`
//         <Page>
//             <P>SID: ${metadata.userTwilioSID}</P>
//             <P>Auth: ${metadata.twilioAuth}</P>
//         </Page>
//     `;
//   }
