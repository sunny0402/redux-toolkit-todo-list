import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startTimer, updateTimer, pauseTimer, deleteTimer } from "./timerSlice";

export const CountDownTimer = ({ todoId }) => {
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const timerToRender = useSelector((state) =>
    state.timer.find((a_timer) => a_timer.id === todoId)
  );

  //   Note: update the component state with timer data from store
  useEffect(() => {
    // if (timerToRender?.duration && timerToRender?.isRunning) {
    if (timerToRender) {
      setDuration(timerToRender.duration);
      setIsRunning(timerToRender.isRunning);
    }
  }, [timerToRender]);

  const durationInput = useRef(null);

  const dispatch = useDispatch();

  //   && !isRunning
  const onStartTimerClicked = () => {
    if (durationInput.current.value > 0 && !isRunning) {
      dispatch(
        startTimer({
          id: todoId,
          duration: durationInput.current.value,
        })
      );
    }
  };

  //Dispatch the update timer action if component state duration/isRunning changes
  useEffect(() => {
    let interval = null;
    if (isRunning && duration) {
      interval = setInterval(() => {
        dispatch(
          updateTimer({
            id: todoId,
          })
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [duration, isRunning]);

  useEffect(() => {
    if (duration === 0 && isRunning) {
      // reset timer
      dispatch(deleteTimer({ deleteId: todoId }));

      setDuration(0);
      setIsRunning(false);
      durationInput.current.value = "";
    }
  }, [duration]);

  return (
    <div className="duration-container">
      <p>Time Left to Complete: {duration}</p>
      <form>
        <label htmlFor="duration">Enter duration in seconds:</label>
        <input
          id="duration"
          name="duration"
          type="number"
          ref={durationInput}
          //   value={duration}
          //   onChange={onDurationChanged}
        />

        <button type="button" onClick={onStartTimerClicked}>
          Start Timer
        </button>
      </form>
    </div>
  );
};
