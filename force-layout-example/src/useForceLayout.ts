import { useEffect } from 'react';
import { hierarchy, HierarchyNode } from 'd3-hierarchy';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';
import { scaleLinear } from 'd3-scale';
import { useReactFlow, Node } from 'reactflow';

import tree from './tree';

const nodeColorScale = scaleLinear<string>().domain([0, 5]).range(['#ff0072', '#0041d0']);

type SimNode = HierarchyNode<{ url: string; name: string }> & SimulationNodeDatum;

function getNode(n: SimNode) {
  return {
    id: n.data.url,
    position: { x: n.x, y: n.y },
    data: { label: n.data.name, color: nodeColorScale(n.depth) },
    type: 'circle',
  } as Node;
}

function getEdge(e: any) {
  const source = e.source.data.url;
  const target = e.target.data.url;
  return { id: `${source}=>${target}`, source, target, type: 'straight' };
}

const root = hierarchy(tree);
const links = root.links();
const nodes = root.descendants();

type UseForceLayoutOptions = {
  strength: number;
  distance: number;
};

function useForceLayout({ strength = -1000, distance = 150 }: UseForceLayoutOptions) {
  const { setNodes, setEdges } = useReactFlow();

  useEffect(() => {
    const simulation = forceSimulation(nodes as SimulationNodeDatum[])
      .force(
        'link',
        forceLink(links as SimulationLinkDatum<SimulationNodeDatum>[])
          .id((d: any) => d.id)
          .distance(distance)
          .strength(0.5)
      )
      .force('charge', forceManyBody().strength(strength))
      .force('x', forceX())
      .force('y', forceY())
      .on('tick', () => {
        setNodes(nodes.map(getNode));
      });

    setNodes(nodes.map(getNode));
    setEdges(links.map(getEdge));

    return () => {
      simulation.stop();
    };
  }, [strength, distance, setNodes, setEdges]);
}

export default useForceLayout;
