const twilio = require("twilio");

module.exports = sendMsg;

/**
 * Uses client's existing SID and auth token to send a text with details from input form.
 * If there are no details, will return a string instructing to provide.
 * @param {sid} User's Twilio SID from Zeit metastore
 * @param {auth} User's Twilio auth token from Zeit metastore
 * @param {details} An object from the input form containing body, to, and from.
 */
async function sendMsg(sid, auth, details) {
  const client = new twilio(sid, auth);
  if (details) {
    try {
      await client.messages.create({
        body: details.body,
        to: details.to,
        from: details.from
      });
      return "Message successful.";
    } catch (error) {
      console.log(error);
      return "There was an error sending your message.";
    }
  } else {
    return "Please fill out all pieces of the form.";
  }
}
