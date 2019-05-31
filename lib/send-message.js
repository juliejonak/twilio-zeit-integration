const twilio = require("twilio");

module.exports = sendMsg;

/**
 * Uses client's existing SID and auth token to send a text with details from input form.
 * @param {sid} User's Twilio SID from Zeit metastore
 * @param {auth} User's Twilio auth token from Zeit metastore
 * @param {details} An object from the input form containing body, to, and from.
 */
async function sendMsg(sid, auth, details) {
  const client = new twilio(sid, auth);
  console.log("SID: ", sid, "\nAUTH: ", auth);
  try {
    response = await client.messages.create({
      body: details.body,
      to: details.to,
      from: details.from
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
