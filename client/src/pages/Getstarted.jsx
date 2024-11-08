import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, BarChart3, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Link } from 'react-router-dom';

const Getstarted = () => {
  return (
    <div className="min-h-screen multiGradient animate-gradient-x  text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <Sparkles className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">EnergyAI</span>
          </div>
          <div className="space-x-4">
            <Link to="/login">
                <Button variant="outline" className="text-black border-white hover:bg-gray-200 shadow-xl">
                <LogIn className="w-4 h-4 mr-2" />
                Log In
                </Button>
            </Link>
            <Link to="signup">
                <Button className="bg-white text-black hover:bg-gray-200 shadow-xl">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                </Button>
            </Link>
          </div>
        </header>

        <h1 className="text-4xl font-bold mb-4 flex items-center">
          AI-Driven Energy Forecasting
        </h1>
        <p className="text-xl mb-8">Revolutionize your smart grid with cutting-edge AI technology</p>
        
        <Card className="bg-gray-900 border-gray-800 text-white mb-8 shadow-xl">
          <CardHeader>
            <CardTitle>Get Started in Minutes</CardTitle>
            <CardDescription className="text-gray-400">
              Follow these simple steps to integrate AI forecasting into your smart grid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Connect your smart grid data sources</li>
              <li>Configure AI models to your specific needs</li>
              <li>Set up real-time monitoring and alerts</li>
              <li>Start optimizing your energy distribution</li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-white text-black hover:bg-gray-200">
              Start Your Free Trial
              <ArrowRight className="ml-2" />
            </Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
          <Card className="bg-gray-900 border-gray-800 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2" />
                Smart Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              Harness the power of AI to predict energy demands and optimize distribution in real-time.
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2" />
                Data-Driven Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              Gain valuable insights from your smart grid data to make informed decisions and improve efficiency.
            </CardContent>
          </Card>
        </div>
        
        
        
        <p className="text-center text-sm text-gray-500">
          Powered by state-of-the-art machine learning algorithms and big data analytics
        </p>
      </div>
    </div>
  );
};

export default Getstarted;