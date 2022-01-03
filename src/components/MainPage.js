import React from "react";
import Sidebar from "./Sidebar";

function MainPage() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main>
        <Sidebar />
        {/* main */}
      </main>

      <div>{/* player */}</div>
    </div>
  );
}

export default MainPage;
