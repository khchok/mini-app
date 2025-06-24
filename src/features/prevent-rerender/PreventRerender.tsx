import { Card } from '@/components/ui/card';
import Unoptimized from './Unoptimized';
import Optimized from './Optimized';

const PreventRerender = () => {
  return (
    <Card className="p-4">
      <h2>Prevent Rerender</h2>
      <p className="text-xs">
        <i>inspect the console to see the re-render log</i>
      </p>
      <h3>re-render when props unchanged</h3>
      <Unoptimized />

      <h3>after memoized</h3>
      <Optimized />
    </Card>
  );
};

export default PreventRerender;
