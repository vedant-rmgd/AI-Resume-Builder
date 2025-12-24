import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const user = { name: "vedant ramgade" };
    const navigate = useNavigate();

    const logoutUser = () => {
        navigate("/");
    };

    return (
        <div className="shadow bg-white">
            <nav className="flex items-center justify-between max-w-8xl max-auto px-4 sm:px-15 py-3.5 text-slate-800 transition-all">
                <Link to="/" >
                    <p className="font-bold text-3xl">
                        Craftres
                        <span className=" text-green-500 bg-clip-text text-nowrap">
                            .
                        </span>{" "}
                    </p>
                </Link>
                <div className="flex items-center gap-4 text-sm">
                    <p className="max-sm:hidden">Hi, {user?.name}</p>
                    <button
                        onClick={logoutUser}
                        className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
