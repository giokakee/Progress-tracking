import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAssignments } from "../api/axios";

export const loadAssignments = createAsyncThunk(
  "assignments/loadAssignments",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAssignments();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: {
    data: [],
    filteredData: [],
    status: "idle",
    error: null,
  },
  reducers: {
    applyFilters: (state, action) => {
      const { departments, priorities, employees } = action.payload;

      state.filteredData = state.data.filter((task) => {
        const matchedDepartment = departments.length
          ? departments.includes(task.department.name)
          : true;
        const matchedPriority = priorities.length
          ? priorities.includes(task.priority.name)
          : true;
        const matchedEmployee = employees.length
          ? employees.includes(task.id)
          : true;

        return matchedDepartment && matchedPriority && matchedEmployee;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAssignments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAssignments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.filteredData = action.payload;
      })
      .addCase(loadAssignments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { applyFilters } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
