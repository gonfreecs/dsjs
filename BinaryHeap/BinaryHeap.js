//TODO: Add possibility to pass compare function

function BinaryHeap(type) {
  if(['min', 'max'].includes(type)) {
    this.type = this.types[type];
  }

  this.size = 0;
  this.type = this.type || this.types.max;
  this.heap = [];
}

BinaryHeap.prototype.types = {
  min: 1,
  max: 2
}

BinaryHeap.prototype.peek = function() {
  return this.heap[0];
};

BinaryHeap.prototype.push = function(k) {
  if(typeof k !== 'number') {
    throw new Error('Invalid node format.');
  }

  let idx = this.heap.length + 1;
  let pidx = (idx % 2 == 0) ? idx / 2 : (idx - 1) / 2;

  if(idx === 1 || typeof this.heap[pidx - 1] !== 'undefined') {
    this.heap.push(k);
  } else {
    this.heap[pidx - 1] = k;
    idx = pidx;
    pidx = (idx % 2 == 0) ? idx / 2 : (idx - 1) / 2;
  }

  if(this.heap.length < 2) return;

  while(idx - 1 > 0) {
    let p = this.heap[pidx - 1];

    if(!this.compare(p, k)) {
      this.heap[idx - 1] = p;
      this.heap[pidx - 1] = k;
      idx = pidx;
      pidx = (idx % 2 == 0) ? idx / 2 : (idx - 1) / 2;
    } else {
      this.size++;
      return;
    }
  }

  this.size++;
};

BinaryHeap.prototype.pop = function() {
  this.deleteAndShift(1);
  this.size--;
};

BinaryHeap.prototype.deleteAndShift = function(idx) {
  let lchildIdx = idx * 2;
  let rchildIdx = idx * 2 + 1;
  let lchild = this.heap[lchildIdx - 1];
  let rchild = this.heap[rchildIdx - 1];

  if(typeof lchild !== 'undefined' && typeof rchild !== 'undefined') {
    if(this.compare(lchild, rchild)) {
      this.heap[idx - 1] = lchild;
      this.deleteAndShift(lchildIdx);
    } else {
      this.heap[idx - 1] = rchild;
      this.deleteAndShift(rchildIdx);
    }
  } else if(typeof lchild !== 'undefined') {
    this.heap[idx - 1] = lchild;
    this.deleteAndShift(lchildIdx);
  } else if(typeof rchild !== 'undefined') {
    this.heap[idx - 1] = rchild;
    this.deleteAndShift(rchildIdx);
  } else {
    this.heap[idx - 1] = undefined;
    this.size--;
    return;
  }
};

BinaryHeap.prototype.compare = function(p, c) {
  if(this.type === this.types.min) {
    return p <= c;
  } else if(this.type === this.types.max) {
    return p >= c;
  } else {
    throw new Error('Unable to compare nodes. Aborted.');
  }
}

const h = new BinaryHeap();
h.push(1);
h.push(2);
h.push(4);
h.push(3);
h.push(5);
h.pop();
console.log(JSON.stringify(h));

const min = new BinaryHeap('min');
min.push(1);
min.push(2);
min.push(4);
min.push(3);
min.push(5);
min.pop();
console.log(JSON.stringify(min));
