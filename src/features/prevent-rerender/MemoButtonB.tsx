import { Button } from '@/components/ui/button';
import { memo } from 'react';

const MemoButtonB = ({
  buttonStyle,
  count,
  onClick
}: {
  buttonStyle: React.CSSProperties;
  count: number;
  onClick: () => void;
}) => {
  console.log('Memo Button B Re-render');
  return (
    <Button variant="outline" style={buttonStyle} onClick={onClick}>
      Button B: {count}
    </Button>
  );
};

export default memo(MemoButtonB);
