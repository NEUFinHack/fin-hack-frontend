import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portal from './components/portal';
import Home from './components/home';

function App() {
    return (
      <div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <h1 className="text-3xl font-bold underline">
            FinHack Vibe!
          </h1> 

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
