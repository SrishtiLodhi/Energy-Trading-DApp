import React, { useContext, useState, useEffect } from "react"

const API_BASE = "http://localhost:5500";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
//   const [loading, setLoading] = useState(true)

  async function signup(email, password, name, wallet) {

    const data = await fetch(API_BASE + '/profile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            walletid: wallet,
            email: email,
            name: name,
            password: password
        })
    }).then(res => res.json())

    if(data.hasOwnProperty('error')){
        throw new Error(data.error);
    }
    else{
        setCurrentUser(data)
    }
  }

  async function login(email, password, wallet) {
    const data = await fetch(API_BASE + '/profile', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            walletid: wallet,
            email: email,
            password: password
        })
    }).then(res => res.json())

    if(data.hasOwnProperty('error')){
        throw new Error(data.error);
    }
    else{
        console.log(data)
        setCurrentUser(data)
    }
  }

  async function logout() {
    const data = await fetch(API_BASE + '/logout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())

    if(data.hasOwnProperty('error')){
        throw new Error(data.error);
    }
    else{
        setCurrentUser()
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    fetch(API_BASE + "/profile")
    .then(res => res.json())
    .then((data) => {
        if(data.hasOwnProperty('error')){
            setCurrentUser()
        }
        else{
            setCurrentUser(data)
        }
    }
    )
    .catch(err => console.log(err));
  }

  const value = {
    currentUser,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
