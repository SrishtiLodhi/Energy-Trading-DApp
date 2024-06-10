async function shortestPath(graph, start, end) {
    if (!graph[start] || !graph[end]) {
      return null;
    }
  
    const queue = [[start]];
    const visited = new Set();
  
    while (queue.length) {
      const path = queue.shift();
      const node = path[path.length - 1];
  
      if (node === end) {
        return path;
      }
  
      if (visited.has(node)) {
        continue;
      }
  
      visited.add(node);
  
      for (const neighbor of graph[node]) {
        queue.push(path.concat(neighbor));
      }
    }
  
    return [];
  }
  
module.exports = shortestPath;