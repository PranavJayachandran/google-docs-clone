import React from "react";
import { Link } from "react-router-dom";

function Document({ item }) {
  return (
    <div>
      {item.new ? (
        <Link to={`/documents/${item._id}`}>
          <div className="border rounded-xl  hover:shadow-lg transition duration-300">
            <div className="h-60 w-52 bg-gray-100 text-[200px] flex justify-center items-center font-thin text-gray-400">
              +
            </div>
            <div className="text-gray-500">
              {item._id.length > 20 ? item._id.substr(0, 20) : item._id}
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/documents/${item._id}`}>
          <div className="border rounded-xl  hover:shadow-lg transition duration-300">
            <div className="h-60 w-52 bg-gray-100"></div>
            <div className="text-gray-500">
              {item._id.length > 20 ? item._id.substr(0, 20) : item._id}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Document;
