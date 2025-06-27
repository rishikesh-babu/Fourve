import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [openMenu, setOpenMenu] = useState(false)
    const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="white"><path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z" /></svg>
    const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="white"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z" /></svg>

    function handleMenu() {
        setOpenMenu(!openMenu)
    }

    const menu = [
        { value: "View", link: "/" },
        { value: "Upload", link: "/create-post", },
    ];
    return (
        <header className="p-3 w-full z-20 fixed bg-gray-900 shadow-lg flex justify-between items-center">
            <div className="text-2xl font-bold ">
                <Link to={'/'}>
                    Fourve
                </Link>
            </div>

            <button onClick={handleMenu} className={`select-none cursor-pointer sm:hidden`}>
                {openMenu ? closeIcon : menuIcon}
            </button>

            <section className={`px-5 py-3 w-[180px] text-2xl text-white font-semibold rounded-xl bg-gray-700 shadow-2xl sm:shadow-none sm:bg-transparent absolute sm:relative top-16 sm:top-0 right-0 transition-all duration-300 ease-in-out ${openMenu ? 'opacity-90 pointer-events-auto' : 'opacity-0 sm:opacity-100 pointer-events-none sm:pointer-events-auto'}`}>
                <div className=' flex flex-col sm:flex-row justify-center gap-3 sm:gap-7'>
                    {menu?.map((item, index) => (
                        <Link to={item?.link} key={index} onClick={handleMenu} className='cursor-pointer relative '>
                            {item?.value}
                        </Link>
                    ))}
                </div>
            </section>
        </header>
    );
};

export default Header;
