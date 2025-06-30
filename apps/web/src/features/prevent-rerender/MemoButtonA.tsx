import { Button } from '@/components/ui/button';
import { memo } from 'react';

const MemoButtonA = ({
  buttonStyle,
  count,
  onClick
}: {
  buttonStyle: React.CSSProperties;
  count: number;
  onClick: () => void;
}) => {
  console.log('Memo Button A Re-render');
  return (
    <Button variant="default" style={buttonStyle} onClick={onClick}>
      Button A: {count}
    </Button>
  );
};

export default memo(MemoButtonA);
