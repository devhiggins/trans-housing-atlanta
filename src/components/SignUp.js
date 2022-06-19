import React from "react"
import { navigate} from "@reach/router"
import { Link } from 'gatsby'
import Error from './Error'
import { Auth, API } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import VolunteerSignUp from "./VolunteerSignUp"
import ApplicantSignUp from "./ApplicantSignUp"

const initialState = {
  signUpChoice: 'volunteer',
}


class SignUp extends React.Component {
  state = initialState;

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <label for="signUpChoice">type of sign up:</label>
        <select name="signUpChoice" id="signUpChoice" onChange={this.handleUpdate}>
          <option value="volunteer">volunteer</option>
          <option value="applicant">housing applicant</option>
        </select> 
        {this.state.signUpChoice == 'volunteer' && <VolunteerSignUp/>}
        {this.state.signUpChoice == 'applicant' && <ApplicantSignUp/>}
        <Link to="/app/login">Sign In</Link>
      </div>
    )
  }
}

const styles = {
  input: {
    height: 40, margin: '10px 0px', padding: 7
  },
  formContainer: {
    display: 'flex', flexDirection: 'column'
  },
  button: {
    backgroundColor: 'rebeccapurple', padding: '15px 7px', cursor: 'pointer', textAlign: 'center', marginBottom: 10
  },
  buttonText: {
    color: 'white'
  }
}

export default SignUp