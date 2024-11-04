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
      <div className=" container mx-auto w-full max-w-xs py-5">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-gray-700 text-lg font-bold mb-2">Register</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstname"
            >
              First name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              required
              value={firstName}
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
