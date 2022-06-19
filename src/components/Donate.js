import React from 'react'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

function Donate() {
  
  return (
      <div>
         <ul>
            <li>$Cash App: $TransHousingatl</li>
            <li>PayPal: transhousingatlanta@gmail.com</li>
        </ul> 
      </div>
    )
  }

export default Donate