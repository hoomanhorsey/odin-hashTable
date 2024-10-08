class HashMap {
  constructor() {
    this.bucketCapacity = 16;
    this.loadfactor = 0.75;
    this.bucketArray = new Array(this.bucketCapacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketCapacity;
    }
    return hashCode;
  }
  set(key, value) {
    // check loadfactor
    if (this.length() > this.bucketCapacity * this.loadfactor) {
      console.log("time to rehash");
      console.log(
        "number of items" +
          this.length() +
          " items to trigger refactor" +
          this.bucketCapacity * this.loadfactor
      );
      // Extracting data into a temp array, clearing old hashmap,
      let tempArray = test.entries();
      let rehashLength = this.length();
      this.clear();
      // Creating new hashmap with increased capacity
      this.bucketCapacity = this.bucketCapacity * 2;
      this.bucketArray = new Array(this.bucketCapacity).fill(null);
      console.log("new bucket capacity " + this.bucketCapacity);

      // repopulating array with old content
      for (let item = 0; item < rehashLength; item++) {
        this.set(tempArray[item][0], tempArray[item][1]);
      }
    }

    let bucketNum = this.hash(key) % this.bucketCapacity;

    let node = {
      key: key,
      value: value,
      next: null,
    };

    // checking for duplicate keys, and replacing values if there are.
    if (this.has(key) === true) {
      console.log("we have a dupe");
      let dupe = this.helperFindKey(key);
      dupe.value = value;
    } else {
      // if bucket is empty, key is first item
      if (this.bucketArray[bucketNum] === null) {
        this.bucketArray[bucketNum] = node;
      } else {
        // otherwise cycle through til null and put it at the end.
        let current = this.bucketArray[bucketNum];
        while (current.next != null) {
          current = current.next;
        }
        current.next = node;
      }
    }
  }

  get(key) {
    let hasResult = this.helperFindKey(key);
    if (hasResult === null) {
      return null;
    } else {
      return hasResult.value;
    }
  }
  has(key) {
    let hasResult = this.helperFindKey(key);
    if (hasResult === null) {
      return null;
    } else {
      return true;
    }
  }

  remove(key) {
    let bucketNum = this.hash(key) % this.bucketCapacity;
    let current = this.bucketArray[bucketNum];
    let previous;

    while (current.key !== key) {
      if (current.next === null) {
        return null;
      }
      previous = current;
      current = current.next;
    }
    // in the absence of a declared headNode, the previous node of the first object in the array will be 'undefined'
    if (previous === undefined) {
      this.bucketArray[bucketNum] = current.next;

      return true;
      // in the absence of a declared tailNode, the next node of the last object in the array will be 'undefined'
    } else if (current.next === undefined) {
      previous.next = null;
    } else {
      previous.next = current.next;
    }
  }
  length() {
    let counter = 0;
    for (let bucket = 0; bucket < this.bucketCapacity; bucket++) {
      if (bucket < 0 || bucket >= this.bucketCapacity) {
        throw new Error("Trying to access index out of bound");
      }

      let current = test.bucketArray[bucket];

      while (current != null) {
        current = current.next;
        counter++;
      }
    }
    return counter;
  }
  clear() {
    for (let bucket = 0; bucket < this.bucketCapacity; bucket++) {
      test.bucketArray[bucket] = null;
    }
  }
  keys() {
    const keyArray = [];
    for (let bucket = 0; bucket < this.bucketCapacity; bucket++) {
      let current = test.bucketArray[bucket];

      while (current != null) {
        keyArray.push(current.key);
        current = current.next;
      }
    }
    return keyArray;
  }
  values() {
    const valueArray = [];
    for (let bucket = 0; bucket < this.bucketCapacity; bucket++) {
      let current = test.bucketArray[bucket];

      while (current != null) {
        valueArray.push(current.value);
        current = current.next;
      }
    }

    return valueArray;
  }
  entries() {
    const keyValueArray = [];
    for (let bucket = 0; bucket < this.bucketCapacity; bucket++) {
      let current = test.bucketArray[bucket];

      while (current != null) {
        let tempObject = [];

        // tempObject[`${current.key}`] = current.value;
        tempObject = [current.key, current.value];

        keyValueArray.push(tempObject);
        current = current.next;
      }
    }
    return keyValueArray;
  }
  //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

  helperFindKey(key) {
    let bucketNum = this.hash(key) % this.bucketCapacity;
    let current = this.bucketArray[bucketNum];

    if (current === null) {
      return null;
    }
    while (current.key !== key) {
      if (current.next === null) {
        return null;
      }
      current = current.next;
    }

    return current;
  }
}

let test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("pple", "red");
test.set("bnana", "yellow");
test.set("arrot", "orange");
test.set("og", "brown");
test.set("lephant", "gray");
test.set("rog", "green");
test.set("rape", "purple");
test.set("at", "black");
test.set("ce cream", "white");
test.set("acket", "blue");
test.set("ite", "pink");
test.set("ion", "golden");

test.set("ple", "red");
test.set("nana", "yellow");
test.set("arrt", "orange");
test.set("o", "brown");
test.set("lphant", "gray");
test.set("rg", "green");
test.set("rpe", "purple");
test.set("t", "black");
test.set("c cream", "white");
test.set("aket", "blue");
test.set("ie", "pink");
test.set("in", "golden");

test.set("pop", "smell");
test.set("poeop", "smell");

console.log("keys()");
console.log(test.keys());

console.log("get()");
console.log(test.get("elephant"));
console.log(test.get("sldkfj"));

console.log("test()");
console.log(test.has("jacket"));
console.log(test.has("sdf"));

test.remove("g");

console.log("length " + test.length());

console.log(test.values());
console.log();

test.entries();

test.set("apple", "poo");

console.log("length " + test.length());

test.set("apple", "stinkypoo");
