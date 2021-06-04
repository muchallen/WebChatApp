import styled from 'styled-components'
import Head from "next/head"
import {auth, provider} from '../firebase'
import {Button} from '@material-ui/core'

 function Login() {
     const signIn = () => {
         auth.signInWithPopup(provider).catch(alert)
         
     }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo
                src="https://1.bp.blogspot.com/-PM8_Rig8V0M/XxFkv-2f3hI/AAAAAAAACSU/vB1BqbuhFCMyJ8OGCVstFiMLFmavCLqrwCPcBGAYYCw/s400/whatsapp-logo-1.png" />
                <Button onClick={signIn}>Sign in with Google</Button>

                
            </LoginContainer>

        </Container>
    )
}

export default Login


const Container=styled.div`
display:grid;
place-items: center;
height:100vh;
background-color:whitesmoke;
`;

const LoginContainer = styled.div`
padding: 100px;
display: flex;
flex-direction:column;
align-items: center;
background-color:white;
border-radius: 5px;
box-shadow:0px 4px 14px -3px rgba(0,0,0,0.7)
`;

const Logo = styled.img`
height:200px;
width:200px;
margin-bottom: 50px;
`;


