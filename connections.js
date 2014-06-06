
var randomGraph = require('./util')

//EXPERIMENT!

//if we make one connection per node, what is the prob that graph is connected?

//calculate the size of the largest group.

/*
test 2 - data hops

One node broadcasts a message to all node's it's connected to.

If a node recieves a message, it transmits it in the next round.
*/

function contains(obj, key) {
  return !!obj[key]
}

function add (obj, key) {
  obj[key] = true
  return obj
}

function each(ary, iter) {
  for(var k in ary)
    iter(k, ary)
}

//return all nodes reachable from id, 
function reachable(g, id, seen) {
  seen = seen || {}
  add(seen, id)
  var next = g[id]
  each(next, function (id) {
    if(contains(seen, id)) return
    reachable(g, id, seen)
  })
  return seen
}

function find (ary, test) {
  for(var i in ary)
    if(test(ary[i], i, ary)) return ary[i]
}

//detect the groups in the graph.
function groups (g) {
  var groups = []
  for(var id in g) {
    //if this id is not already in a group, create a new group for it.
    if(!find(groups, function (group) { return contains(group, id) }))
      groups.push(reachable(g, id))
  }
  return groups
}

function size(obj) {
  var c = 0; for(var k in obj) c++; return c
}

function largestSize(groups) {
  var m = 0; for(var i in groups); m = Math.max(size(groups[i])); return m
}


//from 1 to 1000 generate 100 random networks,
//and count how many are totally connected.
var total = 100
for (var i = 1; i < 1000; i++) {
  var n = total, count = 0, z = 0
  while(n--) {
    var g = randomGraph(i, 1.3)
    var s = groups(g)
    if(s.length == 1) count ++
    z += largestSize(s)
  }
  console.log(''+i, (count / total).toPrecision(2), ((z / total)/i).toPrecision(3))

}

// so, with a lattice, you *could* avoid resending messages
// by only propagating things outwards...
// but such a network would require coordination.

// okay so what if you have different strategies to
// connect into the network, and each node can select one that
// works for them... that could be about optimizing for
// latency or for bandwidth.

// what would the latency be?

// if each hop is 200 ms and it takes 10 hops, that is 2 seconds
// that is too much for chat, but okay for twitter.
// this is very soft real time... sometimes a direct connection
// is possible - but relaying would also be feasible.
// ... that is a different protocol layer, though.

// BASICALLY: if you want lower latency, connect to more nodes.
// if you want lower bandwidth connect to less...
