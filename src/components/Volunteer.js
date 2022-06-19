import React from 'react'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

function Volunteer() {
  const [requests, setRequests] = useState([]);

	useEffect(() => {
    const getRequests = async() => {
      try {
        const requests = await API.graphql({query: queries.listRequests});
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
  
  return (
      <div>
        <h1>Volunteer</h1>
	      <p>You are now logged in as a Volunteer! <Link to="/app/profile">View profile</Link></p>
        <h2>Open Requests</h2>
      </div>
    )
  }

export default Volunteer