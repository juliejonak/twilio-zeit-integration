const { withUiHook, htm } = require("@zeit/integration-utils");

//Actions
const { disconnect, sendMsg, returnWithNav } = require("./lib");

//Views
const { InfoView, MessageView, EditEnvView, CallsView, TextsView } = require("./views");

module.exports = withUiHook(async ({ payload, zeitClient }) => {
  const metadata = await zeitClient.getMetadata();
  const { action, clientState } = payload;

  try {
    switch (action) {
      case "disconnect":
        await disconnect(zeitClient, metadata);
        return htm`
            <Container>
                <P>You have disconnected Twilio</P>
            <Container
        `
        // break;
      case "send-message":
        await sendMsg(metadata, clientState);
        return returnWithNav(MessageView)(metadata);
        
      case "clear-message":
        clientState.toNumber = "";
        clientState.fromNumber = "";
        clientState.textMessage = "";
        return returnWithNav(MessageView)(metadata);

      case "set-envs":
        metadata.userTwilioSID = clientState.userTwilioSID;
        metadata.twilioAuth = clientState.twilioAuth;
        await zeitClient.setMetadata(metadata);
        return returnWithNav(EditEnvView)(metadata);

      case "clear-envs":
        clientState.userTwilioSID = "";
        clientState.twilioAuth = "";
        metadata.userTwilioSID = "";
        metadata.twilioAuth = "";
        await zeitClient.setMetadata(metadata);
        return returnWithNav(EditEnvView)(metadata)

      case "go-to-message-view":
        return returnWithNav(MessageView)(clientState);

      case "go-to-env-view":
        return returnWithNav(EditEnvView)(metadata);

      case "go-to-calls-view":
        return returnWithNav(CallsView)(metadata)

      case "go-to-texts-view":
        return returnWithNav(TextsView)(metadata)

      default:
        if (metadata.userTwilioSID && metadata.twilioAuth) {
          return returnWithNav(MessageView)(metadata);
        } else {
          return returnWithNav(EditEnvView)(metadata);
        }
    }
  } catch (error) {
    console.log(error);
  }
});


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

// "routes": [
//     {
//       "src": "/connect-with-twilio",
//       "dest": "utils/connect-with-twilio.js"
//     }
//   ],
