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
  const [authReady, setAuthReady] = useState(false)
  const [authError, setAuthError] = useState('')

  const isMobileDevice = () => {
    if (typeof window === 'undefined') return false
    const ua = window.navigator.userAgent || ''
    const uaMobile = window.navigator.userAgentData?.mobile
    const coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches
    return Boolean(
      uaMobile ||
      coarsePointer ||
      /Android|iPhone|iPad|iPod|Windows Phone|Mobi/i.test(ua)
    )
  }

  const isInAppBrowser = () => {
    if (typeof window === 'undefined') return false
    const ua = window.navigator.userAgent || ''
    return /FBAN|FBAV|Instagram|Line|Twitter|LinkedInApp|WhatsApp|Snapchat|TikTok|Pinterest|wv|WebView/i.test(ua)
  }

  const isStandalone = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(display-mode: standalone)').matches
  }

  const shouldUseRedirect = () => {
    return isMobileDevice() || isInAppBrowser() || isStandalone()
  }

  const withTimeout = (promise, ms) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), ms)
      )
    ])
  }

  useEffect(() => {
    let isMounted = true
    
    const checkRedirect = async () => {
      try {
        const result = await withTimeout(getRedirectResult(auth), 5000)
        if (!isMounted) return
        if (result?.error) {
          console.error('Error en redirect de Google:', result.error)
          setAuthError(getErrorMessage(result.error.code))
        }
      } catch (error) {
        if (!isMounted) return
        if (error.message === 'timeout') {
          console.log('Redirect timeout, esperando estado de auth...')
        } else {
          console.error('Error en redirect:', error)
        }
      }
      if (isMounted) setRedirectChecked(true)
    }

    checkRedirect()

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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

        setDoc(doc(db, 'users', firebaseUser.uid), {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName,
          photoURL: firebaseUser.photoURL || null,
          providers,
          authProvider: providers[0] || 'password',
          lastLoginAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true }).catch((error) => {
          console.warn('No se pudo actualizar el usuario en Firestore:', error)
        })
      } else {
        if (isMounted) setUser(null)
      }
      if (isMounted) setAuthReady(true)
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (redirectChecked && authReady) {
      setLoading(false)
    }
  }, [redirectChecked, authReady])

  const login = async (email, password) => {
    try {
      setAuthError('')
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: getErrorMessage(error.code) }
    }
  }

  const register = async (email, password, name) => {
    try {
      setAuthError('')
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
      setAuthError('')
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      
      // Siempre intenta popup primero, incluso en móvil
      const result = await signInWithPopup(auth, provider)
      return { success: true, user: result.user }
    } catch (error) {
      console.error('Google login error:', error.code, error.message)
      
      if (error.code === 'auth/popup-blocked') {
        // Popup bloqueado, intenta redirect como fallback
        try {
          const provider = new GoogleAuthProvider()
          provider.setCustomParameters({ prompt: 'select_account' })
          await signInWithRedirect(auth, provider)
          return { success: true, redirect: true }
        } catch (redirectError) {
          console.error('Redirect fallback failed:', redirectError)
          setAuthError(getErrorMessage(redirectError.code))
          return { success: false, error: getErrorMessage(redirectError.code) }
        }
      }
      
      if (error.code === 'auth/web-storage-unsupported') {
        setAuthError('Tu navegador no permite iniciar sesión. Usa Chrome o Safari.')
        return { success: false, error: getErrorMessage(error.code) }
      }
      
      setAuthError(getErrorMessage(error.code))
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
      'auth/cancelled-popup-request': 'La solicitud de Google fue cancelada',
      'auth/unauthorized-domain': 'El dominio no está autorizado en Firebase Auth. Añádelo en la consola.',
      'auth/operation-not-supported-in-this-environment': 'Tu navegador no permite iniciar sesión con Google. Abre el enlace en Chrome o Safari.',
      'auth/web-storage-unsupported': 'El navegador bloquea el almacenamiento. Abre el enlace en Chrome o Safari.',
      'auth/redirect-cancelled-by-user': 'Se canceló el inicio de sesión con Google.'
    }
    return errors[code] || 'Ha ocurrido un error. Intenta de nuevo'
  }

  const clearAuthError = () => setAuthError('')

  const value = {
    user,
    loading,
    authError,
    clearAuthError,
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
