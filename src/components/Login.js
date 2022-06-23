import React, { useEffect } from "react";
import styled from 'styled-components'
import { connect } from 'react-redux'
import { signInAPI } from '../actions/index'
import { useNavigate } from 'react-router-dom'

function Login(props) {

    const navigate = useNavigate()

    useEffect(() => {
        if(props.user) {
            navigate('/home')
        }
    })


    return (
        <Container>
            <Nav>
                <a href="/" >
                    <img src="/images/login-logo.svg" />
                </a>
                <div>
                    <Join>
                        Join now
                    </Join>
                    <SignIn>
                        Sign in
                    </SignIn>
                </div>
            </Nav>
            <Section>
                <Hero>
                    <h1>Welcome to your professional community</h1>
                    <img  src="/images/login-hero.svg" alt="hero image" />
                    
                </Hero>
                <Form>
                    <Google onClick={() => props.signIn()} >
                        <img src="/images/google.svg" alt="google logo" />
                        Sign in with Google
                    </Google>
                </Form>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    padding: 0;
`

const Nav = styled.nav`
    max-width: 1128px;
    margin: auto;
    padding: 12px 0 16px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    flex-wrap: no-wrap;

    a {
        width: 135px;
        height: 34px;
        @media(max-width: 768px) {
            padding: 0 5px;
        }
    }
`

const Join = styled.button`
    border: none;
    background-color: transparent;
    font-size: 16px;
    padding: 10px 12px;
    text-decoration: none;
    color: rgba(0,0,0,0.6);
    margin-right: 12px;
    border-radius: 4px;
    cursor: pointer;
    
    :hover {
        background-color: rgba(0,0,0,0.08);
        color: rgba(0,0,0,0.9);
        text-decoration: none;
    }

`

const SignIn = styled.button`
    border: none;
    background-color: rgba(0,0,0,0);
    font-size: 16px;
    box-shadow: inset 0 0 0 1px #0a66c2;
    padding: 10px 24px;
    color: #0a66c2;
    border-radius: 24px;
    transition-duration: 167ms;
    font-weight: 600;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: rgba(112, 101, 249,0.15);
        color: #0a66c2;
        text-decoration: none;
    }

`

const Section = styled.section`
    display: flex;
    align-content: flex-start;
    min-height: auto;
    padding-bottom: 138px;
    padding-top: 40px;
    padding: 60px 0;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1128;
    align-items: center;
    margin: auto;
    @media (max-width: 768px) {
        min-height: 0;
        margin: auto;
    }
`

const Hero = styled.div`
    width: 100%;

    h1 {
        padding-bottom: 0;
        width: 55%;
        font-size: 56px;
        color: #2977c9;
        font-weight: 200;
        line-height: 70px;
        @media (max-width: 768px) {
            text-align: center;
            font-size: 20px;
            width: 100%;
            line-height: 2;
        }
    }

    img {
        z-index: -1;
        width: 700px;
        height: 670px;
        position: absolute;
        bottom: -2px;
        right: -150px;
        @media (max-width: 768px) {
            top: 230px;
            width: initial;
            position: initial;
            height: initial;
        }
    }

`

const Form = styled.div`

    margin-top: 100px;
    width: 408px;
    @media (max-width: 768px) {
        margin-inline: auto;
        margin-top: 20px;
    }

`
const Google = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: none;
    height: 56px;
    width: 100%;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%) , inset 0 0 0 2px rgb(0 0 0 / 0%) ,
    inset 0 0 0 1px rgb(0 0 0 / 0%);
    vertical-align: middle;
    z-index: 0;
    cursor: pointer;
    transition-duration: 167ms;
    font-size: 20px;
    color: rgba(0,0,0, 0.6);
    padding: 10px 12px;
    border-radius: 28px;

    &:hover {
        background-color: rgba(207,207,207 , 0.25);
        color: rgba(0,0,0,0.75);
    }
`

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signInAPI())
})


export default connect(mapStateToProps , mapDispatchToProps)(Login)