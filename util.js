var ids = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

var l = 1024
while(l--)
  ids.push(l)

function peers (n) {
  var a = {}
  for(var i = 0; i < n; i++)
    a[ids[i]] = {}
  return a
}

function contains (ary, item) {
  return ary[item]
}

function add(ary, item) {
  ary[item] = true
  return ary
}

//connect peers randomly with n connections per node.
function connections (g, N) {
  var keys = Object.keys(g)
  for(var  id in g) {
    var n = N + 1
    if(keys.length == 1) {
      g[id] = add({}, id)
      return g
    }
    while(0 <-- n) {
      if(n < 1)
        if(Math.random() > n) {
          n = 0; break
        }
      var rid = id
      while(rid == id) {
        rid = keys[~~(Math.pow(Math.random(), 1)*keys.length)]
      }
      add(g[id], rid)
      add(g[rid], id)
    }
  }
  return g
}

function randomGraph(n, e) {
  return connections(peers(n), e)
}

function circular(ary, i) {
  i = i % ary.length
  if(i >= 0 && i <= ary.length)
    return ary[~~i]
  if(i < 0)
    return ary[~~(ary.length + i)]
  return ary
}

function lattice (n, d) {
  var g = peers(n)
  var keys = Object.keys(g)
  var l = Math.sqrt(n)
  console.log(n, l)
  keys.forEach(function (k, i) {
    //add to the next and prev
    add(g[k], circular(keys, i + 1))
    add(g[k], circular(keys, i - 1))
    add(g[k], circular(keys, i + l))
    add(g[k], circular(keys, i - l))
    add(g[k], circular(keys, i + l*3))
    add(g[k], circular(keys, i - l*3))
  })
  return g
}

module.exports = randomGraph

module.exports.lattice = lattice

if(!module.parent) {
  console.log(lattice(32, 2))
}
