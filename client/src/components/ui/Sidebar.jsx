import React, { useState, useContext } from "react";
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

export default function Sidebar({ selectedComponent, setSelectedComponent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logOutUser } = useContext(AuthContext);

  return (
    <TooltipProvider>
      <div className="flex min-h-screen p-4 dark">
        {/* Collapsible Sidebar */}
        <aside
          className={`fixed inset-y-4 mx-auto left-10 border-r transition-all duration-500 ease-in-out
            ${isExpanded ? "w-48 " : "w-20 items-center"} bg-background rounded-2xl p-2`}
        >
          <WindowControls toggleSidebar={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
          <nav
            className={`mt-4 flex flex-col  gap-4 ${
              isExpanded ? "items-start w-48" : "items-center justify-center w-20"
            }`}
          >
            {navigationItems.map(({ icon, key, name }) => (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <Link className="flex w-full">
                    <button
                      onClick={() => setSelectedComponent(key)}
                      className={`w-[3.7rem] h-12 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out
                        ${selectedComponent === key ? "text-[#53C5B6]" : "text-[#9BA1A6] hover:text-[#53C5B6]"}`}
                    >
                      {icon}
                      {isExpanded && <span className="ml-3 text-sm">{name}</span>}
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
              <Tooltip >
                <TooltipTrigger asChild>
                  <Link className="flex w-full">
                    <button
                      onClick={() => setSelectedComponent('')}
                      className={`w-[3.7rem] h-12 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out
                        ${selectedComponent === key ? "text-[#53C5B6]" : "text-[#9BA1A6] hover:text-[#53C5B6]"}`}
                    >
                      {icon}
                      {isExpanded && <span className="ml-3 text-sm">{name}</span>}
                    </button>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right" className="bg-[#53c5b6] text-black font-bold">
                    Log Out
                  </TooltipContent>
                )}
              </Tooltip>
          </nav>
          <button
            onClick={() => logOutUser()}
            className="w-[3.7rem] h-12 flex items-center justify-center rounded-lg text-[#E63946] hover:bg-[#E63946]/10 transition-all duration-300 ease-in-out"
            >
            <LogOut className="h-5 w-5" />
            {isExpanded && <span className="ml-3 text-sm">Log Out</span>}
          </button>
        </aside>
      </div>
    </TooltipProvider>
  );
}

function WindowControls({ toggleSidebar, isExpanded }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 pt-2 cursor-pointer transition-transform duration-300 ease-in-out ${
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
