import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import MainComponent from './components/MainComponent';
import Variables from './components/Variables';
import { Functions } from './components/functions/Functions';
import { Appearance } from './components/Appearance.jsx';

const initialNodes = [
  {
    id: 'node-1',
    type: 'mainComponent',
    position: { x: 400, y: 50 },
    data: { value: 123 },
    targetPosition: 'left',
  },
  {
    id: 'node-2',
    type: 'variables',
    position: { x: 50, y: 50 },
    data: { value: 456 },
    sourcePosition: 'right',
  },
  {
    id: 'node-3',
    type: 'functions',
    position: { x: 50, y: 400 },
    data: { value: 789 },
    sourcePosition: 'right',
  },
  {
    id: 'node-4',
    type: 'appearance',
    position: { x: 850, y: 50 },
    data: { value: 789 },
    sourcePosition: 'right',
  },
];
const nodeTypes = {
  mainComponent: MainComponent,
  variables: Variables,
  functions: Functions,
  appearance: Appearance,
};
const initialEdges = [{ id: '2-1', source: 'node-2', target: 'node-1', markerEnd: { type: MarkerType.ArrowClosed }, targetHandle: 'main-left' },
                      { id: '3-1', source: 'node-3', target: 'node-1', markerEnd: { type: MarkerType.ArrowClosed }, targetHandle: 'main-left' },
                      { id: '4-1', source: 'node-4', target: 'node-1', markerEnd: { type: MarkerType.ArrowClosed }, targetHandle: 'main-right' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
