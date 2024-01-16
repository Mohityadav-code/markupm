// import node from './base_node';

// const NODE_BACKGROUND_COLOR = 'nodeBackground-color';

// let nodeIdCounter = 1;

// const createNode = (name) => ({
//   id: (nodeIdCounter++).toString(),
//   name,
//   Class: node,
//   className: nodeIdCounter === 1 ? 'home_background' : NODE_BACKGROUND_COLOR,
// });

// const createEdge = (source, target) => ({
//   source,
//   target,
// });

// const createNodesAndEdgesFromApiData = (apiData) => {
//   // Parse the nodesData and edgesData from string to JSON
//   const nodesData = JSON.parse(apiData.nodesData);
//   const edgesData = JSON.parse(apiData.edgesData);

//   const nodes = nodesData.map((name) => createNode(name));
//   const edges = edgesData.map(([source, target]) => createEdge(source.toString(), target.toString()));

//   return { nodes, edges };
// };

// // Named export for fetchDataAndProcess
// export const fetchDataAndProcess = async () => {
//   try {
//     const response = await fetch('http://127.0.0.1:5000/api/link/mdTqsOMhbHs50w6O');
//     const apiData = await response.json();

//     // Process the data to create nodes and edges
//     return createNodesAndEdgesFromApiData(apiData);
//   } catch (error) {
//     console.error('Error fetching and processing data:', error);
//     throw error; // This will propagate the error to your component
//   }
// };



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
  // Parse the nodesData and edgesData from string to JSON
  const nodesData = JSON.parse(apiData.nodesData);
  const edgesData = JSON.parse(apiData.edgesData);

  const nodes = nodesData.map((name) => createNode(name));
  const edges = edgesData.map(([source, target]) => createEdge(source.toString(), target.toString()));

  return { nodes, edges };
};

// Function to fetch data using ID from the URL
export const fetchDataAndProcess = async () => {
  try {
    // Extracting the ID from the URL
    const urlSegments = window.location.pathname.split('/');
    const id = urlSegments[urlSegments.length - 1];

    const response = await fetch(`https://mohityadavcode.pythonanywhere.com/api/link/${id}`);
    const apiData = await response.json();

    // Process the data to create nodes and edges
    return createNodesAndEdgesFromApiData(apiData);
  } catch (error) {
    console.error('Error fetching and processing data:', error);
    throw error;
  }
};
