module.exports = (zeitClient, metadata) => {
    delete metadata.userTwilioSID;
    delete metadata.twilioAuth;
    return zeitClient.setMetadata(metadata);
  };
  