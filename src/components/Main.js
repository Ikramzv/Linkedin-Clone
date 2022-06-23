import React , { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPhotoVideo, FaRegCommentDots , FaEllipsisH } from 'react-icons/fa'
import { MdVideoLibrary, MdEvent, MdDelete } from 'react-icons/md'
import { RiArticleLine , RiSendPlaneFill } from 'react-icons/ri'
import { AiOutlineLike } from 'react-icons/ai'
import { IoMdShareAlt } from 'react-icons/io'
import { connect } from "react-redux";
import PostModal from './PostModal'
import { deleteArticleAPI, getArticlesAPI } from "../actions/index";
import ReactPlayer from "react-player";
import DeleteModal from "./deleteModal";

function Main(props) {
    
    const [showModal , setShowModal] = useState('close')
    const [showDeleteModal , setShowDeleteModal] = useState(false)
    const [deletedItemId , setDeletedItemId] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        if(e.target !== e.currentTarget) {
            return;
        }
        switch (showModal) {
            case 'open': 
                setShowModal('close')
                break;
            case 'close':
                setShowModal('open')
                break;
            default: 
                setShowModal('close')
                break;
        }
    }

    // console.log(doc(collection(db , 'articles') , "/id = e5IUeH6AehSunOU1l3cp"))

    function deleteDocument() {
        if(showDeleteModal) {
            setShowDeleteModal(false)
        }

        props.deleteDocumentFromFirebase(deletedItemId)
    }
    
    useEffect(() => {
        props.getArticles()
    }, [])


    return (
        <>
            <Container>
                <ShareBox>
                    <div>
                        {props.user && props.user.photoURL ? (
                            <img src={props.user.photoURL} alt="user image" />                        
                        )   : 
                            <img src="/images/user.svg" alt="user image" />
                        }
                        <button onClick={handleClick} disabled={ props.loading ? true : false }>Start a post</button>
                    </div>
                    <div>
                        <button>
                            <FaPhotoVideo style={{color: 'lightblue' , width: '20px' , height: '20px' , margin: '0 4px 0 -2px'}} />
                            <span>Photo</span>
                        </button>

                        <button>
                            <MdVideoLibrary  style={{color: 'lightgreen' , width: '20px' , height: '20px' , margin: '0 4px 0 -2px'}} />
                            <span>Video</span>
                        </button>

                        <button>
                            <MdEvent style={{color: 'lightcoral' , width: '20px' , height: '20px' , margin: '0 4px 0 -2px'}} />
                            <span>Event</span>
                        </button>

                        <button>
                            <RiArticleLine  style={{color: 'lightsteelblue' , width: '20px' , height: '20px' , margin: '0 4px 0 -2px'}}/>
                            <span>Write article</span>
                        </button>
                    </div>
                </ShareBox>
                
                { props.articles.length === 0 ? 
                    <>
                        {props.loading ? (
                        <img src="/images/loader.gif" alt="loader spinner" />) : ''}
                        <p>There are no articles</p>
                    </>
                    : 
                <Content>
                    {   props.loading && <img src="/images/loader.gif" alt="loader spinner" />}
                    {props?.articles.length > 0 && 
                        props?.articles.map((article , key) => {
                            return(
                                <Article key={key} >
                                    <SharedActor>
                                        <a>
                                            <img src={article?.actor.image} style={{borderRadius: '10px'}} alt="user svg" />
                                            <div>
                                                <span>{article?.actor.title}</span>
                                                <span>{article?.actor.description}</span>
                                                <span style={{fontWeight: '600'}} >{article?.actor.date.toDate().toLocaleDateString()}</span>
                                            </div>
                                        </a>
                                        <button>
                                            <MdDelete onClick={() => {
                                                setShowDeleteModal(!showDeleteModal)
                                                setDeletedItemId(article.id)
                                            }}/>
                                            <FaEllipsisH />
                                        </button>
                                    </SharedActor>
                                    <Description>
                                        {article?.description}
                                    </Description>
                                    <SharedImg>
                                        <a>
                                            {article?.sharedImg ? 
                                            <img src={article?.sharedImg} alt="shared image" /> : 
                                            article?.video ? 
                                            <ReactPlayer url={article?.video} width='100%' controls />
                                            : ''
                                            }
                                        </a>
                                    </SharedImg>
                                    <SocialCounts>
                                        <li>
                                            <button>
                                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="social like btn" />
                                                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="social btn" />
                                                <span>75</span>
                                            </button>
                                        </li>
                                        <li>
                                            <a>
                                                {article.comments}
                                            </a>
                                        </li>
                                    </SocialCounts>
                                    <SocialActions>
                                        <button>
                                            <AiOutlineLike  style={{color: '#70b5f9'}}  />
                                            <span>Like</span>
                                        </button>
                                        <button>
                                            <FaRegCommentDots  style={{color: '#70b5f9'}}  />
                                            <span>Comments</span>
                                        </button>
                                        <button>
                                            <IoMdShareAlt  style={{color: '#70b5f9'}}  />
                                            <span>Share</span>
                                        </button>
                                        <button>
                                            <RiSendPlaneFill style={{color: '#70b5f9'}}   />
                                            <span>Send</span>
                                        </button>
                                    </SocialActions>
                                </Article> )
                    })
                }
                </Content>
                }
                <PostModal showModal={ showModal } getArticles={props.getArticles} handleClick={handleClick} />
                <DeleteModal showDeleteModal={showDeleteModal} cancelModal = {() => setShowDeleteModal(false)} deleteDocument = {deleteDocument} />
            </Container>
        </>
    )
}

const Container = styled.div`
    grid-area: main;
`

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%) , 0 0 0 rgb(0 0 0 / 20%);
`

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;

    div {
        button {
            outline: none;
            color: rgba(0,0,0,0.6);
            font-size: 14px;
            min-height: 48px;
            line-height: 1.5;
            background: transparent;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            border: none;
            display: flex;
            font-weight: 600;
            cursor: pointer;
            svg {
                color: black;
            }
        }
        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px 0;
            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }

            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0,0,0,0.15);
                background: white;
                text-align: left;
                cursor: pointer;
            }
        }

        &:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;
            span {
                color: #70b5f9;
            }
        }
    }
`


const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: wrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img {
            width: 48px;
            height: 48px;
        }

        div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span {
                text-align: left;

                :first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0,0,0);
                }

                &:nth-child(n+1) {
                    font-size: 12px;
                    color: rgba(0,0,0,0.6);
                }
            }
        }
    }

    button {
        position: absolute;
        display: inline-flex;
        width: 80px;
        justify-content: space-between;
        align-items: center;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        font-size: 25px;
        color: rgba(0,0,0,0.7);

        svg:first-child {
            cursor: pointer;
            :hover {
                color: rebeccapurple;
            }
            :active {
                transform: scale(1.15);
            }
        }
    }
`

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    text-align: left;
`
const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img {
        width: 100%;
        object-fit: cover;
        height: 100%;
    }
`

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 2px solid #e9e5df;
    list-style: none;
    li {
        margin-right: 5px;
        font-size: 12px;
        button {
            border: none !important;
            background-color: white !important;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }
`

const SocialActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 4px 8px;
    min-height: 40px;
    border: none;
    background-color: white;
    
    button {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        cursor: pointer;
        border: none;
        margin-right: 5px;
        border-radius: 6px;
        transition: 300ms ease background-color;
        :hover {
            background-color: lightblue;
        }
        span {
            margin-left: 3px;
        }

        svg {
            font-size: 16px;
        }

        @media (min-width: 768px) {
            span {
                margin-left: 8px;
            }
        }
    }
`

const Content = styled.div`
    
`

const mapState = (state) => {
    return {
        user: state.userState.user,
        loading: state.articleState.loading,
        articles: state.articleState.articles
    }
}

const mapDispatch = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI()),
    deleteDocumentFromFirebase: (id) => dispatch(deleteArticleAPI(id))
})

export default connect(mapState , mapDispatch)(Main)