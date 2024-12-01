const Nav = () => {
    return (
        <div className="p-0 lg:w-[80%] mx-auto navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Flight</a></li>
                        <li>
                            <a>Visa</a>
                            <ul className="p-2">
                                <li><a>Visa Application</a></li>
                                <li><a>Visa Guide</a></li>
                                <li><a>Transit Visa</a></li>
                            </ul>
                        </li>
                        <li><a>Promotions</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl" href="/">ShareTripz</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Flight</a></li>
                    <li>
                        <details>
                            <summary>Visa</summary>
                            <ul className="p-2">
                                <li><a>Visa Application</a></li>
                                <li><a>Visa Guide</a></li>
                                <li><a>Transit Visa</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Promotions</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Login</a>
            </div>
        </div>
    );
};

export default Nav;