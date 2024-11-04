import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portal from './components/Portal';
import Home from './components/Home';
 

function App() {
    return (
      <div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Router>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portal" element={<Portal />} />
            </Routes>
          </Router>

          
        </GoogleOAuthProvider>
      </div>
      
  );
}

export default App
