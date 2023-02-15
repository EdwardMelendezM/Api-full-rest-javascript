const handleError = (res, mensage = "Algo sucedio", code = 403) => {
  res.status(code)
  res.send({ error: mensage })
}
module.exports = { handleError };