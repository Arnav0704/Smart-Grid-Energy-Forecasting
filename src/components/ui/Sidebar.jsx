import { Link } from 'react-router-dom';
import {
    Home,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider, 
} from "@/components/ui/tooltip"

const data = [
    {
        name : "Dashboard",
        icon : <Home className="h-5 w-5"/>
    },
    {
        name : "Orders",
        icon : <ShoppingCart className="h-5 w-5"/>
    },
    {
        name : "Products",
        icon : <Package className="h-5 w-5"/>
    },
    {
        name : "Customers",
        icon : <Users2 className="h-5 w-5"/>
    },
    {
        name : "Analytics",
        icon : <LineChart className="h-5 w-5"/>
    }
];


const Sidebar = () => {
    return (
        <div className="dark flex min-h-screen w-auto flex-col m-10">
            <TooltipProvider> 
                <aside className="fixed inset-y-4 left-4 rounded-lg  z-10 hidden w-24 flex-col border-r bg-background sm:flex">
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Link
                            to="#"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        
                        
                        {
                            data.map(item => {
                                return (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                to="#"
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                            >
                                                {item.icon} 
                                                <span className="sr-only">{item.name}</span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">{item.name}</TooltipContent>
                                    </Tooltip>
                                )
                            })
                        }
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>
            </TooltipProvider> 
        </div>
    );
};

export default Sidebar;
