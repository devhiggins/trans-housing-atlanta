import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Details from "../components/Details"
import Home from "../components/Home"
import Login from "../components/Login"
import SignUp from "../components/SignUp"
import PrivateRoute from "../components/PrivateRoute"
import Admin from "../components/Admin"
import Client from "../components/Client"
import Volunteer from "../components/Volunteer"
import Donate from "../components/Donate"
import Contact from "../components/Contact"



const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/home" component={Home} />
      <PrivateRoute path="/app/profile" component={Details} />
      <PrivateRoute path="/app/admin" component={Admin} />
      <PrivateRoute path="/app/client" component={Client} />
      <PrivateRoute path="/app/volunteer" component={Volunteer} />
      <Donate path="/app/donate"/>
      <Contact path="/app/contact"/>
      <Login path="/app/login" />
      <SignUp path="/app/signup" />
    </Router>
  </Layout>
)

export default App