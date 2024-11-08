import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sun, Wind, Droplet, Zap } from "lucide-react"

const user = {
  name: "Jane Doe",
  role: "Energy Manager",
  avatar: "/placeholder.svg?height=100&width=100",
  totalPlants: 5,
  totalEnergy: "1.2 GW",
}

const powerPlants = [
  { id: 1, name: "Sunnyvale Solar", type: "Solar", avgEnergy: "180 MW", location: "Mumbai" },
  { id: 2, name: "Windy Hills", type: "Wind", avgEnergy: "220 MW", location: "Mumbai" },
  { id: 3, name: "Cascade Hydro", type: "Hydro", avgEnergy: "350 MW", location: "Mumbai" },
  { id: 4, name: "Desert Sun", type: "Solar", avgEnergy: "130 MW", location: "Mumbai" },
  { id: 5, name: "Coastal Breeze", type: "Wind", avgEnergy: "90 MW", location: "Mumbai" },
]


const getPlantIcon = (type) => {
    switch (type) {
      case "Solar":
        return <Sun className="h-6 w-6" />;
      case "Wind":
        return <Wind className="h-6 w-6" />;
      case "Hydro":
        return <Droplet className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };
  
  const getCardStyle = (type) => {
    switch (type) {
      case "Solar":
        return "bg-gradient-to-r from-yellow-200 to-yellow-500 group-hover:from-yellow-300 group-hover:to-yellow-600";
      case "Wind":
        return "bg-gradient-to-r from-blue-200 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-600";
      case "Hydro":
        return "bg-gradient-to-r from-cyan-200 to-cyan-500 group-hover:from-cyan-300 group-hover:to-cyan-600";
      default:
        return "bg-gradient-to-r from-gray-200 to-gray-400 group-hover:from-gray-300 group-hover:to-gray-500";
    }
  };

export default function EnhancedCoolProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br ml-44 from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6"
          >
            <Avatar className="h-32 w-32 ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-900">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-3xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {user.name}
              </h1>
              <p className="text-xl text-gray-400 mt-2">{user.role}</p>
              <div className="mt-4 flex flex-col md:flex-row md:space-x-6">
                <div className="text-lg">
                  <strong className="text-blue-400">{user.totalPlants}</strong> Total Power Plants
                </div>
                <div className="text-lg">
                  <strong className="text-green-400">{user.totalEnergy}</strong> Total Energy Production
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {powerPlants.map((plant, index) => (
                <motion.div
                key={plant.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="transition-transform"
              >
                    <span className="mt-4">
                    <Card
                      key={index}
                      className={`group ${getCardStyle(
                        plant.type
                      )} border-black border-2 text-black hover:cursor-pointer w-96 h-44 transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl font-bold">
                          {plant.name}
                        </CardTitle>
                        {getPlantIcon(plant.type)}
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm mb-4 text-gray-800">
                          Located in {plant.location}
                        </CardDescription>
                      </CardContent>
                    </Card>
                    </span>
                </motion.div>

                  ))}

          </motion.div>
        </section>
      </div>
    </div>
  )
}

