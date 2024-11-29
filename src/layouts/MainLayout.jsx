import { Outlet } from "react-router";
import Nav from "../components/Nav/Nav";

const MainLayout = () => {
    return (
        <div className="w-[80%]# mx-auto#">
            <Nav />
            <Outlet />
        </div>
    );
};

export default MainLayout;