
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import MetroMap from '@/components/MetroMap';
import { stations, calculateFare, calculateTravelTime } from '../utils/metroData';
import { produceTicket, initProducerConsumerSystem } from '../utils/concurrency';

const TicketBooking: React.FC = () => {
  const { toast } = useToast();
  const [fromStation, setFromStation] = useState<string>('');
  const [toStation, setToStation] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(1);
  const [fare, setFare] = useState<number>(0);
  const [travelTime, setTravelTime] = useState<number>(0);
  const [isMapSelecting, setIsMapSelecting] = useState<'from' | 'to' | null>(null);
  const [bookingState, setBookingState] = useState(initProducerConsumerSystem(10, 3));
  
  // Update fare when stations change
  useEffect(() => {
    if (fromStation && toStation) {
      const calculatedFare = calculateFare(fromStation, toStation);
      const calculatedTime = calculateTravelTime(fromStation, toStation);
      setFare(calculatedFare * passengers);
      setTravelTime(calculatedTime);
    } else {
      setFare(0);
      setTravelTime(0);
    }
  }, [fromStation, toStation, passengers]);
  
  const handleStationClick = (stationId: string) => {
    if (isMapSelecting === 'from') {
      setFromStation(stationId);
      setIsMapSelecting('to');
    } else if (isMapSelecting === 'to') {
      setToStation(stationId);
      setIsMapSelecting(null);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromStation || !toStation) {
      toast({
        title: "Error",
        description: "Please select both departure and arrival stations.",
        variant: "destructive",
      });
      return;
    }
    
    if (fromStation === toStation) {
      toast({
        title: "Error",
        description: "Departure and arrival stations cannot be the same.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate booking by producing a ticket request
    const result = produceTicket(bookingState, {
      fromStation,
      toStation
    });
    
    setBookingState(result.newState);
    
    if (result.success) {
      toast({
        title: "Ticket Booked Successfully!",
        description: `Your ticket has been booked. Total fare: $${fare.toFixed(2)}`,
      });
    } else {
      toast({
        title: "Booking Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-metro-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-metro-primary text-center mb-8">
          Book Your Metro Ticket
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Booking Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fromStation">Departure Station</Label>
                      <Select
                        value={fromStation}
                        onValueChange={(value) => {
                          setFromStation(value);
                          setIsMapSelecting(null);
                        }}
                      >
                        <SelectTrigger id="fromStation" className="w-full">
                          <SelectValue placeholder="Select departure station" />
                        </SelectTrigger>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station.id} value={station.id}>
                              {station.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => setIsMapSelecting('from')}
                      >
                        Select on Map
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="toStation">Arrival Station</Label>
                      <Select
                        value={toStation}
                        onValueChange={(value) => {
                          setToStation(value);
                          setIsMapSelecting(null);
                        }}
                      >
                        <SelectTrigger id="toStation" className="w-full">
                          <SelectValue placeholder="Select arrival station" />
                        </SelectTrigger>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station.id} value={station.id}>
                              {station.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => setIsMapSelecting('to')}
                      >
                        Select on Map
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Number of Passengers</Label>
                      <Input
                        id="passengers"
                        type="number"
                        min="1"
                        max="10"
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Estimated Travel Time</Label>
                      <div className="h-10 flex items-center px-3 border rounded-md bg-muted">
                        {travelTime ? `${travelTime} minutes` : 'Select stations to calculate'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-metro-gray/20 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total Fare:</span>
                      <span className="text-xl font-bold text-metro-primary">${fare.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Base fare + distance calculation for {passengers} passenger{passengers !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-metro-accent hover:bg-metro-accent/90 text-white"
                      disabled={!fromStation || !toStation || fromStation === toStation}
                    >
                      Book Ticket
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Producer-Consumer System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Buffer Status</h4>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-metro-primary"
                        style={{ width: `${(bookingState.buffer.items.length / bookingState.buffer.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm mt-1">
                      {bookingState.buffer.items.length} / {bookingState.buffer.capacity} tickets in queue
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Gate Availability</h4>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-metro-secondary"
                        style={{ width: `${(bookingState.semaphore.count / bookingState.semaphore.maxCount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm mt-1">
                      {bookingState.semaphore.count} / {bookingState.semaphore.maxCount} gates available
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Producers (Ticket Booking)</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Active:</span>
                        <span>{bookingState.producers.active}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span>{bookingState.producers.completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed:</span>
                        <span>{bookingState.producers.failed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Consumers (Gate Validation)</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Active:</span>
                        <span>{bookingState.consumers.active}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Completed:</span>
                        <span>{bookingState.consumers.completed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed:</span>
                        <span>{bookingState.consumers.failed}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isMapSelecting === 'from' ? 'Select Departure Station' : 
                     isMapSelecting === 'to' ? 'Select Arrival Station' : 
                     'Metro Map'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MetroMap
                    selectedFromStation={fromStation}
                    selectedToStation={toStation}
                    onStationClick={isMapSelecting ? handleStationClick : undefined}
                  />
                  
                  {isMapSelecting && (
                    <div className="mt-3 text-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsMapSelecting(null)}
                      >
                        Cancel Selection
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  Click on stations on the map to select your journey points
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketBooking;
