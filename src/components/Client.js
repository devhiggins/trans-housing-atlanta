import React from 'react'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import {getCurrentUser} from '../utils/auth'
import { v4 as uuidv4 } from 'uuid';

function Client() {
    const [requests, setRequests] = useState([]);
    const [details, setDetails] = useState('');

    useEffect(() => {
        const getRequests = async() => {
            try {
                const requests = (await API.graphql({query: queries.listRequests})).data.listRequests.items;
                console.log(requests);
                setRequests(requests);
            } catch(e){
                console.error('error getting data ', e)
            }
        };

        try {
            getRequests();  
        } catch (e) {
            console.error('error getting data ', e)
        }
	}, []);

    const submitRequest = async () => {
        console.log(details);
        const requestDetails = {
            id: uuidv4(),
            details: details,
            status: 'NEW',
            clientID: getCurrentUser().username,
        };
        
        const newRequest = await API.graphql({ query: mutations.createRequest, variables: {input: requestDetails}});
        console.log(newRequest);
    }
  
  return (
      <div>
        <h1>Client</h1>
	      <p>You are now logged in as a Client! <Link to="/app/profile">View profile</Link></p>
        <h2>Open Requests</h2>
        {requests.map((request) => <p>{request.details}</p>)}
        <h2>Create a Request</h2>
        <div>
            <input
                onChange={(e) => setDetails(e.target.value)}
                placeholder='details'
                name='details'
                value={details}
                type='text'
            />
        </div>
        <button onClick={submitRequest}>Submit Request</button>
      </div>
    )
  }

export default Client