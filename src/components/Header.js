import React from "react";
import { connect } from "react-redux";
import styled  from "styled-components";
import { signOutApi } from "../actions";

function Header(props) {

    return(
        <Container>
            <Content>
                <Logo>
                    <a href="/home">
                        <img src="/images/home-logo.svg" alt="home logo" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input  placeholder="Search" />
                    </div>
                    <SearchIcon>
                        <img src="/images/search-icon.svg" alt="search icon" />
                    </SearchIcon>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className="active" >
                            <a>
                                <img src="/images/nav-home.svg" alt="nav home svg" />
                                <span>Home</span>
                            </a>
                        </NavList>

                        <NavList>
                            <a>
                                <img src="/images/nav-network.svg" alt="nav home svg" />
                                <span>My Network</span>
                            </a>
                        </NavList>

                        <NavList>
                            <a>
                                <img src="/images/nav-jobs.svg" alt="nav home svg" />
                                <span>Jobs</span>
                            </a>
                        </NavList>

                        <NavList>
                            <a>
                                <img src="/images/nav-messaging.svg" alt="nav home svg" />
                                <span>Messaging</span>
                            </a>
                        </NavList>

                        <NavList>
                            <a>
                                <img src="/images/nav-notifications.svg" alt="nav home svg" />
                                <span>Notifications</span>
                            </a>
                        </NavList>

                        <User>
                            <a>
                                {props.user && props.user.photoURL ? (
                                    <img src={props.user.photoURL} alt="user image" /> ) 
                                    : 
                                    <img src='/images/user.svg' alt="user image" /> 
                                }
                                <span>Me</span>
                                <img src="/images/down-icon.svg" alt="dropdown" />
                            </a>
                            <SignOut onClick={() => props.signOut()}>
                                <a>Sign Out</a>
                            </SignOut>
                        </User>
                        <Work>
                            <a>
                                <img src="/images/nav-work.svg" alt="work" />
                                <span>Work
                                    <img src="/images/down-icon.svg" alt="down icon" />
                                </span>
                            </a>
                        </Work>
                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0,0,0,.08);
    padding: 0 24px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 111;
`

const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    min-height: 100%;
    max-width: 1128px;
`

const Logo = styled.span`
    margin-right: 8px;
    font-size: 0px;
`

const Search = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
     & > div {
        max-width: 280px;
        input {
            border: none;
            box-shadow: none;
            background-color: #eef3f8;
            border-radius: 2px;
            color: rgba(0,0,0,0.9);
            width: 218;
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-weight: 400;
            font-size: 14px;
            height: 34px;
            border-color: #dce6f1;
            vertical-align: text-top;
        }
     }
`

const SearchIcon = styled.div`
    width: 40px;
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 2px;
    border-radius: 0 2px 2px 0;
    margin: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .15s;
    vertical-align: text-top;
`

const Nav = styled.nav`
    margin-left: auto;
    display: block;
     @media (max-width: 768px) {
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: white;
        width: 100%;
     }
`

const NavListWrap = styled.ul`
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;

    .active {
        span:after {
            content: '';
            transform: scaleX(1);
            height: 2px;
            bottom: 0;
            left: 0;
            position: absolute;
            transition: 200ms ease transform;
            width: 100%;
            background-color: rgba(0,0,0,.9);
        }
    }
`

const SignOut = styled.div`
    position: absolute;
    top: 45px;
    background: white;
    cursor: pointer;
    border-radius: 0 0 5px 5px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    transition-duration: 167ms;
    text-align: center;
    display: none;

    @media (max-width: 768px) {
        top: 20px;
        left: 0;
        background-color: aliceblue;
        font-weight: 600;
        border: 1px solid lightblue;
        overflow: hidden;
        border-radius: 10px;
        z-index: 1;
    }
`

const NavList = styled.li`
    display: flex;
    align-items: center;
    cursor: pointer;

    a {
        background-color: transparent;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 12px;
        font-weight: 400;
        justify-content: center;
        line-height: 1.5;
        min-height: 52px;
        min-width: 80px;
        position: relative;
        text-decoration: none;

        span {
            color: rgba(0,0,0, .6);
            display: flex;
            align-items: center;
        }

        @media (max-width: 768px) {
            min-width: 70px;
        }
    }
    
    &:hover , &:active {
        a {
            span {
                color: rgba(0,0,0,.9);
            }
        }
    }    

`

const User = styled(NavList)`
    position: relative;
    a > img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }

    a > span {
        display: flex;
        align-items: center;
    }

    :hover {
        ${SignOut} {
            align-items: center;
            display: flex;
            justify-content: center;
        }
    }
`

const Work = styled(User)`
    border-left: 1px solid rgba(0,0,0,.09);
`

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutApi()) 
})

export default connect(mapStateToProps , mapDispatchToProps)(Header)