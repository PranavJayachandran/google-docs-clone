import React from "react";
import { SiReadthedocs } from "react-icons/si";

const Header = () => {
  return (
    <div className="mb-10 -mx-8 px-8 -mt-6 flex justify-between">
      <div className="flex items-center gap-2">
        <SiReadthedocs />
        <div className="text-xl text-gray-500 font-semibold">Docs Clone</div>
      </div>
      <div>
        <div className="h-10 w-10 bg-green-100 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;
