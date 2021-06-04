import styled from 'styled-components'
import {auth, db } from '../firebase'
import { useAuthState}  from 'react-firebase-hooks/auth'
import moment from 'moment';

export default function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth)
    const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <TimeStamp>
                {message ? moment(message.timestamp).format('LT'):""}
                </TimeStamp>
                </TypeOfMessage>

        </Container>
    )
}

const Container = styled.div``

const MessageElement = styled.div`
width: fit-content;
padding: 15px;
border-radius: 8px;
margin: 10px;
min-width: 60px;
padding-bottom: 26px;
position: relative;
text-align: right;
`
const Sender = styled(MessageElement)`
background-color: #dcf8c6;
margin-left:auto;`

const Receiver = styled(MessageElement)`
background-color: white;
text-align: left;

`
const TimeStamp = styled.span`
color:grey;
padding: 10px;
font-size:9px;
position: absolute;
bottom: 0;
text-align: right;
right: 0;
`


