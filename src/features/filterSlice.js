import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFilters } from "../api/axios";

// ✅ Create async thunk to fetch filters
export const loadFilters = createAsyncThunk(
  "filters/loadFilters",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchFilters();
      return {
        departments: data.departmentOptions,
        priorities: data.priorityOptions,
        employees: data.employees,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    departments: [],
    priorities: [],
    employees: [],
  },
  reducers: {
    toggleDepartment: (state, action) => {
      const id = action.payload;
      state.departments.includes(id)
        ? (state.departments = state.departments.filter((d) => d !== id))
        : state.departments.push(id);
    },
    togglePriority: (state, action) => {
      const id = action.payload;
      state.priorities.includes(id)
        ? (state.priorities = state.priorities.filter((p) => p !== id))
        : state.priorities.push(id);
    },
    toggleEmployee: (state, action) => {
      const id = action.payload;
      state.employees.includes(id)
        ? (state.employees = state.employees.filter((e) => e !== id))
        : state.employees.push(id);
    },
    resetFilters: (state) => {
      state.departments = [];
      state.priorities = [];
      state.employees = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadFilters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadFilters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.filteredData = action.payload; // Initially, all tasks are shown
      })
      .addCase(loadFilters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  toggleDepartment,
  togglePriority,
  toggleEmployee,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
