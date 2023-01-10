import { createSlice } from "@reduxjs/toolkit";
import {
  addWeeks,
  addDays,
  addHours,
  addMinutes,
  format,
  differenceInSeconds,
  parseISO,
} from "date-fns";

const initialTimerData = [
  {
    id: "123",
    duration: 0,
    isRunning: false,
    dateCreated: "2023-01-09T01:06:58.699Z",
    dueDate: "",
    timeRemaining: "",
  },
  {
    id: "456",
    duration: 0,
    isRunning: false,
    dateCreated: "2023-01-09T01:06:58.699Z",
    dueDate: "",
    timeRemaining: "",
  },
];

const convertSeconds = (seconds) => {
  const result = {
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  };

  result.weeks = Math.floor(seconds / 604800);
  seconds -= result.weeks * 604800;

  result.days = Math.floor(seconds / 86400);
  seconds -= result.days * 86400;

  result.hours = Math.floor(seconds / 3600);
  seconds -= result.hours * 3600;

  result.minutes = Math.floor(seconds / 60);
  seconds -= result.minutes * 60;

  return result;
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerData,
  reducers: {
    startTimer(state, action) {
      // 1. Receive the action payload from the component.
      const { id, duration, isRunning } = action.payload;

      //2. Find the matching timer for the todo.
      const timerToStart = state.find((a_timer) => a_timer.id === id);

      //3. Get current date and time.
      const now = new Date();

      //4. Calculate due date by adding user entered duration to current time.
      const dueDate = addMinutes(
        addHours(
          addDays(addWeeks(now, duration.weeks), duration.days),
          duration.hours
        ),
        duration.minutes
      );

      //5. Difference in seconds between the due date and now .... e.g. 86400 seconds aka 1 day.
      const diffInSeconds = differenceInSeconds(dueDate, now);

      //6. Convert seconds into an object like: timeRemaining = {weeks: x,days: y. hours: z, minutes: a}
      const timeRemaining = convertSeconds(diffInSeconds);

      //7. Update timer state
      //update timer if it already exists
      if (timerToStart) {
        timerToStart.duration = duration;
        timerToStart.dueDate = dueDate.toISOString();
        timerToStart.isRunning = isRunning;
        timerToStart.timeRemaining = timeRemaining;
      } else {
        //create new timer
        state.push({
          id: id,
          duration: duration,
          isRunning: true,
          dateCreated: now.toISOString(),
          dueDate: dueDate.toISOString(),
          timeRemaining: timeRemaining,
        });
      }
    },

    updateTimer(state, action) {
      const { id } = action.payload;

      const timerToUpdate = state.find((a_timer) => a_timer.id === id);

      const currentDateTime = new Date();

      if (timerToUpdate.isRunning) {
        const secondsRemaining = differenceInSeconds(
          parseISO(timerToUpdate.dueDate),
          currentDateTime
        );
        timerToUpdate.timeRemaining = convertSeconds(secondsRemaining);
      }
    },

    pauseTimer(state, action) {
      const { id } = action.payload;
      const timerToPause = state.find((a_timer) => a_timer.id === id);
      if (timerToPause) {
        timerToPause.isRunning = false;
      }
    },

    deleteTimer(state, action) {
      const { deleteId } = action.payload;
      return state.filter((a_timer) => a_timer.id !== deleteId);
    },
  },
});

console.log("timerSlice.js: \n", timerSlice);

export const { startTimer, updateTimer, pauseTimer, deleteTimer } =
  timerSlice.actions;

export default timerSlice.reducer;
