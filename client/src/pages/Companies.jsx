import { useEffect, useState, useContext } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sun, Wind, Zap, Droplet, Atom } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Factory } from "lucide-react";
import Dashboard from "./Dashboard";
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

const Companies = () => {
  const [energyPlants, setEnergyPlants] = useState([]);
  const [isSelected, setIsSelected] = useState(-1);
  console.log(isSelected);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // Loading state
  
  useEffect(() => {
    const fetchPlants = async () => {
      if (!user) {
        setLoading(true); // Set loading to true while fetching
        // Exit if user is null
      } else {
        try {
          const userId = user._id;
          const response = await fetch(
            `http://localhost:5000/plants/${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            // console.log(data);
            setEnergyPlants(data);
            setLoading(false);
            console.log(data)
          } else {
            console.error("Error fetching plants");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    fetchPlants(); // Call the fetch function
  }, [user]); // Only run this effect when userId changes;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    latitude: "",
    longitude: "",
    days: "",
    csvFile: null,
  });
  const [position, setPosition] = useState("Select Type");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      csvFile: e.target.files[0],
    });
  };

  const addPlant = async (plantData) => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      console.log(token);
      const response = await fetch("http://localhost:5000/add-plant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token in Authorization header
        },
        body: JSON.stringify(plantData),
      });
      if (response.ok) {
        console.log("Plant added successfully");
      } else {
        console.error("Error adding plant");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", position);
    data.append("location", formData.location);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("days", formData.days);
    data.append("csvFile", formData.csvFile);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Server Error");
      }

      const responseData = await response.json();

      // Add the new plant to `energyPlants` state
      setEnergyPlants((prevPlants) => [
        ...prevPlants,
        {
          name: responseData.name,
          type: responseData.type,
          location: responseData.location,
          jsData: responseData.jsData,
          prediction: responseData.prediction
        },
      ]);
      // console.log(responseData);
      addPlant(responseData);
      setIsSubmitting(false)
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const LoadingSkeleton = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-1/4 bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-700" />
        </div>
      ))}
      <Skeleton className="h-10 w-full bg-gray-700" />
    </>
  )
  return (
    <div className="dark shadow-xl ml-24 relative h-[96vh] bg-background rounded-r-2xl w-[84%] p-6 pl-8">
      <div className="">
        <div className="rounded-md h-fit p-4 flex-1 dark">
          <div className="flex justify-between">
            {isSelected < 0 ? (
              !isFormVisible ? (
                <h1 className="text-3xl text-white font-bold mb-6">
                  Energy Plants Dashboard
                </h1>
              ) : (
                <h1 className="text-3xl text-white font-bold mb-6">
                  Add A Plant
                </h1>
              )
            ) : (
              <h1 className="text-3xl text-white font-bold mb-6">
                {energyPlants[isSelected].name}
              </h1>
            )}
            {isFormVisible || isSelected >= 0 ? (
              <Button
                className="font-bold h-14 text-md w-36"
                onClick={() => {
                  setIsFormVisible(false);
                  setIsSelected(-1);
                }}
              >
                <span>{"<"} Dashboard</span>
              </Button>
            ) : (
              <Button
                className="font-bold h-14 text-md w-36"
                onClick={() => {
                  setIsFormVisible(true);
                }}
              >
                <span>Add A Plant +</span>
              </Button>
            )}
          </div>
          <div className="flex gap-6 flex-wrap">
            {
              isSelected < 0 ? (
                energyPlants.length && !isFormVisible ? (
                  energyPlants.map((plant, index) => (
                    <span key={index} className="mt-4">
                    <Card
                      key={index}
                      className={`group ${getCardStyle(
                        plant.type
                      )} border-black border-2 text-black hover:cursor-pointer w-96 h-44 transition-all duration-300 hover:shadow-lg hover:scale-105`}
                      onClick={() => setIsSelected(index)}
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
                  ))
                ) : !isFormVisible ? (
                  loading ? (
                    <div>loading....</div>
                  ) : (
                    <TooltipProvider>
                      <div></div>
                      <div className="flex flex-col items-center w-[600px] mx-auto justify-center mt-36 text-center text-gray-300">
                        <span className="">
                          <Factory
                            className="text-green-500 text-6xl mb-4"
                            height={100}
                            width={100}
                          />
                        </span>
    
                        <h2 className="text-2xl font-semibold mb-2">
                          No Plants Available
                        </h2>
                        <p className="mb-6 text-lg text-gray-400">
                          There are no plants currently in your collection. Add some
                          to learn more and enhance your experience!
                        </p>
    
                        <Button
                          onClick={() => setIsFormVisible(true)}
                          className="py-2 px-6 bg-gradient-to-r from-[#53c5b6] to-[#125c52] text-white font-semibold rounded-lg shadow-lg hover:from-[#68ddcf] hover:to-[#177369] transition-colors duration-300"
                        >
                          Add a Plant
                        </Button>
                      </div>
                    </TooltipProvider>
                  )
                ) : (
                  <TooltipProvider>
  <div className="w-[600px] bg-background shadow-3xl rounded-lg pt-4 mx-auto space-y-6 transition-all duration-300 ease-in-out">
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loading Skeleton */}
      {isSubmitting && (
        <LoadingSkeleton/>
      )}

      {/* Actual Form */}
      {!isSubmitting && (
        <>
          <div>
            <Label className="block text-sm font-semibold text-gray-300">Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name of the plant"
              className="mt-2 w-full p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-inner text-white focus:border-primary focus:ring-2 focus:ring-slate-400 transition duration-200"
            />
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-300">Type</Label>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                className="mt-2 w-full bg-gray-800 p-3 border border-gray-600 rounded-lg shadow-inner focus:border-primary focus:ring-2 focus:ring-slate-400 transition duration-200"
              >
                <Button variant="outline" className="text-gray-400 font-semibold">
                  {position}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[600px] dark">
                <DropdownMenuLabel>Choose The Type Of Power Plant</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={(value) => setPosition(value)}
                >
                  <DropdownMenuRadioItem value="Solar">Solar</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Wind">Wind</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Hydro">Hydro</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-300">Location</Label>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Plant location"
              className="mt-2 w-full p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-inner text-white focus:border-primary focus:ring-2 focus:ring-slate-400 transition duration-200"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <Label className="block text-sm font-semibold text-gray-300">Latitude</Label>
              <Input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                placeholder="Latitude"
                className="mt-2 w-full p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-inner text-white focus:border-primary focus:ring-2 focus:ring-slate-400 transition duration-200"
              />
            </div>
            <div className="flex-1">
              <Label className="block text-sm font-semibold text-gray-300">Longitude</Label>
              <Input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                placeholder="Longitude"
                className="mt-2 w-full p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-inner text-white focus:border-primary focus:ring-2 focus:ring-slate-400 transition duration-200"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-300">Period Of Prediction (Days)</Label>
            <Input
              type="text"
              name="days"
              value={formData.days}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 bg-gray-800 border border-gray-600 rounded-lg shadow-inner text-white focus:border-primary focus:ring-2 focus:ring-slate-400 transition duration-200"
            />
          </div>

          <div>
            <Label className="block text-sm font-semibold text-gray-300">Plant Power Production Data (.CSV)</Label>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              required
              className="mt-2 w-full text-center bg-gray-800 border border-gray-600 rounded-lg shadow-inner text-white focus:border-primary focus:ring-2 focus:ring-slate-400 transition duration-200"
            />
          </div>

          <Button
            type="submit"
            className={`w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-500 hover:to-green-700 transition duration-200`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </>
      )}
    </form>
  </div>
</TooltipProvider>

                )
              ) :
              (<Dashboard data={energyPlants[isSelected].jsData} prediction={energyPlants[isSelected].prediction}/>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
