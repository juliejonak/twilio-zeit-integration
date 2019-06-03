module.exports = setProjEnv;

async function setProjEnv(metadata, zeitClient, projectId) {
  const TWILIO_ACCOUNT_SID = metadata.userTwilioSID;
  const TWILIO_ACCOUNT_AUTH = metadata.twilioAuth;

  const secretOne = await zeitClient.ensureSecret(
    "TWILIO_ACCOUNT_SID",
    TWILIO_ACCOUNT_SID
  );
  const secretTwo = await zeitClient.ensureSecret(
    "TWILIO_ACCOUNT_AUTH",
    TWILIO_ACCOUNT_AUTH
  );
  await zeitClient.upsertEnv(projectId, "TWILIO_ACCOUNT_SID", secretOne);
  await zeitClient.upsertEnv(projectId, "TWILIO_ACCOUNT_AUTH", secretTwo);
}
