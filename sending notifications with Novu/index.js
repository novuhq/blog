const express = require('express'); //import expressjs
const {Novu} = require("@novu/node")
const novu = new Novu('<YOUR_API_KEY'); 
const app = express();
const PORT = 4000; // where the server runs
const path = require("path")

app.use(express.urlencoded({ extended: true }));

//creates a route that allows only GET request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"))
});

app.post("/sent", async(req, res) => {
  const {officialPosition, officialFullName, candidateEmail, candidateSalary, candidatePosition, candidateFirstName, candidateLastName} = req.body;

    await novu.trigger('on-boarding-notification', {
        to: { 
          subscriberId: '<YOUR_SUBSCRIBER_ID>',
          email: candidateEmail
        },
        payload: {
          officialPosition, officialFullName, candidateSalary, candidatePosition, candidateFirstName, candidateLastName
        }
      }).then(data => {
        console.log(data)
      }).catch(err => console.error(err))
    res.sendFile(path.join(__dirname, "/sent.html"));
})
//listens to updates made on the project and shows the status of the project
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});


