import React , { useState } from "react";
import styled from "styled-components";
import { IoMdClose } from 'react-icons/io'
import { BsCardImage } from 'react-icons/bs'
import { RiVideoFill } from 'react-icons/ri'
import { FaComment } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { getArticlesAPI, postArticleAPI } from '../actions/index'
import { serverTimestamp } from 'firebase/firestore'

function PostModal(props) {

    const [editorText , setEditorText] = useState('')
    const [shareImg , setShareImg] = useState('')
    const [videoLink , setVideoLink] = useState('')
    const [assetArea , setAssetArea] = useState('')

    const handleChange = (e) => {
        const image = e.target.files[0]

        if(image === '' || image === undefined) {
            alert(`Not an image, the file is ${typeof image}`)
            return;
        }

        setShareImg(image)
    }

    const switchAssetArea = (area) => {
        setShareImg('')
        setVideoLink('')
        setAssetArea(area)
    }

    const postArticle = (e) => {
        e.preventDefault()
        if(e.target != e.currentTarget) {
            return;
        }
        
        const payload = {
            video: videoLink,
            image: shareImg,
            user: props.user,
            timestamp: serverTimestamp(),
            description: editorText
        }
        props.postArticle(payload)
        reset(e)

    }
    
    const reset = (e) => {
        setEditorText('')
        setShareImg('')
        setVideoLink('')
        setAssetArea('')
        props.handleClick(e)
    }

    return (
        <>
        { props.showModal === 'open' ?
            <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button onClick={(event) => reset(event)} >
                            <IoMdClose />
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            {props.user && props.user.photoURL ?  
                                <img src={props.user.photoURL} alt="user" />
                                :
                                <img src="/images/user.svg" alt="user" />
                            }
                            <span>{props.user.displayName}</span>
                        </UserInfo>
                        <Editor>
                            <textarea 
                                value={editorText}
                                onChange={(e) => setEditorText(e.target.value)}
                                placeholder='What do you want to talk about ?'
                                autoFocus={true}
                            />
                            { assetArea === 'image' ?
                            <UploadImage>
                                <input  type='file' 
                                        accept="image/gif , image/jpeg , image/png"
                                        name="image"
                                        id="file" 
                                        style={{display: 'none'}}
                                        onChange={handleChange}/>
                                <p>
                                    <label  htmlFor="file">
                                        Select an image to share
                                    </label>
                                </p>
                                {shareImg && <img src={URL.createObjectURL(shareImg)} />}
                            </UploadImage> 
                                : 
                                assetArea === 'media' ?
                                <>
                                    <input type='text' placeholder="Please input a video link" 
                                        value={videoLink}
                                        onChange={(e) => setVideoLink(e.target.value)}
                                    />
                                    {videoLink && <ReactPlayer width={'100%'} url={videoLink} controls />}
                                </> : ''
                            } 
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <AttachAssets>
                            <AssetButton>
                                <BsCardImage onClick={() => switchAssetArea('image')} />
                            </AssetButton>
                            <AssetButton onClick={() => switchAssetArea('media')}>
                                <RiVideoFill />
                            </AssetButton>
                        </AttachAssets>
                        <ShareComment>
                            <AssetButton>
                                <FaComment />
                                Anyone
                            </AssetButton>
                        </ShareComment>
                        <PostButton disabled={!editorText ? true : false} onClick={(event) => {
                            postArticle(event)
                        }} >
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container> : '' }
        </>
    )
}


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn .3s ease;
    transform-origin: top center;
`

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: auto;
    box-shadow: 15px 20px 20px -10px black;
`

const Header = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        width: 100%;
        margin-left: 40px;
        font-size: 25px;
        color: black;
        text-align: center;
        border-bottom: 1px solid rgba(0,0,0,0.15);
    }
    button {
        height: 40px;
        width: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: auto;
        color: rgba(0,0,0,0.15);
        font-size: 30px;
        border: none;
        margin-top: -10px;
        margin-right: -10px;
        background-color: transparent;
        cursor: pointer;

        svg , img {
            pointer-events: none;
            color: red;
        }
    }
`

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;

    svg , img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }

    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`

const AttachAssets = styled.div`
    display: flex;
    align-items: center;
    padding-right: 8px;
    width: 90px;
    justify-content: space-between;
`

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    min-width: 40px;
    color: rgba(0,0,0,0.5);
    border: none;
    box-shadow: 0 0 3px 0 black;
    border-radius: 5px;
    transition: 300ms ease background-color;
    cursor: pointer;

    :hover {
        background-color: rgba(0,0,0,0.15) !important;
    }
    
    svg {
        font-size: 28px;
    }

    :first-child svg {
        color: coral;
    }

    :nth-child(2) svg{
        color: red;
        font-size: 30px;
    }
`

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0,0.15);
    ${AssetButton} {
        svg {
            margin-right: 5px;
            color: lightblue;
        }
        color: black;
        font-weight: 600;
        background-color: aliceblue;    
    }
`

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${props => props.disabled ? 'rgba(0,0,0,0.8)' : '#0a66c2'};
    color: ${props => props.disabled ? 'rgba(1,1,1,0.2)' : 'white'};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.disabled ? 'rgba(0,0,0,0.08)' : '#004182'};
    }
`

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
        padding: 6px 8px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        border-radius: 5px;
        margin-bottom: 5px;
        border: none;
        outline: none;
        box-shadow: 0 0 3px 1px black;
    }

    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: none;
        padding: 3px 8px;
        box-shadow: 0 0 3px 1px black;
    }
`

const UploadImage = styled.div`
    text-align: center;
    img {
        width: 100%;
    }

    p label {
        color: coral;
        text-shadow: 0 0 5px aliceblue;
        letter-spacing: 1.1px;
    }
`

const mapState = (state) => {
    return {
        user: state.userState.user,
        loading: state.articleState.loading
    }
}

const mapDispatch = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload))
})

export default connect(mapState , mapDispatch)(PostModal);
