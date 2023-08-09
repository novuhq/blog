import Home from "./pages/Home"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Events from "./pages/Events"
import EventsCategory from "./pages/EventsCategory"
import CreateEvent from "./pages/CreateEvent"
import EventDetails from "./pages/EventDetails"

import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "meetup-clone",
        apiDomain: "http://localhost:4000",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/",
    },
    recipeList: [
        EmailPassword.init(),
        Session.init()
    ]
 });

function App() {

 
  
  return (
    <SuperTokensWrapper>
    <Router>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom,[EmailPasswordPreBuiltUI])}
        <Route path="/" element={<SessionAuth><Home/></SessionAuth> } />
        <Route path="/dashboard" element={<SessionAuth><Dashboard /></SessionAuth> } />
        <Route path="/events/all" element={<SessionAuth><Events /></SessionAuth>} />
        <Route path="/events/:category" element={<SessionAuth><EventsCategory /></SessionAuth>} />
        <Route path="/create/event" element={<SessionAuth><CreateEvent /></SessionAuth>} />
        <Route path="/event/:slug" element={<SessionAuth><EventDetails/></SessionAuth>} />
      </Routes>
      </Router>
      </SuperTokensWrapper>
  )
}

export default App
