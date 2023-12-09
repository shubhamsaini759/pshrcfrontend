import { useEffect, useState } from 'react';

const useTimer = (duration) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning, toggle]);

    const startTimer = () => {
        setTimeLeft(duration);
        setIsRunning(true);
        setToggle((oldState) => !oldState);
    };

    return { timeLeft, startTimer, isTimerNotStarted: timeLeft > 29 || timeLeft === 0 };
};

export default useTimer;