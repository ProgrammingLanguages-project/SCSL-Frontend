import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import MainComponent from './components/MainComponent';
import Variables from './components/Variables';

const initialNodes = [
  { id: 'node-1', type: 'mainComponent', position: { x: 550, y: 150  }, data: { value: 123 }, targetPosition: 'left', },
  { id: 'node-2', type: 'variables', position: { x: 100, y: 150 }, data: { value: 456 }, sourcePosition: 'right', },
];
const nodeTypes = { mainComponent: MainComponent, variables: Variables };
const initialEdges = [{ id: 'e1-2', source: 'node-2', target: 'node-1'}];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
  );
}