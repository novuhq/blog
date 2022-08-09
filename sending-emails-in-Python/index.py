
# Sending text-only emails
# message = EmailMessage()
# message["subject"] = "Happy Birthday from David!"
# message["from"] = "<your_email@gmail.com>"
# message["to"] = "<recipient_email@gmail.com>"
# message.set_content(
#     "Dear friend, you are the best thing that I've happened to me.\n Wishing you a wonderful year ahead...\n xoxo ❤️")

# with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
#     smtp.login('<your_email@gmail.com>', '<generated_app_password>')
#     smtp.send_message(message)
#     print("Email sent!")


# # Adding a single attachment to emails

# import imghdr
# import smtplib
# from email.message import EmailMessage

# message = EmailMessage()
# message["Subject"] = "Happy Birthday from David!"
# message["from"] = "<your_email@gmail.com>"
# message["to"] = "<recipient_email@gmail.com>"
# message.set_content("Hi! I wish you a glorious and fabulous birthday!")

# with open("stock.jpg", "rb") as img:
#     file_data = img.read()
#     file_type = imghdr.what(img.name)
#     file_name = img.name

# message.add_attachment(file_data, maintype="image",
#                    subtype=file_type, filename=file_name)

# with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
#     smtp.login('<your_email@gmail.com>', '<generated_app_password>')
#     smtp.send_message(message=message)
#     print("Email sent!")


# # Adding multiple Attachments

# import smtplib
# import imghdr
# from email.message import EmailMessage

# message = EmailMessage()
# message["Subject"] = "Happy Birthday from David!"
# message["from"] = "<your_email@gmail.com>"
# message["to"] = "<recipient_email@gmail.com>"
# message.set_content("Hi! I wish you a wonderful birthday")

# images = ["stock.jpg", "sweet.jpg"]

# for image in images:
#     with open(image, "rb") as f:
#         file_data = f.read()
#         file_type = imghdr.what(f.name)
#         file_name = f.name

#     message.add_attachment(file_data, maintype="image",
#                        subtype=file_type, filename=file_name)

# with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
#     smtp.login('<your_email@gmail.com>', '<generated_app_password>')
#     smtp.send_message(message=message)
#     print("Email sent!")


# Sending HTML contents
# import smtplib
# from email.message import EmailMessage
# from datetime import datetime
# import calendar

# message = EmailMessage()
# message["Subject"] = f"Happy Birthday from Dave!"
# message["from"] = "<your_email@gmail.com>"
# message["to"] = "<recipient@gmail.com>"
# message.set_content("Hi! Have a wonderful birthday!")

# message.add_alternative(f"""\
#                             <body>
#                                 <h2 style="color: red">Get set it's gonna be lit, {name}  </h2>
#                                 <p>This me reminding you that you were born  {calendar.month_name[month]} - {year}</p>
#                                 <img src="https://images.unsplash.com/photo-1564156280315-1d42b4651629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFkc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="Stock"/>
#                             </body>
#                             """, subtype="html")

# with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
#   smtp.login('<your_email@gmail.com>', '<generated_app_password>')
#   smtp.send_message(message=message)
#   print("Your birthday wishes has been sent!")


# Sending HTML contents to multiple friends.
import smtplib
from email.message import EmailMessage
import calendar
from datetime import datetime

today = datetime.today()


def sendBirthdayWishes(name, email, day, month, year):
    message = EmailMessage()
    message["subject"] = f"Happy Birthday message from David! 🎂🎊"
    message["from"] = "<your_email@gmail.com>"
    message["to"] = email

    message.add_alternative(f"""\
                            <body>
                                <h2 style="color: blue; margin-bottom: 20px">Happy birthday, {name}!🎈🎉 </h2>
                                <p>You are the sweetest person I know, and this birthday is a fresh beginning. I wish you confidence, courage, and capability.</p>
                                <p>You've just clocked {today.year - year} years on earth, wishing you more in sound health</p>
                                <p style="color: blue; font-style: italics">Only legends are born {day} / {calendar.month_name[month]}</p>
                                <img src="https://www.myenglishteacher.eu/blog/wp-content/uploads/2021/05/happy-birthday.jpeg" alt={name}/>
                            </body>
                            """, subtype="html")

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login('<your_email@gmail.com>', '<generated_app_password>')
        smtp.send_message(message)
        print("Your birthday wishes has been sent!")


friends = [{"name": "David Cleff", "email": "useremail@gmail.com", "day": 29, "month": 6, "year": 2022},
           {"name": "Shola Alli", "email": "useremail@gmail.com",
               "day": 29, "month": 6, "year": 1998},
           {"name": "Dan Folks", "email": "useremail@gmail.com",
            "day": 29, "month": 6, "year": 1997},
           {"name": "Julliet Gin", "email": "useremail@gmail.com", "day": 29, "month": 6, "year": 1997}]

today = datetime.today()

for friend in friends:
    if today.month == friend["month"] and today.day == friend["day"]:
        sendBirthdayWishes(friend["name"], friend["email"],
                           friend["day"], friend["month"], friend["year"])
