import { Alert, AlertTitle } from '@/components/ui/alert';
import ButtonB from './ButtonB';
import ButtonA from './ButtonA';
import { useState } from 'react';

const Unoptimized = ({ buttonType = 'primary' }) => {
  const [buttonACount, setButtonACount] = useState(0);
  const [buttonBCount, setButtonBCount] = useState(0);
  const buttonStyle = {
    color: buttonType === 'danger' ? 'red' : ''
  };

  const onButtonAClick = () => {
    setButtonACount((buttonACount) => buttonACount + 1);
  };

  const onButtonBClick = () => {
    setButtonBCount((buttonBCount) => buttonBCount + 1);
  };

  return (
    <>
      <div className="flex flex-row gap-4 justify-center">
        <ButtonA
          buttonStyle={buttonStyle}
          count={buttonACount}
          onClick={onButtonAClick}
        />
        <ButtonB
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
export default Unoptimized;
