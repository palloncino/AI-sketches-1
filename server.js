const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const nodemailer = require('nodemailer')

const app = express()

// Threshold price for sending email notification
const threshold = 1500

// Set up email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
})

let currentPrice

setInterval(() => {
  request('https://www.investing.com/commodities/gold-historical-data', (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html)
      
      // Find the parent element of the price
      const parentElement = $('.pid-8830-last').parent()

      console.log({parentElement})
      
      // Use the .text() method to get the text of the parent element
      const text = parentElement.text() || '';
      
      // Use a regular expression to extract the price from the string
      const priceRegex = /\d+\.\d+/

      if(priceRegex.test(text)){
        const price = text.match(priceRegex)[0]
        // do something with the price
        console.log(`XAUUSD: ${price}`)
      } else {
          console.log("price not found")
      }
      

      // Send email notification if price goes above or below threshold
      if (currentPrice && (price > threshold && currentPrice < threshold || price < threshold && currentPrice > threshold)) {
        const mailOptions = {
          from: 'youremail@gmail.com',
          to: 'powerhydratoni@gmail.com',
          subject: 'XAUUSD price threshold reached',
          text: `XAUUSD price is now ${price}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error)
          } else {
            console.log(`Email sent: ${info.response}`)
          }
        })
      }

      currentPrice = price
    }
  })
}, 1000)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
