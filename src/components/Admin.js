import React from 'react'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

function Admin() {
  const [volunteers, setVolunteers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState([]);

	useEffect(() => {
    const getRequests = async() => {
      try {
        const listRequests = /* GraphQL */ `
          query ListRequests(
            $filter: ModelRequestFilterInput
            $limit: Int
            $nextToken: String
          ) {
            listRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
              items {
                id
                clientID
                details
                status
                _lastChangedAt
              }
              nextToken
              startedAt
            }
          }
        `
        const requests = await API.graphql({query: listRequests});
        setRequests(requests.data.listRequests.items);
      } catch(e){
        console.error('error getting data ', e)
      }
    };

    const getClients = async() => {
      try {
        const listClients = /* GraphQL */ `
            query ListClients(
              $filter: ModelClientFilterInput
              $limit: Int
              $nextToken: String
            ) {
              listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
                items {
                  name
                }
                nextToken
                startedAt
              }
            }
          `;
        const clients = (await API.graphql({query: listClients})).data.listClients.items;
        setClients(clients);
      } catch(e){
        console.error('error getting data ', e)
      }
    };

    const getVolunteers = async() => {
      try {
        const listVolunteers = /* GraphQL */ `
          query ListVolunteers(
            $filter: ModelVolunteerFilterInput
            $limit: Int
            $nextToken: String
          ) {
            listVolunteers(filter: $filter, limit: $limit, nextToken: $nextToken) {
              items {
                name
                email
                phone
              }
              nextToken
              startedAt
            }
          }
        `;
        const volunteers = await API.graphql({query: listVolunteers });
        setVolunteers(volunteers.data.listVolunteers.items);
      } catch(e) {
        console.error('error getting data ', e)
      }
    }

    try {
      getRequests();
      getClients();
      getVolunteers();
    } catch (e) {
      console.error('error getting data ', e)
    }
    
	}, []);
  
  return (
      <div>
        <h1>Admin</h1>
	      <p>You are now logged in as an Admin! <Link to="/app/profile">View profile</Link></p>
        <h2>Open Requests</h2>
        <table>
          <tr>
            <th>Details</th>
            <th>Client</th>
            <th>Status</th>
          </tr>
          {requests.map((r) => <tr><td>{r.details}</td><td>{r.clientID}</td><td>{r.status}</td></tr>)}
        </table> 
        
        <h2>Clients</h2>
        {clients.map((c) => <p>{c.name}</p>)}
        <h2>Volunteers</h2>
        {volunteers.map((v) => <p>{v.name} {v.email} {v.phone}</p>)}
      </div>
    )
  }

export default Admin