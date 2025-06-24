import { Alert, AlertTitle } from '@/components/ui/alert';

import { useCallback, useMemo, useState } from 'react';
import MemoButtonA from './MemoButtonA';
import MemoButtonB from './MemoButtonB';

const Optimized = ({ buttonType = 'primary' }) => {
  const [buttonACount, setButtonACount] = useState(0);
  const [buttonBCount, setButtonBCount] = useState(0);

  const buttonStyle = useMemo(
    () => ({
      color: buttonType === 'danger' ? 'red' : ''
    }),
    [buttonType]
  );

  const onButtonAClick = useCallback(() => {
    setButtonACount((buttonACount) => buttonACount + 1);
  }, []);

  const onButtonBClick = useCallback(() => {
    setButtonBCount((buttonBCount) => buttonBCount + 1);
  }, []);

  return (
    <>
      <div className="flex flex-row gap-4 justify-center">
        <MemoButtonA
          buttonStyle={buttonStyle}
          count={buttonACount}
          onClick={onButtonAClick}
        />
        <MemoButtonB
          buttonStyle={buttonStyle}
          count={buttonBCount}
          onClick={onButtonBClick}
        />
      </div>
      <Alert variant="default">
        <AlertTitle>Total Click {buttonACount + buttonBCount}</AlertTitle>
      </Alert>
    </>
  );
};
export default Optimized;
