import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startTimer, updateTimer, pauseTimer, deleteTimer } from "./timerSlice";
// import { addWeeks, addDays, addHours, addMinutes } from "date-fns";

export const CountDownTimer = ({ todoId }) => {
  const inputWeeks = useRef(null);
  const inputDays = useRef(null);
  const inputHours = useRef(null);
  const inputMinutes = useRef(null);

  const dispatch = useDispatch();

  //Note: if state of Redux store changes, useSelector runs again.
  const timerToRender = useSelector((state) =>
    state.timer.find((a_timer) => a_timer.id === todoId)
  );

  const clearInputFields = () => {
    inputWeeks.current.value = "";
    inputDays.current.value = "";
    inputHours.current.value = "";
    inputMinutes.current.value = "";
  };

  // Note: New to-do duration data entered into form. And start clicked.
  // Dispatch startTimer if either new timer. Or if timer is already running.
  const onStartTimerClicked = (event) => {
    event.preventDefault();

    if (
      inputWeeks.current.value >= 0 &&
      inputDays.current.value >= 0 &&
      inputHours.current.value >= 0 &&
      inputMinutes.current.value >= 0
    ) {
      dispatch(
        startTimer({
          id: todoId,
          duration: {
            weeks: inputWeeks.current.value,
            days: inputDays.current.value,
            hours: inputHours.current.value,
            minutes: inputMinutes.current.value,
          },
          isRunning: true,
        })
      );
      clearInputFields();
    }
  };

  const onDeleteTimerClicked = (event) => {
    event.preventDefault();
    dispatch(deleteTimer({ deleteId: todoId }));
  };

  //Note: Dispatch the updateTimer action if timerToRender changes.
  // timerToRender changes if Redux state changes.
  //  Initially Redux state changes because startTimer action dispatched.
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if (timerToRender?.isRunning) {
        dispatch(
          updateTimer({
            id: todoId,
          })
        );
      }
    }, 10000);
    return () => clearInterval(interval);
    // Test
    // }, []);
  }, [timerToRender]);

  //   Note: Delete timer once timerToRender.timeRemaining.minutes === 0
  useEffect(() => {
    if (
      timerToRender?.isRunning &&
      timerToRender?.timeRemaining?.weeks === 0 &&
      timerToRender?.timeRemaining?.days === 0 &&
      timerToRender?.timeRemaining?.hours === 0 &&
      timerToRender?.timeRemaining?.minutes === 0
    ) {
      // delete timer
      dispatch(deleteTimer({ deleteId: todoId }));
    }
  }, [timerToRender]);

  return (
    <div className="duration-container">
      {timerToRender?.timeRemaining ? (
        <p>
          Weeks: {timerToRender.timeRemaining.weeks}
          Days: {timerToRender.timeRemaining.days}
          Hours: {timerToRender.timeRemaining.hours}
          Minutes: {timerToRender.timeRemaining.minutes}
        </p>
      ) : (
        <p>Start the to-do timer.</p>
      )}
      <form>
        <label htmlFor="weeks">Weeks:</label>
        <input id="weeks" name="weeks" type="number" ref={inputWeeks} />
        <br />
        <label htmlFor="days">Days:</label>
        <input id="days" name="days" type="number" ref={inputDays} />
        <br />
        <label htmlFor="hours">Hours:</label>
        <input id="hours" name="hours" type="number" ref={inputHours} />
        <br />
        <label htmlFor="minutes">Minutes:</label>
        <input id="minutes" name="minutes" type="number" ref={inputMinutes} />
        <br />
        <button type="button" onClick={onStartTimerClicked}>
          Start To-do Timer
        </button>
        <button type="button" onClick={onDeleteTimerClicked}>
          Delete To-do Timer
        </button>
      </form>
    </div>
  );
};
