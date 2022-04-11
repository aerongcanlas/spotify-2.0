import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Login from "./Login";
import Center from "./Center";
import { useSearchParams } from "react-router-dom";

function MainPage() {
   const [searchParams] = useSearchParams();

   return !searchParams.get("access_token") ? (
      <Login />
   ) : (
      <div className="bg-black h-screen overflow-hidden">
         <main className="flex">
            <Sidebar />
            <Center />
            {/* main */}
         </main>

         <div>{/* player */}</div>
      </div>
   );
}

export default MainPage;
