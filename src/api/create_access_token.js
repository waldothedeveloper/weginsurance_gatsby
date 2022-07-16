// Used when generating any kind of tokens
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

// twilio code
const AccessToken = require(`twilio`).jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

const handler = (req, res) => {
  try {
    if (req.method !== `POST`) {
      return res
        .status(404)
        .json({ message: `This endpoint requires a POST request!` });
    }

    // Used specifically for creating Chat tokens
    const { serviceSid, identity } = JSON.parse(req.body);
    // console.log(`serviceSid on Create Access Token: `, serviceSid);
    // console.log(`identity  on Create Access Token: `, identity);

    if (!serviceSid || !identity) {
      return res
        .status(400)
        .json({ message: `Service SID and Identity are required!` });
    }

    // Create a "grant" which enables a client to use Chat as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: serviceSid,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      { identity: identity, ttl: 72000 }
    );

    token.addGrant(chatGrant);

    // Serialize the token to a JWT string
    return res.status(200).json({ token: token.toJwt(), status: 200 });
  } catch (err) {
    console.log(`err: `, err);
    return res.status(500).json({
      message: `Our system has detected an unexpected error.`,
      status: err.status,
      code: err.code,
    });
  }
};
module.exports = handler;
