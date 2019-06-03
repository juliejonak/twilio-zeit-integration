const { withUiHook } = require("@zeit/integration-utils");

//Actions
const {
  disconnect,
  sendMsg,
  returnWithNav,
  messageLogs,
  callLogs,
  setProjEnvs
} = require("./lib");

//Views
const {
  MessageView,
  EditEnvView,
  CallsView,
  TextsView,
  Disconnected
} = require("./views");

module.exports = withUiHook(async ({ payload, zeitClient }) => {
  const metadata = await zeitClient.getMetadata();
  const { action, clientState, projectId } = payload;

  try {
    switch (action) {
      case "disconnect":
        await disconnect(zeitClient, metadata);
        return returnWithNav(Disconnected)(metadata);

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
        return returnWithNav(EditEnvView)({ metadata, projectId });

      case "set-project-envs":
        if (projectId) {
          await setProjEnvs(metadata, zeitClient, projectId);
        }
        return returnWithNav(EditEnvView)({ metadata, projectId });

      case "clear-envs":
        clientState.userTwilioSID = "";
        clientState.twilioAuth = "";
        metadata.userTwilioSID = "";
        metadata.twilioAuth = "";
        await zeitClient.setMetadata(metadata);
        return returnWithNav(EditEnvView)(metadata);

      case "go-to-message-view":
        return returnWithNav(MessageView)(clientState);

      case "go-to-env-view":
        return returnWithNav(EditEnvView)({ metadata, projectId });

      case "go-to-calls-view":
        const callList = await callLogs(metadata);
        return returnWithNav(CallsView)(callList);

      case "go-to-texts-view":
        const messageList = await messageLogs(metadata);
        return returnWithNav(TextsView)(messageList);

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
