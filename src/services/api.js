import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Dentist APIs
  async getDentists() {
    try {
      const response = await apiClient.get("/dentists");
      return response.data;
    } catch (error) {
      console.error("Error fetching dentists:", error);
      throw error.response?.data || error;
    }
  },

  async getDentistById(id) {
    try {
      const response = await apiClient.get(`/dentists/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dentist:", error);
      throw error.response?.data || error;
    }
  },

  async createDentist(dentistData) {
    try {
      const response = await apiClient.post("/dentists", dentistData);
      return response.data;
    } catch (error) {
      console.error("Error creating dentist:", error);
      throw error.response?.data || error;
    }
  },

  // Appointment APIs
  async createAppointment(appointmentData) {
    try {
      const response = await apiClient.post("/appointments", appointmentData);
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error.response?.data || error;
    }
  },

  async getAppointments() {
    try {
      const response = await apiClient.get("/appointments");
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error.response?.data || error;
    }
  },

  async getAppointmentById(id) {
    try {
      const response = await apiClient.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment:", error);
      throw error.response?.data || error;
    }
  },

  async checkAvailability(dentistId, appointmentDate) {
    try {
      const response = await apiClient.post(
        "/appointments/check-availability",
        {
          dentistId,
          appointmentDate,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error checking availability:", error);
      throw error.response?.data || error;
    }
  },
};

export default apiClient;
