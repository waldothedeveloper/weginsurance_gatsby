const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require(`twilio`)(accountSid, authToken);

const handler = (req, res) => {
  try {
    if (req.method !== `POST`) {
      return res
        .status(404)
        .json({ message: `This endpoint requires a POST request!` });
    }

    const chatSID = req.body.sms_sid;

    if (!chatSID) {
      return res.status(400).json({ message: `Chat SID is required!` });
    }

    return client.conversations
      .conversations(chatSID)
      .fetch()
      .then((conversations) =>
        // console.log(`read conversation`, conversations);
        res.status(200).json(conversations.chatServiceSid)
      )
      .catch((err) => {
        console.log(`ERROR IN READ CONVERSATION`, err);
        return res.status(500).json({
          message: `Our system has detected an unexpected error.`,
          status: err.status,
          code: err.code,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: `Our system has detected an unexpected error.`,
      status: err.status,
      code: err.code,
    });
  }
};

module.exports = handler;
