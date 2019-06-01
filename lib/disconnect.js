// Sets up a way for the user to disconnect the Twilio integration

module.exports = (zeitClient, metadata) => {
    delete metadata.userTwilioSID;
    delete metadata.twilioAuth;
    return zeitClient.setMetadata(metadata)
}