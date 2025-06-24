import { Button } from '@/components/ui/button';

const ButtonB = ({
  buttonStyle,
  count,
  onClick
}: {
  buttonStyle: React.CSSProperties;
  count: number;
  onClick: () => void;
}) => {
  console.log('Button B Re-render');
  return (
    <Button variant="outline" style={buttonStyle} onClick={onClick}>
      Button B: {count}
    </Button>
  );
};

export default ButtonB;
