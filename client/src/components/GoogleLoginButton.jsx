import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const GoogleLoginButton = () => {
  const handleSuccess = async (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    
    // You can also send the credential to backend to verify/create session
    console.log("Google user:", decoded);

    // Optionally store token in localStorage and redirect
  };

  return <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Login Failed")} />;
};
