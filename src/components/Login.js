import React, { useState, useEffect } from "react";

function Login() {
   const [foo, setFoo] = useState(null);

   return (
      <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
         <img
            className="w-52 mb-5"
            src="https://links.papareact.com/9xl"
            alt=""
         />
         <button onClick={(e) => (window.location.href = "/api/login_auth")} className="bg-[#18D860] text-white p-5 rounded-full">
            Login with Spotify
         </button>
      </div>
   );
}

export default Login;
