
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// Mock data for charts
const trafficData = [
  { hour: '6AM', passengers: 120, tickets: 110, gates: 3 },
  { hour: '7AM', passengers: 380, tickets: 350, gates: 5 },
  { hour: '8AM', passengers: 820, tickets: 780, gates: 5 },
  { hour: '9AM', passengers: 720, tickets: 650, gates: 5 },
  { hour: '10AM', passengers: 340, tickets: 300, gates: 4 },
  { hour: '11AM', passengers: 280, tickets: 240, gates: 4 },
  { hour: '12PM', passengers: 420, tickets: 380, gates: 4 },
  { hour: '1PM', passengers: 510, tickets: 470, gates: 5 },
  { hour: '2PM', passengers: 350, tickets: 320, gates: 4 },
  { hour: '3PM', passengers: 410, tickets: 370, gates: 4 },
  { hour: '4PM', passengers: 590, tickets: 540, gates: 5 },
  { hour: '5PM', passengers: 840, tickets: 800, gates: 5 },
  { hour: '6PM', passengers: 890, tickets: 850, gates: 5 },
  { hour: '7PM', passengers: 640, tickets: 590, gates: 5 },
  { hour: '8PM', passengers: 420, tickets: 380, gates: 4 },
  { hour: '9PM', passengers: 250, tickets: 220, gates: 3 },
  { hour: '10PM', passengers: 160, tickets: 140, gates: 3 },
  { hour: '11PM', passengers: 90, tickets: 80, gates: 2 },
];

const stationData = [
  { name: 'Central Station', tickets: 1850, id: 's1' },
  { name: 'North Terminal', tickets: 980, id: 's2' },
  { name: 'South Square', tickets: 1240, id: 's3' },
  { name: 'East Riverside', tickets: 740, id: 's4' },
  { name: 'West Park', tickets: 680, id: 's5' },
  { name: 'University', tickets: 940, id: 's6' },
  { name: 'Business District', tickets: 1480, id: 's7' },
  { name: 'Stadium', tickets: 620, id: 's8' },
];

const systemMetrics = [
  { name: 'CPU Usage', value: 42 },
  { name: 'Memory', value: 58 },
  { name: 'Network', value: 29 },
  { name: 'Buffer', value: 65 },
];

const serviceHealthData = [
  { name: 'Booking Service', status: 'healthy', uptime: '99.98%', responseTime: '85ms', load: 'normal' },
  { name: 'Gate Service', status: 'healthy', uptime: '99.95%', responseTime: '120ms', load: 'high' },
  { name: 'Payment Service', status: 'degraded', uptime: '98.50%', responseTime: '350ms', load: 'high' },
  { name: 'User Service', status: 'healthy', uptime: '99.99%', responseTime: '65ms', load: 'normal' },
  { name: 'Analytics Service', status: 'healthy', uptime: '99.90%', responseTime: '150ms', load: 'low' },
];

const errorLogData = [
  { timestamp: '2025-05-13 10:23:54', service: 'Payment Service', error: 'Database connection timeout', severity: 'critical' },
  { timestamp: '2025-05-13 09:45:12', service: 'Gate Service', error: 'Buffer overflow during traffic spike', severity: 'warning' },
  { timestamp: '2025-05-13 08:37:02', service: 'Booking Service', error: 'Rate limit exceeded', severity: 'warning' },
  { timestamp: '2025-05-12 22:14:30', service: 'Analytics Service', error: 'Memory allocation failed', severity: 'error' },
  { timestamp: '2025-05-12 17:02:45', service: 'User Service', error: 'Authentication service unreachable', severity: 'error' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('today');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-metro-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-metro-primary">System Dashboard</h1>
            <p className="text-metro-secondary">Monitor system metrics and producer-consumer performance</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => setTimeRange('today')} className={timeRange === 'today' ? 'bg-muted' : ''}>Today</Button>
            <Button variant="outline" onClick={() => setTimeRange('week')} className={timeRange === 'week' ? 'bg-muted' : ''}>Week</Button>
            <Button variant="outline" onClick={() => setTimeRange('month')} className={timeRange === 'month' ? 'bg-muted' : ''}>Month</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Passengers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,540</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">↑ 12%</span> from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tickets Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7,890</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">↑ 8%</span> from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Gates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 / 8</div>
              <p className="text-xs text-muted-foreground mt-1">
                62.5% utilization rate
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                Good
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                1 service degraded
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Hourly Traffic</CardTitle>
              <CardDescription>Passenger flow and ticket sales throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="passengers" stroke="#0A2463" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="tickets" stroke="#FF1654" />
                    <Line type="monotone" dataKey="gates" stroke="#247BA0" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Resource Usage</CardTitle>
              <CardDescription>Current resource utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={systemMetrics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {systemMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="concurrency" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="concurrency">Concurrency</TabsTrigger>
            <TabsTrigger value="stations">Stations</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="concurrency">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Producer-Consumer Metrics</CardTitle>
                  <CardDescription>Ticket production and gate consumption rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Buffer Capacity</span>
                        <span className="text-sm">14/20</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-metro-accent h-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Gates (Semaphore)</span>
                        <span className="text-sm">3/5 free</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-metro-secondary h-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Queue Waiting Time</span>
                        <span className="text-sm">~45 seconds</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-metro-primary h-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Producer Stats</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Active:</span>
                            <span>3</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rate:</span>
                            <span>45/min</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rejected:</span>
                            <span>2.3%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Consumer Stats</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Active:</span>
                            <span>2</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Rate:</span>
                            <span>38/min</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Retries:</span>
                            <span>0.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" variant="outline">View Detailed Metrics</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Throughput</CardTitle>
                  <CardDescription>Processing capacity and bottlenecks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Current Throughput</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold">42</span>
                        <span className="text-sm text-muted-foreground">requests/second</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Peak Capacity</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold">120</span>
                        <span className="text-sm text-muted-foreground">requests/second</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm font-medium mb-3">System Bottlenecks</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Database Connections</span>
                          <Badge variant="outline" className="bg-green-50">Healthy</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Gate Processing</span>
                          <Badge variant="outline" className="bg-yellow-50">At Risk</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Payment Processing</span>
                          <Badge variant="outline" className="bg-red-50 text-red-500">Bottleneck</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Authentication</span>
                          <Badge variant="outline" className="bg-green-50">Healthy</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" variant="outline">View System Analytics</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stations">
            <Card>
              <CardHeader>
                <CardTitle>Station Traffic</CardTitle>
                <CardDescription>Number of tickets purchased per station</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="tickets" fill="#0A2463" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="services">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Health</CardTitle>
                  <CardDescription>Status of all system services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Service</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Uptime</th>
                          <th className="text-left py-3 px-4">Response Time</th>
                          <th className="text-left py-3 px-4">Load</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceHealthData.map((service, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{service.name}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={
                                  service.status === 'healthy' ? 'bg-green-50 text-green-600' :
                                  service.status === 'degraded' ? 'bg-yellow-50 text-yellow-600' :
                                  'bg-red-50 text-red-600'
                                }
                              >
                                {service.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{service.uptime}</td>
                            <td className="py-3 px-4">{service.responseTime}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={
                                  service.load === 'low' ? 'bg-blue-50 text-blue-600' :
                                  service.load === 'normal' ? 'bg-green-50 text-green-600' :
                                  'bg-yellow-50 text-yellow-600'
                                }
                              >
                                {service.load}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Error Logs</CardTitle>
                  <CardDescription>System errors and warnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Timestamp</th>
                          <th className="text-left py-3 px-4">Service</th>
                          <th className="text-left py-3 px-4">Error</th>
                          <th className="text-left py-3 px-4">Severity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {errorLogData.map((log, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4">{log.timestamp}</td>
                            <td className="py-3 px-4">{log.service}</td>
                            <td className="py-3 px-4">{log.error}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant="outline"
                                className={
                                  log.severity === 'critical' ? 'bg-red-50 text-red-600' :
                                  log.severity === 'error' ? 'bg-orange-50 text-orange-600' :
                                  log.severity === 'warning' ? 'bg-yellow-50 text-yellow-600' :
                                  'bg-blue-50 text-blue-600'
                                }
                              >
                                {log.severity}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
