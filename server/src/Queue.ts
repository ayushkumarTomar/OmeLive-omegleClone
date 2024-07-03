interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
    remove(item: T): void;
    find(id: string): T | undefined;
    printQueue(): void;
  }
  
  // Add a constraint on T to require an 'id' property
  class Queue<T extends { id: string }> implements IQueue<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    enqueue(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    dequeue(): T | undefined {
      return this.storage.shift();
    }
  
    size(): number {
      return this.storage.length;
    }
  
    remove(item: T): void {
      const index = this.storage.findIndex((elem) => elem.id === item.id);
      if (index !== -1) {
        this.storage.splice(index, 1);
      }
    }
  
    find(id: string): T | undefined {
      return this.storage.find((item) => item.id === id);
    }
  
    printQueue(): void {
      console.log("Current Queue:");
      console.log(this.storage);
    }
  }
  
  export default Queue;