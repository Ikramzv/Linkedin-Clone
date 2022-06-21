import { signInWithPopup, setPersistence , browserSessionPersistence } from "firebase/auth";
import { auth , provider, storage } from "../firebase/firebase";
import { ref , uploadBytesResumable , getDownloadURL } from 'firebase/storage'
import { SET_USER , SET_LOADING_STATUS , GET_ARTICLES } from "./actionType";
import db from '../firebase/firebase'
import { collection , addDoc , orderBy, query, getDocs, deleteDoc, doc } from 'firebase/firestore'


export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS ,
    status: status
})

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload
})

export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth , provider).then((payload) => {
            dispatch(setUser(payload.user))
            console.log(payload);
        }).catch((err) => alert(err.message))
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setUser(user))
            }
        })
    }
}


export function signOutApi() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null))
        }).catch((err) => console.log(err))
    }
}


export function postArticleAPI(payload) {
    return (dispatch) => {
        dispatch(setLoading(true))
        if(payload.image != '') {
            const upload = uploadBytesResumable(ref(storage , `images/${payload.image.name}`) , payload.image);
            return upload.on('state_changed' , (snap) => {
                    const progress = Math.floor((snap.bytesTransferred / snap.totalBytes) * 100)
                    console.log(`Progress: ${progress}`)
                    if(snap.state == 'running') {
                        console.log(`Progress : ${progress}`)
                    }
                } , (error) => {
                    console.log(error.code);
                } , async () => {
                    await getDownloadURL(upload.snapshot.ref).then((url) => {
                        addDoc(collection(db , 'articles') , {
                            actor: {
                                description: payload.user.email,
                                title: payload.user.displayName ,
                                date: payload.timestamp,
                                image: payload.user.photoURL
                            },
                            video: '',
                            sharedImg: url,
                            comments: 0,
                            description: payload.description
                        })
                        dispatch(setLoading(false))
                    })
                })
        }else if(payload.video) {
            addDoc(collection(db , 'articles') , {
                actor: {
                    description: payload.user.email ,
                    title: payload.user.displayName,
                    date: payload.timestamp,
                    image: payload.user.photoURL
                },
                video: payload.video,
                sharedImg: '',
                comments: 0,
                description: payload.description
            })
            dispatch(setLoading(false))
        }
    }
}


export function getArticlesAPI() {
    return (dispatch) => {
        let payload;
        const collectionRef = collection(db , 'articles')
        const q = query(collectionRef , orderBy('actor.date' , 'desc'))
        getDocs(q).then((snapshot) =>{
            payload = snapshot.docs.map((item) => {
                return item.data()
            })
            dispatch(getArticles(payload))
            console.log(payload)
        })
    }
}


// export function deleteArticleAPI() {
//     return (dispatch) => {
//         const collectionRef = collection(db,'articles')
//         deleteDoc(doc(collectionRef , ))
//     }
// }