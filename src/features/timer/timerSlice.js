import { createSlice } from "@reduxjs/toolkit";

const initialTimerData = [
  { id: "123", duration: 0, isRunning: false },
  { id: "456", duration: 0, isRunning: false },
];

const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerData,
  reducers: {
    startTimer(state, action) {
      const { id, duration } = action.payload;
      const timerToStart = state.find((a_timer) => a_timer.id === id);
      //update timer if it already exists
      if (timerToStart) {
        timerToStart.duration = duration;
        timerToStart.isRunning = true;
      } else {
        //create new timer
        state.push({ id: id, duration: duration, isRunning: true });
      }
      //   Test
      //   const timerToUpdate = state.find((a_timer) => a_timer.id === id);
      //   let interval = null;
      //   if (timerToUpdate.duration > 0) {
      //     interval = setInterval(() => {
      //       timerToUpdate.duration -= 1;
      //     }, 1000);
      //   } else {
      //     clearInterval(interval);
      //   }

      //   dispatch(updateTimer(id));
      //   Test
    },
    updateTimer(state, action) {
      const { id } = action.payload;
      const timerToUpdate = state.find((a_timer) => a_timer.id === id);
      if (timerToUpdate && timerToUpdate.isRunning) {
        timerToUpdate.duration -= 1;
      }
      // Test
      //   let interval = null;
      //   if (timerToUpdate && timerToUpdate.isRunningtimerToUpdate.duration > 0) {
      //     interval = setInterval(() => {
      //       timerToUpdate.duration -= 1;
      //     }, 1000);
      //   } else {
      //     clearInterval(interval);
      //   }
      //   Test
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
