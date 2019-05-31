const twilio = require("twilio");

module.exports = async (sid, auth) => {
  const client = new twilio(sid, auth);
  console.log("SID: ", sid, "\nAUTH: ", auth);
  try {
    response = await client.messages.create({
      body: "Sent from Zeit",
      to: "+17042231591",
      from: "+17047035909"
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
