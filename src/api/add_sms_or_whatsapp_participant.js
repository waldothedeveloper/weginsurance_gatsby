/* eslint-disable camelcase */
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
    const { phone, sid, chat_mode } = JSON.parse(req.body);
    console.log(`sid on add SMS Participant API: `, sid);
    console.log(`phone on add SMS Participant API: `, phone);
    console.log(`chat_mode on add SMS Participant API : `, chat_mode);

    if (!phone) {
      return res.status(400).json({ message: `Phone number is required!` });
    }

    if (!sid) {
      return res.status(400).json({ message: `SID is required!` });
    }

    if (!chat_mode) {
      return res.status(400).json({ message: `Chat mode is required!` });
    }

    if (chat_mode === `sms`) {
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
    }

    if (chat_mode === `whatsapp`) {
      return client.conversations
        .conversations(sid)
        .participants.create({
          "messagingBinding.address": `whatsapp:${phone}`,
          "messagingBinding.proxyAddress": `whatsapp:+17867418433`,
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
    }

    return res.status(400).json({ message: `Chat mode is required!` });
  } catch (err) {
    return res.status(500).json({
      message: `Our system has detected an unexpected error.`,
      status: err.status,
      code: err.code,
    });
  }
};

module.exports = handler;
