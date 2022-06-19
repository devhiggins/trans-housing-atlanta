import React from 'react'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { API, sectionFooterSecondaryContent } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import {getCurrentUser} from '../utils/auth'
import { v4 as uuidv4 } from 'uuid';
import RequestCreated from './RequestCreated';


function Client() {
    const [requests, setRequests] = useState([]);
    const [details, setDetails] = useState('');
    const [requestSubmitted, setRequestSubmitted]  = useState(false);

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
        setRequestSubmitted(false);
        console.log(details);
        const requestDetails = {
            id: uuidv4(),
            details: details,
            status: 'NEW',
            clientID: getCurrentUser().username,
        };
        
        const newRequest = await API.graphql({ query: mutations.createRequest, variables: {input: requestDetails}});
        console.log(newRequest);
        setRequestSubmitted(true);
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
                onChange={(e) => {
                        setDetails(e.target.value);
                        setRequestSubmitted(false);
                    }
                }
                placeholder='details'
                name='details'
                value={details}
                type='text'
            />
        </div>
        <button onClick={submitRequest}>Submit Request</button>
        {requestSubmitted && <RequestCreated details={details}/>}
      </div>
    )
  }

export default Client