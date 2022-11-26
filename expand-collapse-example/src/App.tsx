import React, { useEffect, useState, MouseEvent } from 'react';
import ReactFlow, { Position, ReactFlowProvider, useReactFlow, MiniMap, Background, Node, Edge } from 'reactflow';
import { hierarchy as d3Hierarchy, tree as d3Tree } from 'd3-hierarchy';
import { scaleLinear as d3ScaleLinear } from 'd3-scale';

import data from './tree';

import useAnimatedNodes from './useAnimatedNodes';

import 'reactflow/dist/style.css';

const colorScale = d3ScaleLinear<string>().domain([0, 5]).range(['#ff0072', '#0041d0']);

type DataType = {
  name: string;
  url: string;
  expanded?: boolean;
  id?: string;
  children?: any;
};

const hierarchy = d3Hierarchy<DataType>(data[0]);

hierarchy.descendants().forEach((d, i) => {
  d.data.expanded = false;
  d.data.id = `${i}`;
  d.data.children = d.children;
  d.children = undefined;
});

const layout = d3Tree<DataType>().nodeSize([25, 200]);

function getElements() {
  hierarchy.descendants().forEach((d, i) => {
    d.children = d.data.expanded ? d.data.children : null;
  });

  const root = layout(hierarchy);

  const nodes = root.descendants().map((d) => ({
    id: d.data.id,
    data: { label: d.data.name, depth: d.depth },
    position: { x: d.y, y: d.x },
    style: { padding: 0, backgroundColor: colorScale(d.depth), border: 'none', color: 'white', fontWeight: 'bold' },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: d.data.children ? 'default' : 'output',
  }));

  const edges = root.links().map((d, i) => ({ id: `${i}`, source: d.source.data.id, target: d.target.data.id }));

  return { nodes, edges };
}

const initialElements = getElements();

const proOptions = { account: 'paid-pro', hideAttribution: true };

const nodeColor = (node: Node) => colorScale(node.data.depth);

function ReactFlowPro({ animationDuration = 200 }) {
  const [nodes, setNodes] = useAnimatedNodes(initialElements.nodes, { duration: animationDuration });
  const [edges, setEdges] = useState(initialElements.edges);
  const { fitView } = useReactFlow();

  const handleNodeClick = (_: MouseEvent, node: Node) => {
    const hierarchyNode = hierarchy.find((n) => n.data.id === node.id);

    if (!hierarchyNode) {
      return;
    }

    hierarchyNode.data.expanded = !hierarchyNode.data.expanded;

    const nextElements = getElements();

    setNodes(nextElements.nodes);
    setEdges(nextElements.edges);
  };

  useEffect(() => {
    fitView({ duration: animationDuration });
  }, [nodes, fitView, animationDuration]);

  return (
    <ReactFlow
      minZoom={-Infinity}
      fitView
      nodes={nodes}
      edges={edges as Edge[]}
      onNodeClick={handleNodeClick}
      elementsSelectable={false}
      proOptions={proOptions}
    >
      <Background />
      <MiniMap nodeColor={nodeColor} />
    </ReactFlow>
  );
}

function ReactFlowWrapper(props: any) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
