'use client'
import { useSelector } from "@/lib/redux/hooks";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import Users from "./Users";
import { useGetAuthUserQuery } from "@/lib/redux/service/searchProfileAPI";
import style from "./Dashboard.module.css"
import { Image } from "@nextui-org/react";
const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: user, isLoading } = useGetAuthUserQuery(null);
    console.log(user);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (user?.claims?.admin) {
        return (
            <div className={style.adminDashCont}>
                    <Sidebar/>
                    <Users/>
            </div>
        );
    } else {
        return (
            <div>
                <Image src="/padlock.png" alt='padlock screen'/>
            </div>
        );
    }
}

export default Dashboard;