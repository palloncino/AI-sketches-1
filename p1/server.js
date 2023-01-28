const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
  setInterval(() => {
    request('https://www.investing.com/commodities/gold-historical-data', (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const price = $('.pid-8830-last').text()
        io.emit('price', price)
      }
    })
  }, 2000)
})

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(80);

io.on('connection', (socket) => {
  console.log('user connected')
})
