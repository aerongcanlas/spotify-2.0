import React, { useState, useEffect } from "react";
// const axios = require("axios");

function Login() {
   const [foo, setFoo] = useState(null);

   // keeps running
   useEffect(() => {
      fetch("/express_backend")
         .then((response) => response.json())
         .then((response_json) => setFoo({ data: response_json.express }))
         .catch((error) => console.log(error));

      //login_fetch()
   }, []);

   const login_fetch = async () => {
      fetch("/login_auth")
         .then((response) => {
            console.log(response.json());
         })
         .then((res) => console.log(res.data))
         .catch((err) => console.log(err));
   };

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
         <button onClick={(e) => login_fetch()}>Log In</button>
         <h1>{foo && foo.data}</h1>
      </div>
   );
}

export default Login;
