import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Marketplace } from './pages/Marketplace';
import { Booking } from './pages/Booking';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/subscriptions" element={<Navigate to="/register?step=3" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Toaster position="top-center" expand={true} richColors />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;