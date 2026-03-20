import { createContext, useContext, useEffect, useState } from 'react'
import { 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [redirectChecked, setRedirectChecked] = useState(false)

  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false
    return /Android|iPhone|iPad|iPod|Windows Phone|Mobi/i.test(window.navigator.userAgent)
  }

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        await getRedirectResult(auth)
      } catch (error) {
        console.error('Error en redirect de Google:', error)
      } finally {
        setRedirectChecked(true)
      }
    }

    checkRedirect()

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const providers = (firebaseUser.providerData || [])
          .map((provider) => provider.providerId)
          .filter(Boolean)
        const displayName = firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Usuario')

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName,
          photoURL: firebaseUser.photoURL || null,
          providers
        })
        
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName,
          photoURL: firebaseUser.photoURL || null,
          providers,
          authProvider: providers[0] || 'password',
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true })
      } else {
        setUser(null)
      }
      if (redirectChecked) setLoading(false)
    })

    return () => unsubscribe()
  }, [redirectChecked])

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) }
    }
  }

  const register = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, { displayName: name })
      
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email,
        displayName: name,
        providers: ['password'],
        authProvider: 'password',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      })
      
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      if (isMobileDevice()) {
        await signInWithRedirect(auth, provider)
        return { success: true, redirect: true }
      }
      const result = await signInWithPopup(auth, provider)
      return { success: true, user: result.user }
    } catch (error) {
      if (
        error.code === 'auth/popup-blocked' ||
        error.code === 'auth/popup-closed-by-user' ||
        error.code === 'auth/cancelled-popup-request'
      ) {
        try {
          const provider = new GoogleAuthProvider()
          provider.setCustomParameters({ prompt: 'select_account' })
          await signInWithRedirect(auth, provider)
          return { success: true, redirect: true }
        } catch (redirectError) {
          return { success: false, error: getErrorMessage(redirectError.code) }
        }
      }
      return { success: false, error: getErrorMessage(error.code) }
    }
  }

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const getErrorMessage = (code) => {
    const errors = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/user-not-found': 'No existe una cuenta con este correo',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/invalid-credential': 'Credenciales inválidas',
      'auth/popup-closed-by-user': 'Se cerró la ventana de Google antes de completar',
      'auth/popup-blocked': 'El navegador bloqueó la ventana emergente. Permítela e intenta de nuevo',
      'auth/cancelled-popup-request': 'La solicitud de Google fue cancelada'
    }
    return errors[code] || 'Ha ocurrido un error. Intenta de nuevo'
  }

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    register,
    resetPassword,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
