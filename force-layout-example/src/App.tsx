import React from 'react';
import ReactFlow, { Background, Edge, Node, NodeTypes, ProOptions, ReactFlowProvider } from 'reactflow';

import useForceLayout from './useForceLayout';
import GraphNode from './GraphNode';

import 'reactflow/dist/style.css';

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };
const defaultNodes: Node[] = [];
const defaultEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
  circle: GraphNode,
};

type ExampleProps = {
  strength: number;
  distance: number;
};

function ReactFlowPro({ strength, distance }: ExampleProps) {
  useForceLayout({ strength, distance });

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      minZoom={-Infinity}
      maxZoom={Infinity}
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      proOptions={proOptions}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
    >
      <Background />
    </ReactFlow>
  );
}

function ReactFlowWrapper(props: ExampleProps) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
