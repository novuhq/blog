import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateToken } from "./firebaseConfig";
import io from "socket.io-client";
import ServerEvents from "./ServerEvent";

const socket = io.connect("http://localhost:3001");

function Homepage({ webSocket, email, firstName }) {
  const [token, setToken] = useState("");
  const [emailCode, setEmailCode] = useState();
  const [showPage, setShowPage] = useState(false);
  const [emailVerification, setEmailVerification] = useState(false);

  let userCode = 1234;

  useEffect(() => {
    webSocket.onmessage = function (event) {
      console.log(event.data);
      toast.success(`Hi Welcome!`);
    };
    const permission = setTimeout(() => {
      generateToken(setToken);
    }, 5000);
    return () => clearTimeout(permission);
  }, [webSocket]);

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
    <div className=" container mx-auto w-full max-w-l shadow-md rounded p-3">
      <ToastContainer />
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl p-2 font-bold">{`Welcome ${firstName}`}</h1>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={verifyEmail}
          >
            {!showPage ? "Verify your Email" : "Your email is verified"}
          </button>

          {emailVerification && (
            <>
              <p>We've just sent you a mail, verify your email to continue</p>
              <div>
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                  placeholder="Enter code"
                />

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={emailVerified}
                >
                  Verify
                </button>
              </div>
            </>
          )}
        </div>
        <div>
          {token && (
            <>
              <h2 className="text-lg text-lime-700 p-2">{`Your permission token:`}</h2>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={token}
              />
            </>
          )}
        </div>
      </div>

      {showPage && <ServerEvents />}
    </div>
  );
}

export default Homepage;
