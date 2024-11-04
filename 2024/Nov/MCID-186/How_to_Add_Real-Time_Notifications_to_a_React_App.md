---
title: How to Add Real-Time Notifications to a React App
description: Learn how to integrate real-time notifications into your React app using WebSockets, Server-Sent Events, Firebase, and Novu for improved user engagement and instant updates.
---

Keeping users informed and engaged throughout their stay in our application will make them more likely to take desired actions, such as making purchases, completing tasks, or sharing content. [Real-time notifications](https://docs.novu.co/integrations/providers/push/apns?utm_campaign=real-time-notification) provide a dynamic and interactive experience, enabling applications to deliver timely information and engage users proactively.

In this guide, we’ll build a stock data application with React and add [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) (SSE), and [Firebase Realtime Database](https://firebase.google.com/docs/database) notifications to it. WebSockets enables real-time, two-way communication between a web server and a client. 

SSE technology allows servers to push data to clients in real-time without requiring the client to initiate a request. Firebase Realtime Database is a cloud-hosted database that ensures all connected clients have the most up-to-date data. The GIF below demonstrates the outcome of the application.

![real-time notifications](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727082233486_react-notif-ezgif.com-video-to-gif-converter.gif)

## Choosing a real-time technology

Choosing the right real-time technology is essential for building successful real-time applications. Consider these popular options:

### WebSockets

![websocket](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1725650508428_Websockets+lab.webp)

WebSockets instant two-way communication, high scalability and low latency makes them ideal for applications like real-time chat, online games, collaborative tools like spreadsheets and location-based services. Companies like **Discord** and **Uber** utilize WebSockets for their core features, demonstrating their effectiveness in delivering real-time experiences.

### Server-Sent Events (SSE)

![server-sent events](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727087361765_server-sent-event.png)

SSE is simpler to implement than WebSockets and well-suited for applications that involve one-way communication, such as receiving live updates or notifications. **Twitter** is a notable example of a company using SSE to deliver real-time updates to its users.

### Firebase Realtime Database

Firebase is ideal for applications that require real-time data synchronization between multiple clients like chat apps, games, or collaborative tools.

Key features of Firebase Realtime Database also include scalability and cross-platform compatibility. Companies like [Stage](https://firebase.google.com/case-studies/stage-app) and [Galarm](https://firebase.google.com/case-studies/acintyo-galarm-app) use Firebase to send personalized and automated notifications to their users.

Now that we've explored the different real-time technologies and their features, in the next section, we’ll implement these technologies in a ReactJS application.

## Setting up a React project

Having discussed the real-time notifications in detail, let’s learn how to use them in a React.js application. The source code for this project is on [GitHub](https://github.com/novuhq/blog/tree/main/2024/Nov/MCID-186/source-code). Let’s start by setting up the project environment. 

Create the project folder and add a new [React.js](https://react.dev/) project inside it via the terminal with the command below:

```bash
    mkdir react-notifications
    cd react-notifications
    npx create-react-app .
```

Afterwards, run the following command to start the development server.

```bash
    npm start
```

## Installing necessary dependencies

Run the following command below to install the dependencies that will aid our server communications from the client:

```bash
    npm install express cors react-toastify react-router-dom
```

[**Express**](https://expressjs.com/) is a Node.js framework for building web applications.

[**CORS**](https://www.npmjs.com/package/cors) is a middleware that allows secure communication between different web components.

[**React-Toastify**](https://www.npmjs.com/package/react-toastify) is a library that provides customizable notifications.

[**React Router**](https://www.npmjs.com/package/react-router-dom) is a library that manages navigation and displays different components.

## Setting up WebSockets server for Real-Time notifications

Here, we’ll set up WebSockets notification after creating the React application. Create an `index.js` file in the root directory with the snippet below:

```js
    //index.js

    const http = require("http");
    const WebSocket = require("ws");
    //Browser websocket implementation
    const server = http.createServer();
    const wss = new WebSocket.Server({
        server
    });
    wss.on("connection", (socket) => {
        console.log("Client connected");
        socket.on("message", (message) => {
            // Process the Registration and send a response
            socket.send(message);
        });
    });
    server.listen(8080, () => {
        console.log("Server listening on port 8080");
    });
```

The snippet above creates an HTTP server and initializes a WebSocket server on top of it. The `wss.on(“connection”, ...)` listener handles incoming client connections. 

While the `socket.on(“message”, ...)` listener is triggered whenever the client sends a message.

The received message is processed, and a response is returned to the client using `socket.send()` . 

The server listens on port `8080` , ready to accept WebSocket connections from clients. 

### Connecting the WebSocket server to the React client

Within the `src` directory of the project, create a **components** folder and a `Register.js` file with the following snippets to handle user registration:

```js 

    //src/components/Register.js
    
    import { useNavigate } from "react-router-dom";
    function Register({ firstName, email, setFirstName, setEmail, socket }) {
      const navigate = useNavigate();
      const user = {
        firstName: firstName,
        email: email,
      };
      const handleRegister = () => {
        if (firstName !== "" && email !== "") {
          const load = JSON.stringify(user);
          socket.send(load);
          navigate("home");
        }
      };
      return (
        <div>
          <div>
            <form>
              <h1>Register</h1>
              <div>
                <label htmlFor="firstname">First name</label>
                <input
                  id="firstname"
                  type="text"
                  required
                  value={firstName}
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button onClick={handleRegister}>Create account</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    export default Register;
```

The snippet above manages and validates user input. Upon entering their details and clicking the “**Create account**” button, users send their information to the WebSocket server using the `socket.send()` method. 

The server then processes the received data and responds by sending a confirmation back to the client. The `handleRegister()` function also redirects the user to the "**home**" route using the `useNavigate()` function.

Next, let’s create the “**home**” route. In the `c`  `omponent`  `s` folder, create a `Hompage.js` file with the following snippet: 

```js
    //src/components/Homepage.js
    import { useEffect, useState } from "react";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    function Homepage({ webSocket, email, firstName }) {
      useEffect(() => {
        webSocket.onmessage = function (event) {
          toast.success( `Registration successful!` );
        };
      }, [webSocket]);
      return (
        <div>
          <ToastContainer />
          <div>
            <div>
              <h1>{ `Welcome ${firstName}` }</h1>
            </div>
          </div>
        </div>
      );
    }
    export default Homepage;
```

**The snippet above does the following:**

* It listens to the server `onmessage` event and triggers a notification to inform the user of the successful registration.
* Renders the toast container and a `h1` welcoming the user.

Next, inside the `src` folder, let’s clean up the `App.js` file and update it with the following snippet:

```js
    //src/App.js
    import { Route, Routes } from "react-router-dom";
    import "./App.css";
    import { useState } from "react";
    import Homepage from "./components/Homepage";
    import Register from "./components/Register";
    const socket = new WebSocket("ws://localhost:8080");
    function App() {
      const [firstName, setFirstName] = useState("");
      const [email, setEmail] = useState("");
      return (
        <Routes>
          <Route
            path="/"
            element={
              <Register
                firstName={firstName}
                setFirstName={setFirstName}
                email={email}
                setEmail={setEmail}
                socket={socket}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Homepage firstName={firstName} email={email} webSocket={socket} />
            }
          />
        </Routes>
      );
    }
    export default App;
```

**In the snippet above:**

* We first establish a persistent connection between the client and server with the `socket` constant and capture user input for first name and email using the `useState()` hook.
* Then, render the `Register` and `Homepage` components with the required properties, including the socket instance we initiated.

In the browser, we can now register for an account and receive real-time WebSocket notifications.

![user registration](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1726998326880_72FA7C6B-C4A3-4E5E-8BAB-93D62BBE3FAF.GIF)

Now that we've learned how to use WebSockets let's add a notification using Firebase Cloud Messaging.

## Implementing real-time notifications using Firebase

Here, we will implement real-time notifications in our React app using Firebase. 

To start, launch [Firebase](https://firebase.google.com/) and create a new project.

Add a web application to the project and register the app.

![Add firebase](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1725069201001_Screenshot+2024-08-31+at+02.46.35.png)

After copying the configuration file on the next screen, keep it handy, as we'll need it soon.

Next, navigate to **Project Settings** > **Cloud Messaging**, enable Firebase Cloud Messaging (FCM), and generate the unique key pair.

With Firebase set up, it’s time to integrate it into the React project.

![enable messaging](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1725069915113_Screenshot+2024-08-31+at+02.57.26.png)

### Setting up Firebase in React project

Run the following command in the terminal to install the Firebase npm package.

```bash
    npm install firebase
```

Next, create a `firebaseConfig.js` file in the `components` folder and add the configuration code copied earlier:

```js
    //src/components/firebaseConfig.js
    import { initializeApp } from "firebase/app";
    import { getMessaging, getToken } from "firebase/messaging";
    const firebaseConfig = {
      apiKey: "YOUR API KEY",
      authDomain: "real-time-notification-53c8b.firebaseapp.com",
      projectId: "YOUR PROJECT ID",
      storageBucket: "real-time-notification-53c8b.appspot.com",
      messagingSenderId: "YOUR SENDER ID",
      appId: "YOUR API ID",
      measurementId: "G-QXGZ04F4P7",
    };
    // Initialize Firebase
    const firebase = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebase);
    export default firebase;
```

The snippet above sets up a connection between the React application and Firebase for real-time notifications. 

* It first imports the necessary modules for Firebase app initialization and message handling.
* Then, it defines the Firebase project configuration with the unique API key, project ID, and other details. 
* Lastly, the code initializes the Firebase app and gets an instance of the messaging service, which will be used to communicate with FCM to send and receive notifications.

Remember to replace the placeholder values with real Firebase project credentials.

### Request notification permission

Prompting users for permission before sending notifications shows that we respect their privacy and avoid overwhelming them with unwanted messages. 

Update the `firebasConfig.js` file with the following snippet:

```js
    //src/components/firebaseConfig.js
    
    export const generateToken = async (setToken) => {
      const permission = await Notification.requestPermission();
      console.log(permission);
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "YOUR GENERATED TOKEN",
        });
        setToken(token);
      }
    };
```

The snippet above generates an FCM token for the web application. It first requests notification permission from the user. 

If granted, it obtains the FCM token using the `getToken` function from the Firebase Messaging library. The token is then saved to the state using the `setToken` parameter, which will be used to send notifications to the user’s device.

### Setting up service workers

Firebase Cloud Messaging relies on [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) to receive and handle notifications. 

Service workers are background scripts that run even when the browser window is closed or the app is not in the foreground. 

In the public folder of our React project, create a `firebase-messaging-sw.js` file with the following snippet:

```js
    //public/firebase-messaging-sw.js
    
    // Give the service worker access to Firebase Messaging.
    importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
    importScripts(
      "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
    );
    // Initialize the Firebase app in the service worker
    firebase.initializeApp({
      apiKey: "YOUR API KEY",
      authDomain: "real-time-notification-53c8b.firebaseapp.com",
      projectId: "YOUR PROJECT ID",
      storageBucket: "real-time-notification-53c8b.appspot.com",
      messagingSenderId: "YOUR SENDER ID",
      appId: "YOUR API ID",
      measurementId: "G-QXGZ04F4P7",
    });
    // Retrieve an instance of Firebase Messaging so that it can handle background messages.
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      console.log("Recieved Message :", payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
```

**The snippet above does the following:**

* Imports the Firebase libraries and initializes the Firebase app within the service worker script.
* Retrieves an instance of Firebase Messaging to handle notifications received when the app is in the background.
* The `onBackgroundMessage` listener monitors incoming messages and displays them as notifications using the `showNotification` method.

Next, import the `generateToken` function from the `firebaseConfig.js` file within the `Homepage.js` component. 
Then, call the function within the `useEffect` hook to ensure it's executed once the component mounts.

Add the following code in the import section in the `Homepage.js` file:

```js
    //src/Components/Homepage.js
    //other imports
    import { generateToken } from "./firebaseConfig";

Next, create `token` and `setToken` constants with the `useState` hook within the **Homepage** function component.

    const [token, setToken] = useState("");

Call the `generateToken` function within the `useEffect` Hook after the `onmessage` event listener.

       useEffect(() => {
        //webSocket onmessage event listener
        const permission = setTimeout(() => {
          generateToken(setToken);
        }, 5000);
        return () => clearTimeout(permission);
      }, [webSocket]);

To see the token in the UI, update the **Homepage** return function with the following snippet:

    <div>
              {token && (
                <>
                  <h2>Your permission token:</h2>
                  <input type="text" value={token} />
                </>
              )}
            </div>
```

Upon successful registration, the user will be prompted to allow notifications. 

When you grant permission, a unique token will be generated. Copy this token - we'll use it later to send a test notification.

The token is a device’s identifier, enabling Firebase to deliver targeted push notifications.

![device unique token](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727012606673_Screenshot+2024-09-22+at+14.43.13.png)

### Sending a test notification
1. Navigate to the Firebase console and access the [Messaging page](https://console.firebase.google.com/project/_/messaging/?_gl=1*521hov*_ga*ODM4ODA3MjUuMTcxNTUxODk5Ng..*_ga_CW55HF8NVT*MTcyNTExMzE2NS4xNC4xLjE3MjUxMTMyNjkuNjAuMC4w).
2. Initiate a new campaign by selecting “**Create your first campaign**.”
3. Choose “**Firebase Notification messages**” and proceed to create the notification.
4. Compose a desired message; keep in mind that all other fields are optional.

![notification-message](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727083851676_Screenshot+2024-09-23+at+10.30.34.png)

Click the “**Send test message button**” and on the flyout box, locate the field labeled "**Add an FCM registration token**." 
Paste the registration token we copied earlier into this field. 

![adding-a-device-token](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1725115061583_Screenshot+2024-08-31+at+15.37.10.png)

Finally, click the "**Test**" button to receive the notification.

![firebase notification](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727017269130_Screenshot+2024-09-22+at+15.57.57.png)

Notice that the notification object is logged to the console. 

This results from the configuration specified within the service worker file, which enables the capture and display of incoming notifications. 

We’ve successfully sent real-time notifications from the Firebase console.

Visit the official Firebase [documentation](https://firebase.google.com/docs/cloud-messaging/js/send-multiple) for detailed instructions on sending notifications from the server. 

Next, let’s implement the SSE notification in our application.

## Using Server-Sent Events (SSE) for real-time notifications

To demonstrate how Server-Sent Events (SSE) work, let's create a new file named `serversent.js` in the project's root directory with the following snippet:

```js
    //server..js
    const express = require("express");
    const cors = require("cors");
    const app = express();
    const PORT = 4000;
    const corsOPtions = {
      origin: "http://localhost:3000",
    };
    app.get("/events", cors(corsOPtions), (req, res) => {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "cache-control": "no-cache",
        connection: "keep-alive",
      });
      setInterval(() => {
        const data = {
          message: `Server last updated on - ${new Date()}` ,
        };
        
        res.write( `data:  ${JSON.stringify(data)}\n\n` );
      }, 5000);
    });
    app.listen(PORT, () => console.log( `server running on port ${PORT}` ));
```

The code snippet above utilizes Express to create an SSE endpoint at `/events` . The CORS middleware is configured to allow cross-origin requests from the specified origin `http://localhost:3000` .

The `app.get(’/events’, ...)` route handler sets the appropriate headers for SSE communication and establishes a persistent connection with the client.

A `setInterval()` function periodically sends data to the connected clients. In this example, a message with a timestamp is sent every 5 seconds. The data is formatted as JSON and sent using `res.write()`.

## Integrating SSE in a React project

Here we’ll handle the incoming data streams from the SSE server. Create a `ServerEvent.js` file in the **components** folder within `src` directory and add the following snippet.

```js
    //src/ServerEvent.js
    import { useEffect, useState } from "react";
    function ServerEvents() {
      const [message, setMessage] = useState();
      useEffect(() => {
        const eventSource = new EventSource("http://localhost:4000/events");
        if (typeof EventSource !== "undefined") {
          eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            setMessage(eventData.message);
          };
        } else {
          console.log("EventSource is undefined");
        }
        return () => eventSource.close();
      }, []);
      const stocks = [
        { id: 1, ticker: "AAPL", price: 227.75 },
        { id: 2, ticker: "MSFT", price: 213.02 },
        { id: 3, ticker: "AMZN", price: 435.38 },
        { id: 4, ticker: "GOOGL", price: 163.6 },
      ];
      const formatPrice = (price) => {
        return new Intl.NumberFormat("us-EN", {
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
        }).format(price);
      };
      return (
        <div>
          <div>
            <table>
              <caption>Stock Prices</caption>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Stock Symbol</th>
                  <th>Real Time Price</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map(({ id, ticker, price }, index) => (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{ticker}</td>
                    <td>{formatPrice(price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h1>{message}</h1>
        </div>
      );
    }
    export default ServerEvents;
```

**The snippet above does the following:**

* Establishes a connection with an SSE endpoint.
* Listens for incoming messages and updates the component’s state with the received data. 
* Creates a `Stocks` object and a `formatPrice` function to help us format the stock prices
* It then renders the Server message content, literally telling our users when we last updated the application.

Next, import the `ServerEvents` component into the `Homepage.js` file and render it within the main component’s return function. 

The app will look like the one below, with the updated time changing after a while. 

![server-sent notification](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727056971021_Screenshot+2024-09-23+at+03.02.28.png)

We've learned how to send real-time notifications using WebSockets, Firebase Cloud Messaging, and SSE. 

Next, let’s add Novu real-time notification to the mix.

## Adding Novu real-time notification to React.

In this section, we’ll add a verification process to our application using Novu. We want new users to confirm their email addresses before granting them access to the stock data.

[Novu](https://novu.co/?utm_campaign=real-time-notification) is an open-source JavaScript-native notification framework built for developers. 

It simplifies notification management by letting us send messages through different channels, such as emails, texts, app notifications, and chat. 

We can easily customize these messages and set up rules for when they should be sent, ensuring that users get the right notifications at the right time.

To start using Novu, [create an account](https://dashboard.novu.co/?utm_campaign=real-time-notification) and navigate to **Workflows** > **demo-verify-otp** > **send****-****email** to see the sample email workflow. 

For this demo, we'll use the default Slack template. But you can [create your workflows](https://docs.novu.co/workflow/introduction?utm_campaign=real-time-notification) to match different brands and styles.

![novu email template](https://paper-attachments.dropboxusercontent.com/s_4C5BEC3BD3E499C6B665918B6DB2EBBF4B2A3DBEDC40BD331086AF17704B9031_1727062437182_Screenshot+2024-09-23+at+04.33.31.png)

Navigate to API Keys on the left side of the dashboard and copy the secret key. 

In the terminal, install [@novu/node](https://www.npmjs.com/package/@novu/node?utm_campaign=real-time-notification) and [socket.io](https://socket.io/) packages to help communicate with Novu, and trigger real-time notifications within the Node.js server.

```bash
    npm i @novu/node socket.io
```

In the root directory, create a `server.js` file with the following snippet:
 
```js
    //server.js
    const express = require("express");
    const cors = require("cors");
    const http = require("http");
    const { Server } = require("socket.io");
    const { Novu } = require("@novu/node");
    
    const novu = new Novu("<YOUR SECRET KEY>");
    const app = express();
    app.use(cors());
    const PORT = 3001;
    const server = http.createServer(app);
    
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    const notification = (data) => {
      try {
        novu.trigger("demo-verify-otp", {
          to: {
            subscriberId: "66be2642d3f9eb69fff3f2ca",
            email: `${data.email}` ,
          },
          payload: {
            validationCode: data.code,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    io.on("connection", (socket) => {
      socket.on("verify-user", (data) => {
        notification(data);
        socket.emit("user-verified", data);
      });
    });
    server.listen(PORT, () => {
      console.log( `Server running on ${PORT}` );
    });
```

**In the snippet above, we:**

* Set up the server using Express and created connections for Novu and socket.io, which will be used for real-time communication.
* On the “verify-user” socket.io event, we call the `notification()` function that triggers a Novu workflow named "**demo-verify-otp.**”

Next, let’s update the `Homepage.js` file to capture the user verification OTP and also give them access to the application if they are verified. 

Add the following snippet to the `Homepage.js` file:

```js
    //src/components/Homepage.js
    
    //other imports
    import io from "socket.io-client";
    const socket = io.connect("http://localhost:3001");
    function Homepage({ webSocket, email, firstName }) {
      const [token, setToken] = useState("");
      const [emailCode, setEmailCode] = useState();
      const [userCode, setUserCode] = useState();
      const [showPage, setShowPage] = useState(false);
      const [emailVerification, setEmailVerification] = useState(false);
      //useEffect function here
      const payload = {
        email: email,
        code: userCode,
      };
      const verifyEmail = () => {
        socket.emit("verify-user", payload);
        setEmailVerification(true);
      };
      const emailVerified = () => {
        if ((userCode = emailCode)) {
          toast.success("Email verified!");
          setEmailVerification(false);
          setShowPage(true);
        }
      };
      return (
        <div>
          {/* ToastContainer here */}
          <div>
            <div>
              <h1>{ `Welcome ${firstName}` }</h1>
              <button onClick={verifyEmail}>
                {!showPage ? "Verify your Email" : "Your email is verified"}
              </button>
              {emailVerification && (
                <>
                  <p>We've just sent you a mail, verify your email to continue</p>
                  <div>
                    <input
                      type="number"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                      placeholder="Enter code"
                    />
                    <button onClick={emailVerified}>Verify</button>
                  </div>
                </>
              )}
            </div>
            <div>{/* token here */}</div>
          </div>
          {showPage && <ServerEvents />}
        </div>
      );
    }
    export default Homepage;
```

**The snippet above does the following:**

* It sets up various states using `useState` hook and defines a `payload` object containing the user's email and verification code.
* The `verifyEmail` function sends the `payload` to the server with a "verify-user" socket.io event.
* The `emailVerified` function checks if the user's entered code (`userCode`) matches the email verification code (`emailCode`). If so, it displays a success toast, hides the verification section, and shows the main content (`ServerEvents` component).
* Then, it conditionally renders elements based on the verification state in the return function.

The complete code for the `Homepage.js` component is in this [GitHub file](https://github.com/novuhq/blog/blob/main/2024/Nov/MCID-186/source-code/src/components/Homepage.js). 

Now, the application will look like this:

![verify email](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727077298315_Screenshot+2024-09-23+at+08.41.11.png)

Having discussed different options for real-time notifications and how to implement them in a React application, let's now compare them.

## Comparing the real-time technologies

![comparison table](https://paper-attachments.dropboxusercontent.com/s_6B83822E7270DCD852952C393CF7B5CD8EBEA49A91FB41938DC78AF986B3EDA6_1727087862211_comparing-real-time-technologies.png)

As the table shows, WebSockets offer low latency and full-duplex communication, but they require more complex management. 

SSE is simpler but lacks bidirectional communication. 

Firebase Realtime Database excels in real-time data synchronization but might need custom data management. 

Novu is outstanding with its user-friendly interface, pre-built components like notification badges, and seamless integration with popular platforms like Node.js, Ruby on Rails, and Python. These features make it a better choice for various real-time applications, from messaging and communication to financial services. 

Next, let’s talk about how to make real-time notifications work even better and faster.

## Optimizing performance and scalability

To prevent our application from slowing down or crashing due to complex notification logic, we’ll focus on optimizing performance and scalability. 

By managing state, throttling, or debouncing notifications, we can enhance the overall performance of our application. 

Let’s discuss these factors in detail.

### Managing state efficiently

- **Memoization:** Adopt `useMemo` and `useCallback` hooks to prevent unnecessary re-renders, especially for expensive calculations or functions within components.
- **Selective updates:** Update only the necessary parts of the state to avoid unnecessary re-renders.
- **Data normalization:** Normalize data structures to reduce complexity and improve performance.

### Throttling and debouncing notifications

Consider implementing [throttling or debouncing techniques](https://medium.com/@mujaffarhssn/debouncing-vs-throttling-optimizing-your-javascript-for-performance-a99d38f5eb3b) to prevent notification overload and enhance user experience. 

Throttling limits the rate at which notifications are sent, while debouncing delays them until user input is complete. 

Libraries like [Lodash](https://lodash.com/) can streamline the implementation of these techniques.

### Handling large volumes of notifications

When dealing with large volumes of notifications, consider implementing [pagination](https://hygraph.com/blog/react-pagination), [batching](https://www.geeksforgeeks.org/what-is-automatic-batching-in-react-18/), or [server-side filtering](https://dev.to/marmariadev/deciding-between-client-side-and-server-side-filtering-22l9). 

Pagination divides notifications into manageable batches while batching groups them together for efficient transmission. 

Server-side filtering can further reduce the number of notifications sent to clients, enhancing overall performance.

## Enhancing user experience

Focusing on clear, concise messaging, actionable notifications, and sound or vibration alerts can enhance user engagement and satisfaction.

### Designing an intuitive notification UI

To increase user engagement, include buttons or links within notifications to guide users toward desired actions, ensuring visibility and relevance.

### Adding sound or vibration alerts

Allowing users to customize sound and vibration settings for notifications increases their satisfaction. Libraries like [Toastify](https://apvarun.github.io/toastify-js/) and [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) are tools we can use to implement audio and vibration notifications within our application.

### Ensuring accessibility

Prioritize accessibility by ensuring notifications are compatible with screen readers for visually impaired users. 

Provide alternative formats like text-based alerts to accommodate users with different abilities and ensure an inclusive notification experience.

## Debugging and troubleshooting

Identifying and resolving issues ensures that our notification system runs smoothly and consistently.
This section covers common problems we might encounter and provides strategies for fixing them.

### Common issues with WebSockets

* **Connection errors:** Check for network issues, firewall restrictions, or incorrect WebSocket URLs.
* **Message parsing:** Ensure proper JSON parsing and handling of message data.
* **Server-Side errors:** Debug server-side code for potential issues in handling connections or processing messages.

### Debugging Firebase errors   

* **Firebase console:** Use the Firebase console to monitor errors and logs.
* **Debugging tools:** Leverage browser developer tools to inspect network requests and responses.

### Handling network failures

* **Reconnection attempts:** Implement automatic reconnection logic to handle temporary network disruptions.
* **Offline caching:** Store notifications locally and display them when the user returns online.

## Security considerations

Security is paramount when dealing with real-time notifications, especially when handling sensitive user data. This section explores essential security measures to protect the application and user information.

### Securing WebSocket connections

Prioritize security by implementing [HTTPS](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) to encrypt WebSockets traffic and protect sensitive information. 

Employ robust authentication and authorization mechanisms to restrict access to notifications, safeguarding user privacy and preventing unauthorized access.

### Authentication and authorization

Enhance security by using token-based authentication methods, such as [JSON Web Token (JWT)](https://en.wikipedia.org/wiki/JSON_Web_Token), to protect server connections. 

Also, role-based access control should be implemented to restrict notification access to authorized users, ensuring that only individuals with appropriate permissions can receive and view notifications.

### Protecting user data

Encrypting sensitive user data will further strengthen security. Implement robust data validation to mitigate malicious attacks. Conduct regular security audits to proactively identify and address vulnerabilities, ensuring the applications and user data are securely protected.

## Summary

We’ve explored various real-time notification technologies in React, including WebSockets, Firebase, Server-Sent Events, and Novu. 

Novu simplifies the implementation and management of real-time notifications, offering a powerful and user-friendly solution. 

We've also discussed optimization, user experience, and security best practices we can implement in your real-time app. 

To get started with Novu, [create a free account](https://dashboard.novu.co/auth/signup/?utm_campaign=real-time-notification) and join our developer community for expert support and guidance.

## Additional resources

The following resources offer in-depth information, code examples, and best practices for mastering real-time notifications in React applications.

* [**Firebase documentation**](https://firebase.google.com/docs)
* [**WebSocket API**](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
* [**Server-Sent events**](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
* [**Security best practices**](https://owasp.org/www-project-top-ten/)
