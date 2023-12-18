import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import { getRole } from '../Api/auth'
import axios from "axios"
export const AuthContext = createContext(null)

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  //Load user role
  useEffect(() => {
    if (user) {
      getRole(user.email).then(data => setRole(data))
    }
  }, [user])

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser && currentUser?.email) {


        // fetch(`${import.meta.env.VITE_API_URL}/jwt`, {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify({ email: currentUser.email }),
        // }).then(res => res.json())
        //   .then(data => {

        //     console.log(data)
        //     localStorage.setItem("access-token", data.token)
        //   })
        axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
          email: currentUser?.email,
        }).then(data => {
          console.log(data.data.token);
          localStorage.setItem("access-token", data.data.token)
          setLoading(false)
        })
      }
      else {
        localStorage.removeItem("access-token")
        setLoading(false)
      }
      // console.log('current user', currentUser)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    role,
    setRole,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
    user,
    loading,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
