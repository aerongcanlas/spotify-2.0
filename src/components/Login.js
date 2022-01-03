import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function Login() {
   const location = useLocation();
   const [foo, setFoo] = useState(null);

   // keeps running
   useEffect(() => {
      fetch("/express_backend")
      .then(response => response.json())
      .then(response_json => setFoo({data: response_json.express}))
      .catch((error) => console.log(error))
   }, []);

   // // also keeps running once called 
   // const callBackendAPI = async () => {
   //    const response = await fetch("/express_backend");
   //    const body = await response.json();

   //    if (response.status !== 200) {
   //       throw Error(body.message);
   //    }
   //    return body;
   // };

   return (
      <div>
         <h1>Login</h1>
         <a href="/login" target="_blank">Log In</a>
         <h1>{foo && foo.data}</h1>
      </div>
   );
}

export default Login;
