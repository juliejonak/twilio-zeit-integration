const twilio = require("twilio");

module.exports = messageLogs;

/**
 * Uses client's existing SID and Auth Token to fetch call logs from Twilio.
 * @param {metadata} User's Twilio SID and Auth Token from Zeit metastore
 **/

async function messageLogs(metadata) {
  const client = new twilio(metadata.userTwilioSID, metadata.twilioAuth);
  let callList = [];
  
  const call = await client.calls.list({limit: 5})
  .then(calls => {
    calls.forEach(c => callList.push({
          to: c.to,
          from: c.from,
          duration: c.duration,
          date: c.startTime,
          direction: c.direction,
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

// { accountSid: 'AC66ece449463a2b0f9e79a0f5f1d17de2',
//     annotation: null,
//     answeredBy: null,
//     apiVersion: '2010-04-01',
//     callerName: '',
//     dateCreated: 2019-05-03T23:05:53.000Z,
//     dateUpdated: 2019-05-03T23:06:07.000Z,
//     direction: 'outbound-api',
//     duration: '10',
//     endTime: 2019-05-03T23:06:07.000Z,
//     forwardedFrom: null,
//     from: '+19412567546',
//     fromFormatted: '(941) 256-7546',
//     groupSid: null,
//     parentCallSid: null,
//     phoneNumberSid: 'PN057ca270e55765ba3e54d605198c93b6',
//     price: -0.013,
//     priceUnit: 'USD',
//     sid: 'CAe5cd3170577744c775007f86e8d21069',
//     startTime: 2019-05-03T23:05:57.000Z,
//     status: 'completed',
//     subresourceUris: 
//      { notifications: '/2010-04-01/Accounts/AC66ece449463a2b0f9e79a0f5f1d17de2/Calls/CAe5cd3170577744c775007f86e8d21069/Notifications.json',
//        recordings: '/2010-04-01/Accounts/AC66ece449463a2b0f9e79a0f5f1d17de2/Calls/CAe5cd3170577744c775007f86e8d21069/Recordings.json' },
//     to: '+18328595441',
//     toFormatted: '(832) 859-5441',
//     uri: '/2010-04-01/Accounts/AC66ece449463a2b0f9e79a0f5f1d17de2/Calls/CAe5cd3170577744c775007f86e8d21069.json' 