import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const onsSuccess = (message) => {
        console.log(message);
        window.localStorage.setItem('authToken', message.credential);
        navigate('/portal');
    }


    return(
        <div className="min-h-screen bg-[#0a1628] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0">
              {/* Vertical lines */}
              <div className="absolute left-1/4 top-0 h-full w-[1px] bg-white/10" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/10" />
              <div className="absolute left-3/4 top-0 h-full w-[1px] bg-white/10" />
              
              {/* Horizontal lines */}
              <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/10" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10" />
              <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white/10" />
              
              {/* Accent rectangles */}
              <div className="absolute top-1/4 left-1/2 w-1/3 h-24 bg-white/5" />
              <div className="absolute top-2/3 left-1/4 w-1/4 h-32 bg-white/5" />
            </div>
          </div>
    
          {/* Content */}
          <section id="about" className="relative min-h-screen flex items-center justify-center px-4">
            <div className="relative">
              {/* Outer glass card */}
              <div className="absolute inset-2 bg-white/20 backdrop-blur-sm rounded-lg" />
              
              {/* Inner glass card */}
              <div className="relative bg-white/60 backdrop-blur-md rounded-lg p-12 max-w-2xl mx-auto">
                <div className="text-center space-y-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-8">
                    LOGIN
                  </h1> 
                  <GoogleLogin
                  onSuccess={onsSuccess}/>
                </div>
              </div>
            </div>
          </section>
        </div>
        // <>
        // <GoogleLogin
        //     onSuccess={onsSuccess}
        // />
        // </>
    )
}

export default Login;