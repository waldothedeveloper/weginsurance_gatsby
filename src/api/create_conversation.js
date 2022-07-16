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
    // console.log(`REQ BODY`, req.body);
    const participantPhoneNumber = req.body.phone;

    if (!participantPhoneNumber) {
      return res.status(400).json({ message: `Phone number is required!` });
    }
    // first create it
    return client.conversations.conversations
      .create({
        friendlyName: `First SMS WegInsurance Conversation`,
      })
      .then((conversation) =>
        // console.log(`NEW CONVERSATION: `, conversation);
        res.status(200).json({
          sid: conversation.sid,
          chatServiceSid: conversation.chatServiceSid,
          status: 200,
        })
      );
  } catch (err) {
    return res.status(500).json({
      message: `Our system has detected an unexpected error.`,
      status: err.status,
      code: err.code,
    });
  }
};

module.exports = handler;
