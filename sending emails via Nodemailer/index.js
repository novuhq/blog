const nodemailer = require("nodemailer")

const nodemailerTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "<your_email@gmail.com>",
        pass: "<generated_app_password>"
    }
})

const mailDetails = {
    from: '<your_email@gmail.com>',
    to: '<recipient_email@gmail.com>',
    subject: 'Test mail',
    html: `<h2>Happy birthday bor</h2>
            <p style="color: red">Great minds meet!</p>
            <button>Thank you</button>
        `,
    attachments: [
        {
            filename: "School.jpg",
            path: "./stock.jpg"
        },
        {
            path: "./sweet.jpg"
        },
        {
            filename: "testing.txt",
            content: "I am just testing out this docs"
        }
    ]
};

nodemailerTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs!', err);
    } else {
        console.log('Email sent successfully');
    }
});