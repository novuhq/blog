require("dotenv").config()
const express =  require("express")
const PORT = process.env.PORT || 4000;
const app = express()
const path = require("path")

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const myTwilioNumber = process.env.TWILIO_PHONE_NUMBER

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
  });

const fetchCoupon = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const year = new Date().getFullYear().toString()
    let coupon = []
    for(let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * alphabets.length)
      coupon.push(alphabets.charAt(index))
    }
    return coupon.join("") + year
}

app.post('/sent', (req, res) => {
    const {number} = req.body
    client.messages
    .create({
        body: fetchCoupon(),
        from: myTwilioNumber,
        to: number
    })
    .then(message => console.log(message,sid));
    res.send("Your coupon has been sent to your number!")
});
  

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });