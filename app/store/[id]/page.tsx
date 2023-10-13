"use client"
import React, { useState } from "react"
import style from "./store.module.css"
import Orders from "@/components/dashboardStore/sectionsDashboard/orders/Orders"
import MenuDashboard from "@/components/dashboardStore/menuDashborad/MenuDashboard"
import Profile from "@/components/dashboardStore/sectionsDashboard/ProfileStore/Profile"
import MyProducts from "@/components/dashboardStore/sectionsDashboard/myProducts/MyProducts"

const DashboardStore=({params}:{params: {id: string}})=>{
    
    const [section, setSection]=useState("my products")

    const changeSection=(newSection:string)=>{
        setSection(newSection)
    }

    return(
        <main className={style.mainCont}>
            <aside className={style.menuCont}>
                <MenuDashboard onChange={changeSection} />
            </aside>
            <section className={style.sectionCont}>
                {section==="my products" && <MyProducts/>}
                {section==="orders" && <Orders/>}
                {section==="profile" && <Profile/>}
            </section>
        </main>
    )
}

export default DashboardStore