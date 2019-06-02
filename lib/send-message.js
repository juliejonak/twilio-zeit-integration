const twilio = require("twilio");

module.exports = sendMsg;

// /**
//  * Uses client's existing SID and auth token to send a text with details from input form.
//  * If there are no details, will return a string instructing to provide.
//  * @param {metadata} User's Twilio SID and Auth Token from Zeit metastore
//  * @param {details} An object from the input form containing body, to, and from.
//  **/

async function sendMsg(metadata, details) {
  const client = new twilio(metadata.userTwilioSID, metadata.twilioAuth);
  return await client.messages.create({
    body: details.textMessage,
    to: details.toNumber,
    from: details.fromNumber
  });
}
