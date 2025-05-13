
import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Ticket, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import MetroMap from '@/components/MetroMap';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-metro-gray">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="py-12 animate-fade-in">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-metro-primary mb-4">
              MetroTix System
            </h1>
            <p className="text-xl text-metro-secondary mb-8 max-w-2xl mx-auto">
              An intelligent metro ticketing system with real-time passenger tracking,
              concurrency control, and robust system design.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                className="bg-metro-accent hover:bg-metro-accent/90 text-white"
                size="lg"
              >
                <Link to="/book">
                  Book Ticket <Ticket className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild
                className="bg-metro-primary hover:bg-metro-primary/90 text-white"
                size="lg"
              >
                <Link to="/simulation">
                  Try Gate Simulation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Metro Map Section */}
        <section className="py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-metro-primary">Metro Network</h2>
            <p className="text-metro-secondary">Our comprehensive metro network connecting the city</p>
          </div>
          <div className="flex justify-center">
            <MetroMap />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-metro-primary">System Features</h2>
            <p className="text-metro-secondary">Intelligent ticketing with robust concurrency control</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-metro-accent/10 flex items-center justify-center mb-2">
                  <Ticket className="h-6 w-6 text-metro-accent" />
                </div>
                <CardTitle>Real-time Ticketing</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Book and manage tickets with real-time fare calculation based on journey distance and time.</p>
              </CardContent>
              <CardFooter>
                <Link to="/book" className="text-metro-secondary hover:text-metro-accent flex items-center">
                  Book now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-metro-primary/10 flex items-center justify-center mb-2">
                  <Train className="h-6 w-6 text-metro-primary" />
                </div>
                <CardTitle>Gate Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Experience our producer-consumer system with semaphore-based concurrency control at metro gates.</p>
              </CardContent>
              <CardFooter>
                <Link to="/simulation" className="text-metro-secondary hover:text-metro-accent flex items-center">
                  Try simulation <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-metro-secondary/10 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-metro-secondary">
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                </div>
                <CardTitle>System Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Monitor system health, buffer states, and concurrent processes in real-time with our analytics dashboard.</p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard" className="text-metro-secondary hover:text-metro-accent flex items-center">
                  View dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="bg-metro-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Train className="h-6 w-6 text-white" />
                <span className="ml-2 text-xl font-bold">MetroTix</span>
              </div>
              <p className="text-sm opacity-80 mt-1">Modern Metro Ticketing System</p>
            </div>
            
            <div className="flex gap-8">
              <div>
                <h4 className="font-medium mb-2">Navigation</h4>
                <ul className="space-y-1 text-sm opacity-80">
                  <li><Link to="/" className="hover:text-metro-accent">Home</Link></li>
                  <li><Link to="/book" className="hover:text-metro-accent">Book Ticket</Link></li>
                  <li><Link to="/simulation" className="hover:text-metro-accent">Gate Simulation</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Resources</h4>
                <ul className="space-y-1 text-sm opacity-80">
                  <li><a href="#" className="hover:text-metro-accent">Documentation</a></li>
                  <li><a href="#" className="hover:text-metro-accent">System Status</a></li>
                  <li><a href="#" className="hover:text-metro-accent">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm opacity-60">
            <p>© 2025 MetroTix System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
