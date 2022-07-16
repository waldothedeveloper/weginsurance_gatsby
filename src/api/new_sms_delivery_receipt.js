const handler = (req, res) => {
  try {
    if (req.method !== `POST`) {
      return res
        .status(404)
        .json({ message: `This endpoint requires a POST request!` });
    }

    console.log(`req.body on sms delivery receipt: `, req.body);
    return res.status(200).json({ message: `SMS DELIVERY UPDATE` });
  } catch (err) {
    return res.status(500).json({
      message: err?.message || `Our system has detected an unexpected error.`,
      status: err?.status,
      code: err?.code,
    });
  }
};

module.exports = handler;
