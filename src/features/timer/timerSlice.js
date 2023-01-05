import { createSlice } from "@reduxjs/toolkit";

const initialTimerData = [
  { id: "123", duration: 0, isRunning: false },
  { id: "456", duration: 0, isRunning: false },
];

const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerData,
  reducers: {
    // createTimer(state, action) {},
    startTimer(state, action) {
      const { id, duration } = action.payload;
      const timerToStart = state.find((a_timer) => a_timer.id === id);
      if (timerToStart) {
        timerToStart.duration = duration;
        timerToStart.isRunning = true;
      } else {
        //create new timer
        state.push({ id: id, duration: duration, isRunning: true });
      }
    },
    updateTimer(state, action) {
      const { id } = action.payload;
      const timerToUpdate = state.find((a_timer) => a_timer.id === id);
      if (timerToUpdate && timerToUpdate.isRunning) {
        timerToUpdate.duration -= 1;
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
