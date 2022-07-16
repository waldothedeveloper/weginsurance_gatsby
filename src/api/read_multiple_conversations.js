const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require(`twilio`)(accountSid, authToken);

const handler = (req, res) => {
  try {
    if (req.method !== `GET`) {
      return res
        .status(404)
        .json({ message: `This endpoint requires a GET request!` });
    }

    return client.conversations.conversations
      .list({ limit: 50 })
      .then((conversations) =>
        conversations.forEach((data) => {
          console.log(`conversation: `, data.sid);
          client.conversations.conversations(data.sid).remove();

          if (!data.sid) {
            return res.status(200).json({ data, status: 200 });
          }
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
