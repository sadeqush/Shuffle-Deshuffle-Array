# Shuffle and Deshuffle Array in Javascript
Shuffle an array with a seed, and unshuffle back to the original with the same seed.

Implemented with Mulberry32 PRNG and Fisher-Yates Shuffle algorithm in plain Javascript.

```javascript
shuffle(array, numericSeed)
unshuffle(array, numbericSeed)
```

The seed must be an integer right now. Feel free to implement strings and push to this git.



**Example Code:**

>Download the file, put the JS in your project folder.

```javascript
import {shuffle, unshuffle} from './ShuffleUnshuffle.js'

let arr = ['a', 'b', 'c', 'd'];

let shuffled = shuffle(arr, 12);
//Expect this to be a shuffled array.

let unshuffled = unshuffle(shuffled, 12);
//Expect this to be similar to arr
```
