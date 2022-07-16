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
    // console.log(`REQ BODY ON ADD SMS PARTICIPANT: `, req.body);
    const { phone, sid } = JSON.parse(req.body);

    if (!phone) {
      return res.status(400).json({ message: `Phone number is required!` });
    }

    if (!sid) {
      return res.status(400).json({ message: `SID is required!` });
    }

    return client.conversations
      .conversations(sid)
      .participants.create({
        "messagingBinding.address": phone,
        "messagingBinding.proxyAddress": `+17868767395`,
      })
      .then((data) =>
        // console.log(`conversation created ok: `, data);
        res.status(200).json({ data, status: 200 })
      )
      .catch((err) =>
        // console.log(`ERROR IN CREATE CONVERSATION`, err);
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
