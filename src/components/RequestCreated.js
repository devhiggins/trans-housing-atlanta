import notifyToSlackChannel from 'react-slack-notification';
import React from 'react'
import { Link } from 'gatsby'
import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import {getCurrentUser} from '../utils/auth'
import { v4 as uuidv4 } from 'uuid';

function RequestCreated(props) {
    try{
        console.log('sending slack messsage');
        const slackMessage = `@here request has been created by ${getCurrentUser().username}\n${props.details}`;
        const webhookUrl = 'https://hooks.slack.com/services/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';
        notifyToSlackChannel(webhookUrl, slackMessage);
        alert('request has been submitted!');
    } catch(e) {
        console.error('error sending slack message ', e);
    }

    return (<div><p>request submitted</p></div>)
}

export default RequestCreated