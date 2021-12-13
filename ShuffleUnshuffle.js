//A Shuffle and Deshuffle implementation based on Mulberry32 and Fisher-Yates Algorithms.



/**
 * Javascript implementation of Mulberry32 PRNG. This function will be used to replace the
 * default Math.Random() for the shuffle and unshuffle functions.
 * 
 * The function returns the same PRN for the same seed.
 * @param {*} a The numeric seed.
 * @returns A pseudo-random number between 0 and 1.
 */
function mulberry32(a) {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
}


/**
 * Fisher-Yates shuffle.
 * 
 * @param {*} array
 * @param {*} seed Numeric Seed.
 * @returns A shuffled array.
 */
export function shuffle(array, seed){

  var m = array.length;
  var t, i;

  //Array Of Seeds generated from that one seed.
  let nextseed = [];
  let tseed=seed; 
  while (m){
    m--;
    let prn = mulberry32(parseInt(tseed)); 
    nextseed[m] = prn;
    tseed = prn.toString().substring(2, prn.toString().length);
  }


  //Shuffle
  m = array.length
  while (m) {

    i = Math.floor(nextseed[m-1] * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;


  }

  return array;


}






/**
 * Unshuffle a shuffled array, given a numberic seed
 * @param {*} array 
 * @param {*} seed Numeric Seed
 * @returns Unshuffled array
 */
export function unshuffle(array, seed){

  var m = array.length;
  var t, i;

  

  //Array Of Seeds generated from one seed.
  let nextseed = [];
  let tseed=seed; 
  while (m){
    m--;
    let prn = mulberry32(parseInt(tseed)); 
    nextseed[m] = prn;
    tseed = prn.toString().substring(2, prn.toString().length);
  }


  //Backtracked array of operations that was done on the original array to get to the shuffled array.
  let ops  = [...array];
  m = array.length;
  while (m) {
    // i is the real position of element array[m]
    i = Math.floor(nextseed[m-1] * m--);
    let addToOps = [m, i];
    ops[m] = addToOps;
  }



  //Unshuffle by backtracking the shuffle.
  m = array.length;
  let x= 0;

  while (m){

  	let newm = ops[x][0];
  	let newi = ops[x][1];

    t = array[newm];

    array[newm] = array[newi];
    array[newi] = t;


    m--;
    x++;

  }

return array;

}
