import React from "react";
import {
  HomeIcon,
  SearchIcon,
  BookmarkAltIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { useNavigate } from 'react-router-dom';

function Sidebar () {
  const navigate = useNavigate();
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
      <div className="space-y-2">
        <button className="flex items-center space-x-2 hover:text-white" 
          onClick={(e) => {
            navigate("/login");
            }}>
          <HomeIcon className="h-5 w-5"/>
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5"/>
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BookmarkAltIcon className="h-5 w-5"/>
          <p>Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900"/>

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5"/>
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5"/>
          <p>Liked Songs</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

        <p className="cursor-pointer hover:text-white">
            Playlist name...
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
