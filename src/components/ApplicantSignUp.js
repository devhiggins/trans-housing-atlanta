import React from "react"
import { navigate} from "@reach/router"
import { Link } from 'gatsby'
import Error from './Error'
import { Auth, API } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

const initialState = {
    username: ``,
    name: "",
    password: ``,
    email: '',
    pronouns: '',
    phone_number: '',
    needs: [],
    authCode: '',
    stage: 0,
    error: ''
};

class ApplicantSignUp extends React.Component {
    
    state = initialState;

    handleUpdate = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        })
    }

    signUp = async() => {
        const { username, password, email, phone_number } = this.state
        try {
            await Auth.signUp({ username, password, attributes: { email, phone_number }})
            this.setState({ stage: 1 })
        } catch (err) {
            this.setState({ error: err })
            console.log('error signing up...', err)
        }
    }

    confirmSignUp = async() => {
        const { username, authCode } = this.state
        try {
            await Auth.confirmSignUp(username, authCode)
            await this.createClient();
            alert('Successfully signed up!')
            navigate("/app/login")
        } catch (err) {
            this.setState({ error: err })
            console.log('error confirming signing up...', err)
        }
    }

    createClient = async() => {
        const { username, name, email, phone_number, needs, pronouns } = this.state
        const clientDetails = {
            id: username,
            name: name,
            email: email,
            needs: needs,
            phone: phone_number,
            pronouns: pronouns,
        };
        
        const newClient = await API.graphql({ query: mutations.createClient, variables: {input: clientDetails}});
        console.log(newClient);
    }
    
    render() {
        return (
            <div style={styles.formContainer}>
                    {this.state.error && <Error errorMessage={this.state.error}/>}
                    <input
                        onChange={this.handleUpdate}
                        placeholder='Username'
                        name='username'
                        value={this.state.username}
                        style={styles.input}
                    />
                    <input
                        onChange={this.handleUpdate}
                        placeholder='name'
                        name='name'
                        value={this.state.name}
                        style={styles.input}
                    />
                    <input
                        onChange={this.handleUpdate}
                        placeholder='Password'
                        name='password'
                        value={this.state.password}
                        type='password'
                        style={styles.input}
                    />
                    <input
                        onChange={this.handleUpdate}
                        placeholder='Email'
                        name='email'
                        value={this.state.email}
                        style={styles.input}
                    />
                    <input
                        onChange={this.handleUpdate}
                        placeholder='Phone Number'
                        name='phone_number'
                        value={this.state.phone_number}
                        style={styles.input}
                    />
                    <select name="pronouns" id="pronouns" onChange={this.handleUpdate}>
                        <option value="she/her">she/her</option>
                        <option value="he/him">he/him</option>
                        <option value="they/them">they/them</option>
                    </select> 
                    <h4>Select all that you need:</h4>
                        <input type="checkbox" id="housing" name="housing" value="housing"/>
                        <label for="housing">housing</label>
                        <input type="checkbox" id="food" name="food" value="food"/>
                        <label for="food">food</label>
                        <input type="checkbox" id="transportation" name="transportation" value="transportation"/>
                        <label for="transportation">transportation</label>
                        <input type="checkbox" id="license" name="license" value="license"/>
                        <label for="license">license/id card</label>
                    <div style={styles.button} onClick={this.signUp}>
                        <span style={styles.buttonText}>Sign Up</span>
                    </div>
         {
          this.state.stage === 1 && (
            <div style={styles.formContainer}>
              {this.state.error && <Error errorMessage={this.state.error}/>}
              <input
                onChange={this.handleUpdate}
                placeholder='Authorization Code'
                name='authCode'
                value={this.state.authCode}
                style={styles.input}
              />
              <div style={styles.button} onClick={this.confirmSignUp}>
                <span style={styles.buttonText}>Confirm Sign Up</span>
              </div>
            </div>
          )
        }
                </div>
        );
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

export default ApplicantSignUp;