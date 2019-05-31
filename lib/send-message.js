const twilio = require("twilio");

module.exports = async (sid, auth) => {
  const client = new twilio(sid, auth);
  console.log("client: ", client);

  response = await client.messages.create({
    body: "Sent from Zeit",
    to: "+18328595441",
    from: "+19412567546"
  });
};
