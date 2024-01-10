import node from './base_node';

const NODE_BACKGROUND_COLOR = 'nodeBackground-color';

let nodeIdCounter = 1;

const createNode = (name) => ({
  id: (nodeIdCounter++).toString(),
  name,
  Class: node,
  className: nodeIdCounter === 1 ? 'home_background' : NODE_BACKGROUND_COLOR,
});

const createEdge = (source, target) => ({
  source,
  target,
});

const createNodesAndEdgesFromApiData = (apiData) => {
  const nodesData = apiData[0].nodesData;
  const edgesData = apiData[0].edgesData;

  const nodes = nodesData.map((name) => createNode(name));
  const edges = edgesData.map(([source, target]) => createEdge(source.toString(), target.toString()));

  return { nodes, edges };
};

// Assume you fetch data from API and store it in apiData
  const dataFromApi =()=>{
    fetch('http://localhost:3005/api/link/fmbcw4fn1afxxxvn2jx6q')
    .then(response => response.json())
      .then(data =>
          {
            console.log(data)
            return data
          }
      )
      .catch(error => console.log(error))
    
  }
 console.log(dataFromApi());

const apiData = [
  {
    id: 3,
    linkId: 'fmbcw4fn1afxxxvn2jx6q',
    nodesData: ['User', 'Post', 'Comment'],
    edgesData: [[1, 2], [1, 3], [2, 3]],
    t_create: null,
  },
  // Add more data if needed
];


console.log(apiData);


const { nodes, edges } = createNodesAndEdgesFromApiData(apiData);

export default { nodes, edges };
