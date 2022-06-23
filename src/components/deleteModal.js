import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

function deleteModal(props) {
    return (
        <>
            {props.showDeleteModal ? (
            <Container>
                <Content>
                    <Text>Do you want to delete this post surely ?</Text>
                    <div>
                        <button onClick={() => props.cancelModal()} >Cancel</button>
                        <button onClick={() => props.deleteDocument()} >Delete</button>
                    </div>
                </Content>
            </Container>) : ''}
        </>

    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: deleteModalAnm 500ms ease;
    transform-origin: top center;

    div:nth-child(2) {
        display: flex;
        align-items: center;
        button {
            width: 200px;
            border-radius: 20px;
            padding: 10px 12px;
            cursor: pointer;
            font-size: 18px;
            transition: 300ms ease background-color;
            border: none;
            box-shadow: 0 0 5px 0 black;
            color: red;
            :hover {
                background-color: rgba(0,0,0,0.3);
            }
            :active {
                transform: scale(.95);
            }
            :first-child {
                margin-right: 40px;
                color: greenyellow;
            }
        }
    }
`

const Content = styled.div`
    width: 500px;
    max-width: 700px;
    height: 200px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    box-shadow: 0 0 10px 0 black;
    animation: deleteModalContentAnm .7s ease ;

`

const Text = styled.div`
    font-size: 20px;
    font-weight: 600;
`

const mapState = (state) => {
    return {

    }
}
const mapDispatch = (dispatch) => ({})

export default connect(mapState , mapDispatch)(deleteModal)