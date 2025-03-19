import { configureStore } from "@reduxjs/toolkit";
import assignmentsReducer from "./features/assignmentSlice";
import filtersReducer from "./features/filterSlice";

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
    filters: filtersReducer,
  },
});

export default store;
