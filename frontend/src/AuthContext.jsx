import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
const TOKEN_KEY = 'ec-app-token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    fetch('http://localhost:8080/api/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('認証エラー')
        return res.json()
      })
      .then((data) => setUser(data))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'ログインに失敗しました')
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.user)
  }

  async function register(name, email, password, passwordConfirmation) {
    const res = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || '登録に失敗しました')
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.user)
  }

  async function logout() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
    }
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
