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

    const { sms_sid } = JSON.parse(req.body);

    if (!sms_sid) {
      return res.status(400).json({ message: `SID is required!` });
    }

    return client.conversations
      .conversations(sms_sid)
      .participants.list({ limit: 2 })
      .then((participants) => {
        const arrOfParticipants = participants.map((p) => p);
        console.log(`arrOfParticipants: `, arrOfParticipants);
        if (arrOfParticipants.length > 0) {
          const chatParticipant = arrOfParticipants.find(
            (elem) => elem.identity === `weg_insurance`
          );

          if (chatParticipant) {
            return res
              .status(200)
              .json({ identity: chatParticipant.identity, status: 200 });
          } else {
            return res
              .status(400)
              .json({ message: `No participants found!`, status: 400 });
          }
        }
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
