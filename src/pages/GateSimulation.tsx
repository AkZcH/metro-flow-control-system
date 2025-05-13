
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { initProducerConsumerSystem, produceTicket, consumeTicket, simulateTrafficSpike, ProducerConsumerState } from '../utils/concurrency';

const GateSimulation: React.FC = () => {
  const { toast } = useToast();
  const [systemState, setSystemState] = useState(initProducerConsumerSystem(20, 5));
  const [ticketId, setTicketId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bufferCapacity, setBufferCapacity] = useState(20);
  const [maxConcurrentGates, setMaxConcurrentGates] = useState(5);
  const [spikeMagnitude, setSpikeMagnitude] = useState(10);
  const [systemLog, setSystemLog] = useState<string[]>([
    "System initialized with buffer capacity: 20, max gates: 5",
  ]);
  
  // Add log entry with timestamp
  const addLogEntry = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setSystemLog(prevLog => [`[${timestamp}] ${message}`, ...prevLog.slice(0, 49)]);
  };
  
  // Reset the simulation system
  const resetSystem = () => {
    setSystemState(initProducerConsumerSystem(bufferCapacity, maxConcurrentGates));
    addLogEntry(`System reset with buffer capacity: ${bufferCapacity}, max gates: ${maxConcurrentGates}`);
    toast({
      title: "System Reset",
      description: `Simulation restarted with buffer capacity: ${bufferCapacity}, max gates: ${maxConcurrentGates}`
    });
  };
  
  // Handle consuming a ticket at the gate
  const handleValidateTicket = () => {
    setIsProcessing(true);
    
    // Simulate network delay
    setTimeout(() => {
      const result = consumeTicket(systemState, ticketId);
      setSystemState(result.newState);
      
      if (result.success) {
        addLogEntry(`✅ Ticket ${ticketId} validated successfully.`);
        toast({
          title: "Access Granted",
          description: `Ticket ${ticketId} has been validated.`
        });
      } else {
        addLogEntry(`❌ Validation failed: ${result.message}`);
        toast({
          title: "Access Denied",
          description: result.message,
          variant: "destructive"
        });
      }
      
      setIsProcessing(false);
    }, 1500);
  };
  
  // Handle traffic spike simulation
  const handleSimulateSpike = () => {
    addLogEntry(`🚨 Simulating traffic spike with ${spikeMagnitude} requests...`);
    
    const result = simulateTrafficSpike(systemState, spikeMagnitude);
    setSystemState(result.newState);
    
    addLogEntry(`Spike results: ${result.processedCount} processed, ${result.failedCount} failed`);
    
    toast({
      title: "Traffic Spike Simulated",
      description: `Processed: ${result.processedCount}, Failed: ${result.failedCount}`
    });
  };
  
  // Simulate random gate activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-process if there are tickets in the buffer
      if (systemState.buffer.items.length > 0) {
        const result = consumeTicket(systemState);
        
        if (result.success && result.ticket) {
          addLogEntry(`🚪 Auto-gate processed ticket ${result.ticket.id}`);
          setSystemState(result.newState);
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [systemState]);
  
  // Calculate utilization percentages
  const bufferUtilization = (systemState.buffer.items.length / systemState.buffer.capacity) * 100;
  const gateUtilization = ((systemState.semaphore.maxCount - systemState.semaphore.count) / systemState.semaphore.maxCount) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-metro-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-metro-primary text-center mb-8">
          Gate Simulation System
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Entry Gate Validation</CardTitle>
                <CardDescription>
                  Simulate the consumer process of validating tickets at entry gates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ticketId">Enter Ticket ID</Label>
                    <div className="flex mt-1">
                      <Input
                        id="ticketId"
                        value={ticketId}
                        onChange={(e) => setTicketId(e.target.value)}
                        placeholder="e.g., ticket-1620847921-123"
                        className="flex-1"
                        disabled={isProcessing}
                      />
                      <Button
                        className="ml-2 bg-metro-primary hover:bg-metro-primary/90"
                        onClick={handleValidateTicket}
                        disabled={!ticketId || isProcessing}
                      >
                        {isProcessing ? "Validating..." : "Validate"}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter a ticket ID to validate at the gate or use auto-validation
                    </p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium text-lg mb-2">System Status</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Buffer Utilization</Label>
                        <Progress value={bufferUtilization} className="h-2 mt-2" />
                        <div className="text-sm mt-1 flex justify-between">
                          <span>{systemState.buffer.items.length} tickets in queue</span>
                          <span>{Math.round(bufferUtilization)}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label>Gate Utilization</Label>
                        <Progress value={gateUtilization} className="h-2 mt-2" />
                        <div className="text-sm mt-1 flex justify-between">
                          <span>{systemState.semaphore.maxCount - systemState.semaphore.count} active gates</span>
                          <span>{Math.round(gateUtilization)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Concurrency Simulation Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Buffer Capacity: {bufferCapacity}</Label>
                    <Slider
                      value={[bufferCapacity]}
                      onValueChange={(values) => setBufferCapacity(values[0])}
                      min={5}
                      max={50}
                      step={1}
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum number of tickets that can be in the queue
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Concurrent Gates: {maxConcurrentGates}</Label>
                    <Slider
                      value={[maxConcurrentGates]}
                      onValueChange={(values) => setMaxConcurrentGates(values[0])}
                      min={1}
                      max={10}
                      step={1}
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of gates that can process tickets concurrently
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Traffic Spike Magnitude: {spikeMagnitude} requests</Label>
                    <Slider
                      value={[spikeMagnitude]}
                      onValueChange={(values) => setSpikeMagnitude(values[0])}
                      min={1}
                      max={50}
                      step={1}
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of simultaneous ticket requests in a spike
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      onClick={resetSystem}
                    >
                      Reset System
                    </Button>
                    <Button
                      className="bg-metro-accent hover:bg-metro-accent/90"
                      onClick={handleSimulateSpike}
                    >
                      Simulate Traffic Spike
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-[calc(100vh-16rem)] flex flex-col">
              <CardHeader>
                <CardTitle>System Log</CardTitle>
                <CardDescription>Real-time events and operations</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden">
                <div className="h-full overflow-y-auto bg-gray-100 dark:bg-gray-800 rounded-md p-3 font-mono text-sm">
                  {systemLog.map((log, index) => (
                    <div 
                      key={index}
                      className={`py-1 ${
                        log.includes("✅") ? "text-green-600" :
                        log.includes("❌") ? "text-red-600" :
                        log.includes("🚨") ? "text-orange-600" :
                        log.includes("🚪") ? "text-blue-600" :
                        ""
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-3">
                <div className="text-sm text-muted-foreground flex justify-between w-full">
                  <span>Buffer: {systemState.buffer.items.length}/{systemState.buffer.capacity}</span>
                  <span>Semaphore: {systemState.semaphore.count}/{systemState.semaphore.maxCount}</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GateSimulation;
