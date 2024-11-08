import React, { useState } from 'react';
import Dashboard from "./Dashboard";
import Companies from "./Companies";
import BarGraph from "./BarGraph";
import Progress from "./Progress";
import MoreProgress from "./MoreProgress";
import Graph from "./Graph";
import Sidebar from "@/components/ui/Sidebar";
import Profile from './Profile';

const Home = () => {
    const [selectedComponent, setSelectedComponent] = useState("companies");

    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case "dashboard":
              return <Dashboard />;
            case "companies":
              return <Companies />;
            case "orders":
              return <BarGraph />;
            case "products":
              return <Progress />;
            case "customers":
              return <MoreProgress />;
            case "analytics":
              return <Graph />;
            case "profile":
              return <Profile/>;
            default:
                return <Companies />;
        }
    };

    return (
        <div className="flex multiGradient animate-gradient-x">
            <Sidebar selectedComponent={selectedComponent} setSelectedComponent={setSelectedComponent} />
            <div className="flex-grow p-4">
                {renderSelectedComponent()}
            </div>
            
        </div>
    );
};

export default Home;
