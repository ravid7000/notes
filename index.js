const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

app
  .use(express.static(path.join(__dirname, 'build')))
  .get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './build', 'index.html')))
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at ${PORT}`)
  })