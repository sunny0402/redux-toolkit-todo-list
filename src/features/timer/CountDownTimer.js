import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startTimer, updateTimer, pauseTimer, deleteTimer } from "./timerSlice";
// Can also pass in timerId via route param
// import { useParams } from "react-router-dom";
//   let params = useParams();
//   const { timerId } = params;

//pass in timerId as a prop
export const CountDownTimer = ({ todoId }) => {
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const dispatch = useDispatch();

  // timer might not exist yet, let the timer slice handle the logic of creating
  //   const timer = useSelector((state) =>
  //     state.timer.find((a_timer) => a_timer.id === todoId)
  //   );

  const onDurationChanged = (e) => setDuration(e.target.value);

  const onStartTimerClicked = () => {
    setIsRunning(true);
    if (duration) {
      dispatch(
        startTimer({
          id: todoId,
          duration: duration,
        })
      );
    }
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        dispatch(
          updateTimer({
            id: todoId,
          })
        );
        setDuration(duration - 1);
      }, 1000);
    }
  }, [duration, isRunning]);

  return (
    <div className="duration-container">
      <p>Time Left to Complete: {duration}</p>
      <form>
        <label htmlFor="duration">Enter duration in seconds:</label>
        <input
          id="duration"
          name="duration"
          type="number"
          value={duration}
          onChange={onDurationChanged}
        />

        <button type="button" onClick={onStartTimerClicked}>
          Start Timer
        </button>
      </form>
    </div>
  );
};
