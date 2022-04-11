import React from "react";
import {
   HomeIcon,
   SearchIcon,
   BookmarkAltIcon,
   PlusCircleIcon,
   HeartIcon,
   ChartBarIcon,
} from "@heroicons/react/outline";

// implement statistics (top songs, artists, genre)

function Sidebar() {
   return (
      <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
         <div className="space-y-2">
            <button
               className="flex items-center space-x-2 hover:text-white"
               onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
               }}
            >
               <HomeIcon className="h-5 w-5" />
               <p>Logout</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
               <HomeIcon className="h-5 w-5" />
               <p>Home</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
               <SearchIcon className="h-5 w-5" />
               <p>Search</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
               <BookmarkAltIcon className="h-5 w-5" />
               <p>Library</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
               <ChartBarIcon className="h-5 w-5" />
               <p>Statistics</p>
            </button>

            <hr className="border-t-[0.1px] border-gray-900" />

            <button className="flex items-center space-x-2 hover:text-white">
               <PlusCircleIcon className="h-5 w-5" />
               <p>Create Playlist</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
               <HeartIcon className="h-5 w-5" />
               <p>Liked Songs</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-900" />

            {/* PLaylists... */}
            <p className="cursor-pointer hover:text-white">Playlist name...</p>
            <p className="cursor-pointer hover:text-white">Playlist name...</p>
            <p className="cursor-pointer hover:text-white">Playlist name...</p>
            <p className="cursor-pointer hover:text-white">Playlist name...</p>
            <p className="cursor-pointer hover:text-white">Playlist name...</p>
         </div>
      </div>
   );
}

export default Sidebar;
