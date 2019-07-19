class MemoryStorage implements Storage {
  private data: { [key: string]: any } = {};

  get length() {
    return Object.values(this.data).filter(value => value !== undefined).length;
  }

  key(index: number) {
    return Object.keys(this.data)[index] || null;
  }

  setItem(key: string, value: any) {
    this.data[key] = value;
  }

  getItem(key: string) {
    return this.data[key] !== undefined ? this.data[key] : null;
  }

  removeItem(key: string) {
    this.data[key] = undefined;
  }

  clear() {
    this.data = {};
  }
}

export function getStorageImplementation() {
  try {
    localStorage.setItem('test', 'true');
    localStorage.removeItem('test');
    return localStorage;
  } catch {
    return new MemoryStorage();
  }
}
