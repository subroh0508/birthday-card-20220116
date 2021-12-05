export class Graph {
  _adjacencyList = {};
  _graph = [];

  constructor(adjacencyList) {
    this.adjacencyList = adjacencyList;
  }

  update(object, collisions, nextCollisions) {
    this.adjacencyList = _updateAdjacencyList(this._adjacencyList, object, collisions, nextCollisions);
  }

  forEach(callback) { this._graph.forEach(callback); }

  get adjacencyList () { return this._adjacencyList; }
  set adjacencyList(adjacencyList) {
    this._adjacencyList = adjacencyList;
    this._graph = _initGraph(adjacencyList);
  }
}

const _initGraph = (initAdjacencyList) => {
  let adjacencyList = Object.entries(initAdjacencyList).filter(([_, node]) => !!node.length)
    .sort(([_id1, node1], [_id2, node2]) => node1.length - node2.length)
    .map(([id, node]) => [Number(id), node]);

  const graph = [];
  while (!!Object.keys(adjacencyList).length) {
    const originId = adjacencyList[0] && adjacencyList[0][0];
    const chainNode = _searchChainNode(originId, Object.fromEntries(adjacencyList));

    graph.push(chainNode);
    adjacencyList = adjacencyList.filter(([id, _]) => !chainNode.includes(id));
  }

  return graph;
}

const _searchChainNode = (originId, adjacencyList) => {
  if (!originId && !adjacencyList[originId].length) {
    return [];
  }

  const node = [];
  const nextVisits = [originId];
  while (!!nextVisits.length) {
    const visit = nextVisits.shift();
    node.push(visit);

    (adjacencyList[visit] || []).forEach(n => {
      if (node.includes(n.id)) {
        return;
      }

      nextVisits.push(n.id);
    })
  }

  return node;
}

const _updateAdjacencyList = (adjacencyList, object, collisions, nextCollisions) => {
  const additional = nextCollisions.filter(({ id }) => !collisions.find(c => c.id === id));
  const removal = !nextCollisions.length ? collisions : [];

  if (!additional.length && !removal.length) {
    return adjacencyList;
  }

  adjacencyList[object.id] = additional.reduce(
    (acc, obj) => !acc.some(c => c.id === obj.id) ? [...acc, obj] : acc,
    adjacencyList[object.id] || [],
  ).filter(obj => !removal.some(c => c.id === obj.id));

  additional.forEach(obj => {
    adjacencyList[obj.id] = [
      ...(adjacencyList[obj.id] || []).filter(c => c.id !== object.id),
      object,
    ];
  });

  removal.forEach(obj => {
    adjacencyList[obj.id] = (adjacencyList[obj.id] || []).filter(c => c.id !== object.id);
  });

  return adjacencyList;
};
