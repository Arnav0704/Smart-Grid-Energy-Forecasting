import { useState } from 'react';
import Dashboard from "./Dashboard";
import Companies from "./Companies";
import BarGraph from "./BarGraph";
import Progress from "./Progress";
import MoreProgress from "./MoreProgress";
import Graph from "./Graph";
import Sidebar from "@/components/ui/Sidebar";
import Profile from './Profile';
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import {
  Home,
  UserRound,
  ShoppingCart,
  Package,
  LineChart,
  LogOut,
  Package2,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const navigationItems = [
  { name: "Companies", icon: <Package2 className="h-5 w-5" />, key: "companies" },
  { name: "Dashboard", icon: <Home className="h-5 w-5" />, key: "dashboard" },
  { name: "Orders", icon: <ShoppingCart className="h-5 w-5" />, key: "orders" },
  { name: "Products", icon: <Package className="h-5 w-5" />, key: "products" },
  { name: "Customers", icon: <Users2 className="h-5 w-5" />, key: "customers" },
  { name: "Analytics", icon: <LineChart className="h-5 w-5" />, key: "analytics" },
  { name: "Profile", icon: <UserRound className="h-5 w-5" />, key: "profile" },
];

function WindowControls({ toggleSidebar, isExpanded }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logOutUser } = useContext(AuthContext);

  return (
    <div
      className={`flex items-center gap-1.5 px-2 mt-2 cursor-pointer transition-transform duration-500 ease-in-out ${
        isExpanded ? "rotate-180" : ""
      }`}
      onClick={toggleSidebar}
    >
      <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <div className="h-3 w-3 rounded-full bg-[#28C840]" />
    </div>
  );
}

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
            <TooltipProvider>
              <div className="flex h-full p-4 dark">
                <aside
                  className={`fixed inset-y-4 mx-auto left-10 border-r transition-all duration-500 ease-in-out
                    ${isExpanded ? "w-48" : "w-20 items-center"} bg-background rounded-2xl p-2 overflow-hidden`}
                >
                  <WindowControls toggleSidebar={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
                  <nav
                    className={`mt-4 flex flex-col gap-4 transition-all duration-500 ease-in-out
                    ${isExpanded ? "items-start w-48" : "items-center justify-center w-20"}`}
                  >
                    {navigationItems.map(({ icon, key, name }) => (
                      <Tooltip key={key}>
                        <TooltipTrigger asChild>
                          <Link className="flex w-full">
                            <button
                              onClick={() => setSelectedComponent(key)}
                              className={`relative w-fit  h-12 grid grid-cols-2 gap-10 px-4 rounded-lg transition-all duration-500 ease-in-out
                                ${selectedComponent === key ? "text-[#53C5B6]" : "text-[#9BA1A6] hover:text-[#53C5B6]"}
                                ${isExpanded ? "items-start justify-start" : "items-center mx-auto justify-center"}`}
                            >
                              <span className="absolute left-4 transition-all duration-500 ease-in-out">
                                {icon}
                              </span>
                              <span 
                                className={`absolute left-12 whitespace-nowrap transition-all duration-500 ease-in-out
                                ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} text-sm`}
                              >
                                {name}
                              </span>
                            </button>
                          </Link>
                        </TooltipTrigger>
                        {!isExpanded && (
                          <TooltipContent side="right" className="bg-[#53c5b6] text-black font-bold">
                            {name}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    ))}
                  </nav>
                  <button
                    onClick={() => logOutUser()}
                    className={`relative w-[3.7rem] mt-[365px] h-12 grid grid-cols-2 gap-10 px-4 rounded-lg text-[#E63946] hover:bg-[#E63946]/10 transition-all duration-500 ease-in-out
                      ${isExpanded ? "items-start justify-start" : "items-center mx-auto justify-center"}`}
                  >
                    <span className="absolute left-4 transition-all duration-500 ease-in-out">
                      <LogOut className="h-5 w-5" />
                    </span>
                    <span 
                      className={`absolute left-16 whitespace-nowrap transition-all duration-500 ease-in-out
                      ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} text-sm w-[50px]`}
                    >
                      Log Out
                    </span>
                  </button>
                </aside>
              </div>
            </TooltipProvider>
            <div className="flex-grow p-4">
              {/* add the expanded states of the sidebar and change them */}
                {renderSelectedComponent()}
            </div>
            
        </div>
    );
};

export default Home;
