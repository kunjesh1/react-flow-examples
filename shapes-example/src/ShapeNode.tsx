import { Handle, NodeProps, Position } from 'reactflow';

const handleStyle = { opacity: 0 };

type UseShapeOptions = {
  type: string;
  width: number;
  height: number;
  color: string;
  selected: boolean;
};

function useShape({ type, width, height, color = '#9ca8b3', selected }: UseShapeOptions) {
  const styles = { fill: color, strokeWidth: selected ? 2 : 0, stroke: '#fff' };

  switch (type) {
    case 'circle':
      return <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} {...styles} />;
    case 'round-rect':
      return <rect x={0} y={0} rx={20} width={width} height={height} {...styles} />;
    case 'hexagon':
      return (
        <path
          d={`M10,0 L${width - 10},0  L${width},${height / 2} L${width - 10},${height} L10,${height} L0,${
            height / 2
          } z`}
          {...styles}
        />
      );
    case 'diamond':
      return (
        <path d={`M0,${height / 2} L${width / 2},0 L${width},${height / 2} L${width / 2},${height} z`} {...styles} />
      );
    case 'arrow-rect':
      return (
        <path
          d={`M0,0 L${width - 10},0  L${width},${height / 2} L${width - 10},${height} L0,${height} z`}
          {...styles}
        />
      );
    case 'database':
      return (
        <path
          d={`M0,${height * 0.125}  L 0,${height - height * 0.125} A ${width / 2} ${height * 0.125} 0 1 0 ${width} ${
            height - height * 0.125
          } L ${width},${height * 0.125} A ${width / 2} ${height * 0.125} 0 1 1 0 ${height * 0.125} A ${width / 2} ${
            height * 0.125
          } 0 1 1 ${width} ${height * 0.125} A ${width / 2} ${height * 0.125} 0 1 1 0 ${height * 0.125} z`}
          {...styles}
          strokeWidth={selected ? styles.strokeWidth : 1}
        />
      );
    case 'triangle':
      return <path d={`M0,${height} L${width / 2},0 L${width},${height} z`} {...styles} />;
    case 'parallelogram':
      return (
        <path d={`M0,${height} L${width * 0.25},0 L${width},0 L${width - width * 0.25},${height} z`} {...styles} />
      );
    default:
      return null;
  }
}

function ShapeNode({ data, selected }: NodeProps) {
  const width = data?.width || 100;
  const height = data?.height || 100;
  const shape = useShape({ type: data?.shape, width, height, color: data?.color, selected });

  return (
    <div style={{ position: 'relative' }}>
      <Handle id="top" style={handleStyle} position={Position.Top} type="source" />
      <Handle id="right" style={handleStyle} position={Position.Right} type="source" />
      <Handle id="bottom" style={handleStyle} position={Position.Bottom} type="source" />
      <Handle id="left" style={handleStyle} position={Position.Left} type="source" />
      <svg style={{ display: 'block', overflow: 'visible' }} width={width} height={height}>
        {shape}
      </svg>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'white', fontSize: 12 }}>{data?.label}</div>
      </div>
    </div>
  );
}

export default ShapeNode;
