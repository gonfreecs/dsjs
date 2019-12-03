function BinaryHeap(type) {
  if(['min', 'max'].includes(type)) {
    this.type = this.types[type];
  }

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

  this.heap.push(k);

  if(this.heap.length < 2) return;

  let idx = this.heap.length;
  let pidx = (idx % 2 == 0) ? idx / 2 : (idx - 1) / 2;

  while(idx - 1 > 0) {
    let p = this.heap[pidx - 1];

    if(!this.compare(p, k)) {
      this.heap[idx - 1] = p;
      this.heap[pidx - 1] = k;
      idx = pidx;
      pidx = (idx % 2 == 0) ? idx / 2 : (idx - 1) / 2;
    } else {
      return;
    }
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
console.log(JSON.stringify(h));

const min = new BinaryHeap('min');
min.push(1);
min.push(2);
min.push(4);
min.push(3);
min.push(5);
console.log(JSON.stringify(min));
