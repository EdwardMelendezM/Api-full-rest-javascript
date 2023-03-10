const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "leifer-01") {
      next()
    } else {
      res.status(403);
      res.send({ error: "API_KEY_NO_VALIDA" })
    }
  } catch (error) {
    res.status(403);
    res.send({ error: "ERROR_CUSTOM_HEADER" })
  }
}
module.exports = customHeader;