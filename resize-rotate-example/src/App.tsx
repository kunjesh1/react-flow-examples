import React, { FunctionComponent } from 'react';
import ReactFlow, { ReactFlowProvider, Background, Node, Edge, MarkerType, Position, NodeTypes } from 'reactflow';

import 'reactflow/dist/style.css';

import ResizeRotateNode from './ResizeRotateNode';

const nodes: Node[] = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: 'Node 1' },
    type: 'resizeRotate',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    selected: true,
  },
  {
    id: '2',
    position: { x: 500, y: 300 },
    data: { label: 'Node 2' },
    type: 'resizeRotate',
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: '3',
    position: { x: 100, y: 500 },
    data: { label: 'Node 3' },
    type: 'resizeRotate',
    sourcePosition: Position.Left,
    targetPosition: Position.Right,
  },
];

const edges: Edge[] = [
  {
    id: '1->2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
  {
    id: '2->3',
    source: '2',
    target: '3',
    type: 'smoothstep',
  },
];

const nodeTypes: NodeTypes = {
  resizeRotate: ResizeRotateNode as FunctionComponent,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: '#9ca8b3' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
};

const proOptions = { account: 'paid-pro', hideAttribution: true };

function ReactFlowPro() {
  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      defaultNodes={nodes}
      defaultEdges={edges}
      defaultEdgeOptions={defaultEdgeOptions}
      proOptions={proOptions}
      defaultViewport={{ zoom: 1, x: 0, y: 0 }}
    >
      <Background />
    </ReactFlow>
  );
}

const ReactFlowWrapper = (props: any) => {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
