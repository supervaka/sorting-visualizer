export function getMergeSortAnimations(array: Array<number>) {
  //const animations: Array<[number, number]> = [];
  const animations: any = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray: Array<number>,
  startIdx: number,
  endIdx: number,
  auxiliaryArray: Array<number>,
  animations: Array<[number, number]>
  //animations: any
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: Array<number>,
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: Array<number>,
  animations: Array<[number, number]>
  //animations: any
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    //animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    //animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    //animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    //animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    //animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    //animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array: Array<number>) {
  //const animations: Array<[number, number]> = [];
  const animations: any = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  return animations;
}

function quickSortHelper(
  auxiliaryArray: Array<number>,
  startIdx: number,
  endIdx: number,
  animations: Array<[number, number]>
  //animations: any
) {
  if (startIdx >= endIdx) return;
  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    if (
      auxiliaryArray[leftIdx] > auxiliaryArray[pivotIdx] &&
      auxiliaryArray[rightIdx] < auxiliaryArray[pivotIdx]
    ) {
      animations.push([leftIdx, rightIdx]);
      animations.push([leftIdx, rightIdx]);
      animations.push([leftIdx, auxiliaryArray[rightIdx]]);
      animations.push([rightIdx, auxiliaryArray[leftIdx]]);
      swap(auxiliaryArray, leftIdx, rightIdx);
    }
    if (auxiliaryArray[leftIdx] <= auxiliaryArray[pivotIdx]) leftIdx++;
    if (auxiliaryArray[rightIdx] >= auxiliaryArray[pivotIdx]) rightIdx--;
  }
  animations.push([pivotIdx, rightIdx]);
  animations.push([pivotIdx, rightIdx]);
  animations.push([pivotIdx, auxiliaryArray[rightIdx]]);
  animations.push([rightIdx, auxiliaryArray[pivotIdx]]);
  swap(auxiliaryArray, pivotIdx, rightIdx);
  const leftSubarrayIsSmaller =
    rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(auxiliaryArray, startIdx, rightIdx - 1, animations);
    quickSortHelper(auxiliaryArray, rightIdx + 1, endIdx, animations);
  } else {
    quickSortHelper(auxiliaryArray, rightIdx + 1, endIdx, animations);
    quickSortHelper(auxiliaryArray, startIdx, rightIdx - 1, animations);
  }
}

export function getHeapSortAnimations(array: Array<number>) {
  //const animations: Array<[number, number]> = [];
  const animations: any = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  heapSortHelper(array, auxiliaryArray, animations);
  return animations;
}

function heapSortHelper(
  mainArray: Array<number>,
  auxiliaryArray: Array<number>,
  animations: Array<[number, number]>
  //animations: any
) {
  buildMaxHeap(auxiliaryArray, animations);
  for (let endIdx = auxiliaryArray.length - 1; endIdx > 0; endIdx--) {
    animations.push([0, endIdx]);
    animations.push([0, endIdx]);
    animations.push([0, auxiliaryArray[endIdx]]);
    animations.push([endIdx, auxiliaryArray[0]]);
    swap(auxiliaryArray, 0, endIdx);
    siftDown(0, endIdx - 1, auxiliaryArray, animations);
  }
}

function buildMaxHeap(
  auxiliaryArray: Array<number>,
  animations: Array<[number, number]>
  //animations: any
) {
  const firstParentIdx = Math.floor((auxiliaryArray.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, auxiliaryArray.length - 1, auxiliaryArray, animations);
  }
}

function siftDown(
  currentIdx: number,
  endIdx: number,
  auxiliaryArray: Array<number>,
  animations: Array<[number, number]>
  //animations: any
) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (
      childTwoIdx !== -1 &&
      auxiliaryArray[childTwoIdx] > auxiliaryArray[childOneIdx]
    ) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    if (auxiliaryArray[idxToSwap] > auxiliaryArray[currentIdx]) {
      animations.push([currentIdx, idxToSwap]);
      animations.push([currentIdx, idxToSwap]);
      animations.push([currentIdx, auxiliaryArray[idxToSwap]]);
      animations.push([idxToSwap, auxiliaryArray[currentIdx]]);
      swap(auxiliaryArray, currentIdx, idxToSwap);
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
  }
}

export function getInsertionSortAnimations(array: Array<number>) {
  //const animations: Array<[number, number]> = [];
  const animations: any = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  insertionSortHelper(array, auxiliaryArray, animations);
  return animations;
}

function insertionSortHelper(
  mainArray: Array<number>,
  auxiliaryArray: Array<number>,
  animations: Array<[number, number]>
  //animations: any
) {
  for (let i = 1; i < auxiliaryArray.length; i++) {
    let j = i;
    while (j > 0 && auxiliaryArray[j] < auxiliaryArray[j - 1]) {
      animations.push([j, j - 1]);
      animations.push([j, j - 1]);
      animations.push([j, auxiliaryArray[j - 1]]);
      animations.push([j - 1, auxiliaryArray[j]]);
      swap(auxiliaryArray, j, j - 1);
      j -= 1;
    }
  }
}

function swap(auxiliaryArray: Array<number>, a: number, b: number) {
  const temp = auxiliaryArray[a];
  auxiliaryArray[a] = auxiliaryArray[b];
  auxiliaryArray[b] = temp;
}
