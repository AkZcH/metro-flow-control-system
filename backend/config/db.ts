class Semaphore {
    private count: number;
    constructor(initial: number) { this.count = initial; }
    async acquire() {
      while (this.count <= 0) await new Promise(r => setTimeout(r, 50));
      this.count--;
    }
    release() { this.count++; }
  }
  