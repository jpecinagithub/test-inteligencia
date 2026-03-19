import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import PreTest from './pages/PreTest'
import Test from './pages/Test'
import Results from './pages/Results'
import Loading from './components/ui/Loading'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  
  return children
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) return <Loading />
  if (user) return <Navigate to="/dashboard" replace />
  
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/login" element={
        <PublicRoute><Login /></PublicRoute>
      } />
      
      <Route path="/register" element={
        <PublicRoute><Register /></PublicRoute>
      } />
      
      <Route path="/forgot-password" element={
        <PublicRoute><ForgotPassword /></PublicRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      
      <Route path="/pre-test" element={
        <ProtectedRoute><PreTest /></ProtectedRoute>
      } />
      
      <Route path="/test" element={
        <ProtectedRoute><Test /></ProtectedRoute>
      } />
      
      <Route path="/results/:attemptId" element={
        <ProtectedRoute><Results /></ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
