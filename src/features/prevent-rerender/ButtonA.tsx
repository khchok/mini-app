import { Button } from '@/components/ui/button';

const ButtonA = ({
  buttonStyle,
  count,
  onClick
}: {
  buttonStyle: React.CSSProperties;
  count: number;
  onClick: () => void;
}) => {
  console.log('Button A Re-render');
  return (
    <Button variant="default" style={buttonStyle} onClick={onClick}>
      Button A: {count}
    </Button>
  );
};

export default ButtonA;
