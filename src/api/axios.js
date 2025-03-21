import axios from "axios";

const baseApi = process.env.REACT_APP_BASE_API;
const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

const api = axios.create({
  baseURL: baseApi,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
});

export const fetchSelectOptions = async () => {
  try {
    const [statusRes, priorityRes, departmentRes] = await Promise.all([
      api.get("/statuses"),
      api.get("/priorities"),
      api.get("/departments"),
    ]);

    return {
      statusOptions: statusRes.data,
      priorityOptions: priorityRes.data,
      departmentOptions: departmentRes.data,
    };
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const createAssignment = async (data) => {
  try {
    const response = await api.post("/tasks", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const fetchAssignments = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const fetchStatuses = async () => {
  try {
    const response = await api.get("/statuses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllEmployee = async () => {
  try {
    const response = await api.get("/employees");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFilters = async () => {
  try {
    const [departmentRes, priorityRes, employeesRes] = await Promise.all([
      api.get("/departments"),
      api.get("/priorities"),
      api.get("/employees"),
    ]);

    return {
      departmentOptions: departmentRes.data,
      priorityOptions: priorityRes.data,
      employees: employeesRes.data,
    };
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const priorityColors = {
  მაღალი: "#FA4D4D",
  საშუალო: "#FFBE0B",
  დაბალი: "#08A508",
};

export const departmentColors = {
  [1]: "#9e8236",
  [2]: "#FFD86D",
  [3]: "#FF66A8",
  [4]: "#FD9A6A",
  [5]: "#89B6FF",
  [6]: "#379e36",
  [7]: "#9e3668",
};

export const createEmployee = async (data) => {
  try {
    const response = await api.post("/employees", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const fetchOneAssignment = async (id) => {
  try {
    const response = await api.get(`/tasks/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const fetchComments = async (id) => {
  try {
    const response = await api.get(`tasks/${id}/comments`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const commentAssignment = async (id, data) => {
  try {
    const response = await api.post(`tasks/${id}/comments`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateStatus = async (taskId, statusId) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, { status_id: statusId });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default api;
