// Used to test sending a message with the established credentials to ensure the Twilio integration works

// sid is the user's Twilio account SID; auth is the user's Twilio auth token

// In the client.messages.create, the TO number is the number the message is being sent to, and the FROM number is the Twilio SMS enabled number on the user's account. Be sure that both numbers begin with +1 and contain no dashes

const twilio = require('twilio');

module.exports = async (sid, auth) => {
    const client = new twilio(sid, auth);
    console.log('SID: ', sid, '\nAUTH: ', auth);

    try{
        response = await client.messages.create({
            body: 'Sent from Zeit',
            to: '+17042231591',
            from: '+19412567546'
        });
        console.log('Twilio message send try response: ', response);
    } catch (error) {
        console.log('Twilio message send catch error: ', error)
    }
}