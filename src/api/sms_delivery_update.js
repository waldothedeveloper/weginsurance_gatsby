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

    const { messageSids, userSID } = JSON.parse(req.body);

    if (!messageSids.length > 0 || !userSID) {
      return res
        .status(400)
        .json({ message: `messageSids and userSID is required!` });
    }

    const result = messageSids.map(
      async (ids) =>
        await client.conversations
          .conversations(userSID)
          .messages(ids)
          .deliveryReceipts.list()
          .then((data) => data)
          .catch((err) => err)
    );

    return Promise.allSettled(result)
      .then((data) => {
        const emptyData = data.every((elem) => elem.value.length === 0) ?? null;

        if (emptyData) {
          const error = new Error(
            `No delivery receipts found for the given messageSids!`
          );
          error.status = 500;
          throw error;
        }

        return res.status(200).json({ data });
      })
      .catch((err) => {
        console.log(`err in SMS DELIVERY UPDATE: `, err);
        return res.status(500).json({
          message: err.message || `Something went wrong!`,
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
