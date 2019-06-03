const twilio = require("twilio");

module.exports = messageLogs;

// /**
//  * Uses client's existing SID and Auth Token to fetch call logs from Twilio.
//  * @param {metadata} User's Twilio SID and Auth Token from Zeit metastore
//  **/

async function messageLogs(metadata) {
  const client = new twilio(metadata.userTwilioSID, metadata.twilioAuth);
  let callList = [];
  
  const call = await client.calls.list({limit: 5})
  .then(calls => {
    calls.forEach(c => callList.push({
          called: c.to,
          duration: c.duration,
          date: c.startTime,
          status: c.status
        }))
        return true;
    })

    if (call){
        return callList
    } else {
        return "Failed to fetch call logs"
    }
}