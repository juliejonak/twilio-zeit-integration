const twilio = require("twilio");

module.exports = messageLogs;

// /**
//  * Uses client's existing SID and Auth Token to fetch SMS logs from Twilio.
//  * @param {metadata} User's Twilio SID and Auth Token from Zeit metastore
//  **/

async function messageLogs(metadata) {
  const client = new twilio(metadata.userTwilioSID, metadata.twilioAuth);
  let messageList = [];
  
  const message = await client.messages.list({limit: 5})
  .then(messages => {
    messages.forEach(m => messageList.push({
          sentTo: m.to,
          message: m.body,
          date: m.dateSent,
          status: m.status
        }))
        return true;
    })

    if (message){
        return messageList
    } else {
        return "Failed to fetch message logs"
    }
}

// { accountSid: 'AC66ece449463a2b0f9e79a0f5f1d17de2',
//     apiVersion: '2010-04-01',
//     body: 'Sent again from Zeit',
//     dateCreated: 2019-06-02T18:41:16.000Z,
//     dateUpdated: 2019-06-02T18:41:16.000Z,
//     dateSent: 2019-06-02T18:41:16.000Z,
//     direction: 'outbound-api',
//     errorCode: null,
//     errorMessage: null,
//     from: '+19412567546',
//     messagingServiceSid: null,
//     numMedia: '0',
//     numSegments: '1',
//     price: -0.0075,
//     priceUnit: 'USD',
//     sid: 'SM6433495df1ec4f239935b63d0c21f9aa',
//     status: 'delivered',
//     subresourceUris: 
//      { media: '/2010-04-01/Accounts/AC66ece449463a2b0f9e79a0f5f1d17de2/Messages/SM6433495df1ec4f239935b63d0c21f9aa/Media.json' },
//     to: '+18328595441',
//     uri: '/2010-04-01/Accounts/AC66ece449463a2b0f9e79a0f5f1d17de2/Messages/SM6433495df1ec4f239935b63d0c21f9aa.json' }