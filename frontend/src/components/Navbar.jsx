import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setSearchText } from "../redux/appSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [text, setText] = useState("");
  const { user } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      console.log(res);
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setSearchText(text));
  }, [text]);

  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 hover:bg-gray-200 rounded-full cursor-pointer">
            <RxHamburgerMenu />
          </div>
          <img
            className="w-8"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/768px-Gmail_icon_%282020%29.svg.png?20221017173631"
            alt="logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      {user && (
        <>
          <div className="w-[50%] mr-60">
            <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
              <IoIosSearch size={"24px"} className="text-gray-700" />
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search mail"
                className="rounded-full bg-transparent outline-none px-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <CiCircleQuestion size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <IoIosSettings size={"24px"} />
            </div>
            <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <TbGridDots size={"24px"} />
            </div>
            <span onClick={logoutHandler} className="underline cursor-pointer">
              Logout
            </span>
            <Avatar src={user.profilePhoto} size={"40px"} round={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
