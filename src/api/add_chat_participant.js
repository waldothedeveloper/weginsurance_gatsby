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

    const { sms_sid, identity } = JSON.parse(req.body);

    if (!sms_sid) {
      return res.status(400).json({ message: `SID is required!` });
    }

    if (!identity) {
      return res.status(400).json({ message: `Identity is required!` });
    }

    return client.conversations
      .conversations(sms_sid)
      .participants.create({
        identity,
      })
      .then((data) => res.status(200).json({ data, status: 200 }))
      .catch((err) =>
        res.status(500).json({
          message: `Our system has detected an unexpected error.`,
          status: err.status,
          code: err.code,
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
