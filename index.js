const { withUiHook } = require("@zeit/integration-utils");

//Actions
const { disconnect, sendMsg, returnWithNav } = require("./lib");

//Views
const { InfoView, MessageView, EditEnv } = require("./views");

module.exports = withUiHook(async ({ payload, zeitClient }) => {
  const metadata = await zeitClient.getMetadata();
  const { action, clientState } = payload;

  try {
    // switch (action) {
    //   case "disconnect":
    //     await disconnect(zeitClient, metadata);
    //     break;
    //   case "send-message":
    //     await sendMsg(metadata.userTwilioSID, metadata.twilioAuth);
    //     break;
    //   case "set-envs":
    //     metadata.userTwilioSID = clientState.userTwilioSID;
    //     metadata.twilioAuth = clientState.twilioAuth;
    //     await zeitClient.setMetadata(metadata);
    //     break;
    //   case "clear-envs":
    //     clientState.userTwilioSID = "";
    //     clientState.twilioAuth = "";
    //     metadata.userTwilioSID = "";
    //     metadata.twilioAuth = "";
    //     await zeitClient.setMetadata(metadata);
    //     break;
    //   case "go-to-message-view":
    //     return returnWithNav(MessageView)({ metadata });
    //   case "go-to-env-view":
    //     return EditEnv({ metadata });
    //   case "go-to-calls-view":
    //     break;
    //   case "go-to-texts-view":
    //     break;
    //   default:
    //     return EditEnv({ metadata });
    // }

    return EditEnv(metadata);
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
