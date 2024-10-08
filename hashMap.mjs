//******************** */
// So the main question I have is once I have a hashcode, how do I allocate it to a bucket?
// Does the hash algorithm show and upper bound to the hashbode? And then if it does do I segment the buckets according to this range?

class HashMap {
  constructor() {
    this.bucketLength = 8;
    this.bucketArray = new Array(this.bucketLength).fill(null);
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
    // Set node pseudo code
    // Take 'key' and 'value', and create a node object.
    // Put 'key' into hash() and get hashcode
    // Look up hashcode to determine which bucket the node goes into

    console.log(key + " " + value);
    console.log("hashcode");
    console.log(this.hash(key));

    let bucketNum = this.hash(key) % this.bucketLength;
    console.log("bucketNum");

    console.log(bucketNum);

    let node = {
      key: key,
      value: value,
      next: null,
    };

    console.log("this bucketArray");
    console.log(this.bucketArray[bucketNum]);

    if (this.bucketArray[bucketNum] === null) {
      this.bucketArray[bucketNum] = node;
      console.log("logging new node");
      console.log(node);
    } else {
      console.log("bucket is already taken what do I do??");

      // traverse teh linked list until you find the last one....

      let current = this.bucketArray[bucketNum];

      while (current.next != null) {
        current = current.next;
      }
      console.log(current.next);
      current.next = node;
    }
  }

  get(key) {
    // TODO create a binary search function, traversing left to centre to right, returning the value if it finds the value, null if it can't find it.  NOTE: Same algo as 'has()' below

    let hasResult = this.helperFindKey(key);

    if (hasResult === null) {
      return null;
    } else {
      console.log("value " + hasResult.value);
      return hasResult.value;
    }
  }
  has(key) {
    //takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

    let hasResult = this.helperFindKey(key);

    if (hasResult === null) {
      return null;
    } else {
      console.log("true");
      console.log(key + " " + hasResult.key);

      return true;
    }

    // console.log(this.helperFindKey(key));
  }

  remove(key) {
    //takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    // NOTE: Same algo as 'has() and get()' above
    // but once it finds the key, it removes teh key

    console.log("****remove****");
    let bucketNum = this.hash(key) % this.bucketLength;
    let current = this.bucketArray[bucketNum];
    let previous;

    while (current.key !== key) {
      if (current.next === null) {
        console.log("Nope. Not here. returning null");
        return null;
      }
      previous = current;
      current = current.next;
    }
    console.log(previous);
    console.log(current);

    // in the absence of a declared headNode, the previous node of the first object in the array will be 'undefined'
    if (previous === undefined) {
      console.log(current.key);
      console.log(current.next);
      this.bucketArray[bucketNum] = current.next;

      console.log("found it. and removed object");
      console.log("current.key " + current.key + ", key " + key);
      return true;
      // in the absence of a declared tailNode, the next node of the last object in the array will be 'undefined'
    } else if (current.next === undefined) {
      previous.next = null;
    } else {
      console.log(previous);
      console.log(current);
      previous.next = current.next;
    }
  }
  length() {
    //returns the number of stored keys in the hash map.
    //Binary search aglo    // tallies value++ each time a key has a value != null
    // But how do you stop it from repeating? Does binary search already skip over repeats by the way it is structured?
    let counter = 0;

    //pseudocode
    //    - check each element in the array, bucketlength represents how many arrays

    for (let bucket = 0; bucket < this.bucketLength; bucket++) {
      console.log("****** doing bucket number: " + bucket);
      console.log(newHash.bucketArray[bucket]);

      if (bucket < 0 || bucket >= this.bucketLength) {
        throw new Error("Trying to access index out of bound");
      }

      let current = newHash.bucketArray[bucket];
      console.log(current.key);

      while (current != null) {
        current = current.next;
        counter++;
        console.log(counter);
      }
    }
    console.log(counter);
  }
  clear() {
    //removes all entries in the hash map.
    // Could you just just fill the arras with null?
    // Or do you need to traverse the array and write 'null' into all the next values, until the final falue is null.
    // Might be worth asking chat GPT this one.

    for (let bucket = 0; bucket < this.bucketLength; bucket++) {
      newHash.bucketArray[bucket] = null;
    }
  }
  keys() {
    // returns an array containing all the keys inside the hash map
    // Actually, probably need to create a binary search tree and then pop each new key into the array.

    const keyArray = [];
    for (let bucket = 0; bucket < this.bucketLength; bucket++) {
      console.log("****** doing keys number: " + bucket);
      console.log(newHash.bucketArray[bucket]);

      let current = newHash.bucketArray[bucket];

      while (current != null) {
        console.log(current.key);
        keyArray.push(current.key);
        current = current.next;
      }
    }
    console.log(keyArray);
  }
  values() {
    //    returns an array containing all the values.
    // same as above, but pop values into an array.
    const valueArray = [];
    for (let bucket = 0; bucket < this.bucketLength; bucket++) {
      console.log("****** doing values number: " + bucket);
      console.log(newHash.bucketArray[bucket]);

      let current = newHash.bucketArray[bucket];

      while (current != null) {
        console.log(current.value);
        valueArray.push(current.value);
        current = current.next;
      }
    }

    console.log(valueArray);
  }
  entries() {
    const keyValueArray = [];
    for (let bucket = 0; bucket < this.bucketLength; bucket++) {
      console.log("****** doing keyvalues number: " + bucket);
      console.log(newHash.bucketArray[bucket]);

      let current = newHash.bucketArray[bucket];

      while (current != null) {
        console.log("current key");

        console.log(current.key);

        // let tempObject = `"${current.key} :  ${current.value}"`;

        let tempObject = {};

        tempObject[`${current.key}`] = current.value;
        console.log(tempObject);

        keyValueArray.push(tempObject);
        current = current.next;
      }
    }
    console.log(keyValueArray);
  }
  //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

  helperFindKey(key) {
    console.log("********helpFinderKey(key)");

    let bucketNum = this.hash(key) % this.bucketLength;
    let current = this.bucketArray[bucketNum];

    while (current.key !== key) {
      if (current.next === null) {
        console.log("Nope. Not here. returning null");
        return null;
      }
      current = current.next;
    }
    console.log(current.key);
    console.log("found it. returning found object");
    console.log("current.key " + current.key + ", key " + key);
    return current;
  }
}

let newHash = new HashMap();

console.log(`new hash for key: poo`);
console.log(newHash.hash("poo"));
console.log("");

console.log(`new hash for key: 'other test word`);
console.log(newHash.hash("other test word"));
console.log("");

newHash.set("a", "smell1");
newHash.set("b", "smell2");
newHash.set("c", "smell3");
newHash.set("d", "smell4");
newHash.set("e", "smellz");
newHash.set("f", "smelt");
newHash.set("g", "smelt");
newHash.set("h", "smelt");
newHash.set("i", "smelt");
newHash.set("j", "smelt");
newHash.set("k", "smelt");
newHash.set("l", "smelt");
newHash.set("m", "smelt");
newHash.set("n", "smelt");
newHash.set("o", "smelt");
// newHash.set("p", "smelt");

newHash.set("pop", "smell");
newHash.set("poeop", "smell");

console.log(newHash.array);
console.log(newHash.keys());

console.log(newHash.bucketArray);

console.log("new hash");

console.log(newHash.bucketArray[0]);

newHash.get("p");
newHash.get("b");
newHash.get("l");
newHash.get("sldkfj");

newHash.has("d");

newHash.has("skjhskf");

newHash.remove("g");

console.log(newHash.bucketArray);

newHash.length();

// newHash.clear();
console.log(newHash.bucketArray);

newHash.values();
newHash.keys();

newHash.entries();
