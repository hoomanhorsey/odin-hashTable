class HashMap {
  constructor() {
    this.array = new Array(16).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
  set(key, value) {
    console.log(key + "" + value);

    let node = {
      key: key,
      value: value,
      next: null,
    };

    console.log("this array");
    console.log(this.array[0]);
    this.array[0] = node;
    console.log("logging new node");
    console.log(node);
  }

  get(key) {
    //  takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
  }
  has(key) {
    //takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
  }
  remove(key) {
    //takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  }
  length() {
    //returns the number of stored keys in the hash map.
  }
  clear() {
    //removes all entries in the hash map.
  }
  keys() {
    // returns an array containing all the keys inside the hash map
    for (let i = 0; i < this.array.length; i++) {}

    return;
  }
  values() {
    //    returns an array containing all the values.
  }
  entries() {}
}

let newHash = new HashMap();

console.log(`new hash for key: poo`);
console.log(newHash.hash("poo"));
console.log("");

newHash.set("poo", "smell");

console.log(newHash.array);
console.log(newHash.keys());
