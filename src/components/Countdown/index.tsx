import React, { useImperativeHandle, forwardRef, ForwardRefRenderFunction, useCallback, useState, useEffect } from 'react';
import { CountdownText } from './styles';
import { useDuel } from '../../hooks/duel';

interface CountdownProps {
  initialCounter?: number;
}

interface CountdownType {
  reset(): void;
}

const BaseCountdown: ForwardRefRenderFunction<CountdownType, CountdownProps> = ({ initialCounter = 8 }, ref) => {
  const [countdown, setCountdown] = useState(initialCounter);

  const {
    handleCountdownComplete,
  } = useDuel();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(currentValue => {
        const newValue = currentValue - 1;

        if (newValue === -1) {
          reset();
          return 0
        }
        return newValue
      });
    }, 1000);

    return (() => {
      clearInterval(intervalId)
    });
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      handleCountdownComplete();
    }
  }, [countdown]);

  const reset = useCallback(() => {
    setCountdown(initialCounter);
  }, []);

  useImperativeHandle(ref, () => ({
    reset
  }));

  return (
    <CountdownText>{countdown}</CountdownText>
  );
};

export type Countdown = CountdownType;
export const Countdown = forwardRef(BaseCountdown);
