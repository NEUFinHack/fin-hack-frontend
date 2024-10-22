import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';

function App() {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <p>{import.meta.env.GOOGLE_CLIENT_ID}</p>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </Router>
        </GoogleOAuthProvider>
      </div>
      
  );
}

export default App
