import React, { useState } from "react";
import { Search, Button, Logo } from "../index.js";
import { Link } from "react-router-dom";
import {
    IoCloseCircleOutline,
    BiLike,
    CiSearch,
    CiSettings,
    HiOutlineVideoCamera,
    MdOutlineContactSupport,
    SlMenu,
} from "../icons.js";
import { useSelector } from "react-redux";

function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const profileImg = useSelector((state) => state.auth.userData?.avatar.url);

    const sidePanelItems = [
        {
            icon: <BiLike size={25} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <HiOutlineVideoCamera size={25} />,
            title: "My Content",
            url: "/my-content",
        },
        {
            icon: <MdOutlineContactSupport size={25} />,
            title: "Support",
            url: "/support",
        },
        {
            icon: <CiSettings size={25} />,
            title: "Settings",
            url: "/settings",
        },
    ];

    return (
        <>
            <nav className="w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <Logo />
                </div>

                {/* search for large screens */}
                <div className="w-full sm:w-1/3 hidden sm:block">
                    <Search />
                </div>

                {/* search for small screens */}
                <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
                    <CiSearch
                        size={30}
                        fontWeight={"bold"}
                    />
                </div>

                {/* login and signup butons for larger screens */}
                {authStatus ? (
                    <div className="w-10 space-x-2 sm:block hidden">
                        <img
                            src={profileImg}
                            alt="profileImg"
                            className="rounded-full"
                        />
                    </div>
                ) : (
                    <div className="space-x-2 sm:block hidden">
                        <Link to={'/login'}>
                            <Button className="bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2">
                                Login
                            </Button>
                        </Link>
                        <Link to={'/signup'}>
                            <Button className="font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2 ">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}

                {/* hamburger for smaller screens */}
                <div className="sm:hidden block">
                    <div className="text-white ">
                        <SlMenu
                            size={24}
                            onClick={() => setToggleMenu((prev) => !prev)}
                        />
                    </div>
                </div>

                {/* Side bar for smaller screens */}
                {toggleMenu && (
                    <div className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-[#0F0F0F] sm:hidden rounded-lg outline-none">
                        <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
                            <div className="flex items-center gap-2">
                                <Logo />
                            </div>
                            <IoCloseCircleOutline
                                size={35}
                                onClick={() => setToggleMenu((prev) => !prev)}
                            />
                        </div>

                        <div className="flex flex-col justify-between h-full py-5 px-3 j">
                            <div className="space-y-5">
                                {sidePanelItems.map((item) => (
                                    <Link
                                        to={item.url}
                                        key={item.title}
                                        className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-500"
                                    >
                                        <div>{item.icon}</div>
                                        <span className="text-lg">
                                            {item.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            {!authStatus && (
                                <div className="flex flex-col space-y-5 mb-3">
                                    <Link to={"/login"}>
                                        <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
                                            Sign up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Navbar;
