import React from 'react'
import Dashboard from "./Dashboard"
import Sidebar from "@/components/ui/Sidebar"
const Home = () => {
  return (
    <>
        <div className="flex">
        <Sidebar/>
        <Dashboard />
      </div>
    </>
  )
}

export default Home