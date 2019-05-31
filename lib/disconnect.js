module.exports = disconnect;

/**
 *
 * @param {zeitClient} The zeitClient object for the user from withUIHook
 * @param {metadata} The user's metadata store from zeitClient
 */
function disconnect(zeitClient, metadata) {
  delete metadata.userTwilioSID;
  delete metadata.twilioAuth;
  return zeitClient.setMetadata(metadata);
}
