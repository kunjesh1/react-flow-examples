import React from 'react';
import ReactFlow, { Background } from 'reactflow';

import 'reactflow/dist/style.css';

import { nodes, edges } from './initialElements';

/**
 * This example demonstrates how you can remove the attribution from the React Flow renderer.
 */
function ReactFlowPro({ hideAttribution = true }) {
  const proOptions = {
    // passing in the account property will enable hiding the attribution
    account: 'paid-pro',
    // in combination with the account property, hideAttribution: true will remove the attribution
    hideAttribution,
  };

  return (
    <ReactFlow proOptions={proOptions} defaultNodes={nodes} defaultEdges={edges} fitView>
      <Background />
    </ReactFlow>
  );
}

export default ReactFlowPro;
