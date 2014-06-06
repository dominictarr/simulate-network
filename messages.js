var random = require('./util')

function propagate (m, g, step) {
  var updated = false
  for(var k in m) {
    if(m[k] && m[k].step == step) {
      //send to all connected nodes.
      for(var j in g[k]) {
        if(m[k].from !== j) {
          updated = true
          if(!m[j]) {
            //console.log(k+'->'+j)
            m[j] = {from: k, count: 1, step: step + 1}
          } else {
            //console.log(k+'!>'+j)
            m[j].count ++
          }
        }
      }
    }
  }
  return updated
}

//calculate total transmits
//calculate unnecessary transmits
//
function stats (m) {
  var hops = 0, trx = 0, count = 0
  for(var k in m) {
    //get the number of hops to traverse the network.
    hops = Math.max(hops, m[k].step)
    trx += m[k].count
    count ++
  }
  return {hops: hops, trx: trx, nodes: count}
}


function simulate (n, e) {
  var messages = {}

  var g = random(n, e)
  messages.a = {from: null, count: 0, step: 1}
  var i = 1
  while(propagate(messages, g, i++))
    ;
  var s = stats(messages)
  s.edges = e
  return s
}

for(var i = 1; i <= 2; i+=0.05)
console.log(simulate(10000, i))

//okay... hmm, so I get 50% over head with 1.3 connections
//if you go up to 2 connections, you get 200% overhead,
//but half the hops of 1.3 connections...
//so, basically... half the latency, but tripple the bandwidth.

//okay that makes sense...
//but how would it work in a perfect situation?

//or various preconstructed networks, like a lattice
//or tree...
//a (hyper)lattice means an upper bound on hops between nodes.


