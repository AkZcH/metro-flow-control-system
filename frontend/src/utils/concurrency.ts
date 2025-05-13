
// Types for our concurrency simulation
export interface SemaphoreState {
  count: number;
  maxCount: number;
  waitingCount: number;
}

export interface Buffer<T> {
  capacity: number;
  items: T[];
}

export interface ProducerConsumerState {
  producers: {
    active: number;
    completed: number;
    failed: number;
    waiting: number;
  };
  consumers: {
    active: number;
    completed: number;
    failed: number;
    waiting: number;
  };
  buffer: Buffer<TicketRequest>;
  semaphore: SemaphoreState;
}

export interface TicketRequest {
  id: string;
  fromStation: string;
  toStation: string;
  timestamp: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

// Initialize a new producer-consumer system simulation
export const initProducerConsumerSystem = (bufferCapacity: number, maxConcurrentProcesses: number): ProducerConsumerState => {
  return {
    producers: {
      active: 0,
      completed: 0,
      failed: 0,
      waiting: 0
    },
    consumers: {
      active: 0,
      completed: 0,
      failed: 0,
      waiting: 0
    },
    buffer: {
      capacity: bufferCapacity,
      items: []
    },
    semaphore: {
      count: maxConcurrentProcesses,
      maxCount: maxConcurrentProcesses,
      waitingCount: 0
    }
  };
};

// Simulate producing a ticket request
export const produceTicket = (
  state: ProducerConsumerState, 
  ticket: Omit<TicketRequest, 'id' | 'timestamp' | 'status'>
): { newState: ProducerConsumerState; success: boolean; message: string } => {
  // Clone the state to avoid mutations
  const newState = JSON.parse(JSON.stringify(state)) as ProducerConsumerState;
  
  // Check if buffer is full
  if (newState.buffer.items.length >= newState.buffer.capacity) {
    newState.producers.failed++;
    return { 
      newState, 
      success: false, 
      message: 'Buffer is full. Ticket request rejected.' 
    };
  }
  
  // Create new ticket request
  const newTicket: TicketRequest = {
    id: `ticket-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fromStation: ticket.fromStation,
    toStation: ticket.toStation,
    timestamp: Date.now(),
    status: 'pending'
  };
  
  // Simulate production process
  newState.producers.active++;
  
  // Add to buffer
  newState.buffer.items.push(newTicket);
  
  // Complete production
  newState.producers.active--;
  newState.producers.completed++;
  
  return { 
    newState, 
    success: true, 
    message: `Ticket request ${newTicket.id} added to buffer.` 
  };
};

// Simulate consuming a ticket (validating at gate)
export const consumeTicket = (
  state: ProducerConsumerState, 
  ticketId?: string
): { newState: ProducerConsumerState; success: boolean; message: string; ticket?: TicketRequest } => {
  // Clone the state to avoid mutations
  const newState = JSON.parse(JSON.stringify(state)) as ProducerConsumerState;
  
  // Check if buffer is empty
  if (newState.buffer.items.length === 0) {
    return { 
      newState, 
      success: false, 
      message: 'No tickets in buffer to process.' 
    };
  }
  
  // Check if we can acquire the semaphore
  if (newState.semaphore.count <= 0) {
    newState.consumers.waiting++;
    return { 
      newState, 
      success: false, 
      message: 'All gates are busy. Please wait.' 
    };
  }
  
  // Find the ticket to process
  let ticketIndex = 0;
  if (ticketId) {
    ticketIndex = newState.buffer.items.findIndex(t => t.id === ticketId);
    if (ticketIndex === -1) {
      return { 
        newState, 
        success: false, 
        message: `Ticket ${ticketId} not found in buffer.` 
      };
    }
  }
  
  const ticket = newState.buffer.items[ticketIndex];
  
  // Acquire semaphore
  newState.semaphore.count--;
  newState.consumers.active++;
  
  // Process the ticket
  ticket.status = 'processing';
  
  // Simulate processing time (in a real app this would be async)
  setTimeout(() => {
    // This would be handled differently in a real app with proper state management
    ticket.status = 'completed';
  }, 2000);
  
  // Remove from buffer
  newState.buffer.items.splice(ticketIndex, 1);
  
  // Release semaphore
  newState.semaphore.count++;
  newState.consumers.active--;
  newState.consumers.completed++;
  
  return { 
    newState, 
    success: true, 
    message: `Ticket ${ticket.id} processed successfully.`,
    ticket
  };
};

// Simulate a traffic spike with many concurrent requests
export const simulateTrafficSpike = (
  state: ProducerConsumerState, 
  requestCount: number
): { newState: ProducerConsumerState; processedCount: number; failedCount: number } => {
  let currentState = JSON.parse(JSON.stringify(state)) as ProducerConsumerState;
  let processedCount = 0;
  let failedCount = 0;
  
  // Generate a bunch of ticket requests
  for (let i = 0; i < requestCount; i++) {
    // Random stations for simulation
    const fromStationId = `s${Math.floor(Math.random() * 8) + 1}`;
    const toStationId = `s${Math.floor(Math.random() * 8) + 1}`;
    
    // Skip if same station
    if (fromStationId === toStationId) {
      continue;
    }
    
    const result = produceTicket(currentState, {
      fromStation: fromStationId,
      toStation: toStationId
    });
    
    currentState = result.newState;
    
    if (result.success) {
      processedCount++;
    } else {
      failedCount++;
    }
  }
  
  return {
    newState: currentState,
    processedCount,
    failedCount
  };
};
