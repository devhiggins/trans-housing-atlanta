import React from 'react'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';

function Contact() {
  
  return (
      <div>
         <p>    
            transhousingatlanta@gmail.com
            transhousingatlanta.org
            Facebook: https://www.facebook.com/THAPhouse/
            Twitter: https://twitter.com/THAP_House
        </p>
      </div>
    )
  }

export default Contact