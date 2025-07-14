import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const createBooking = async (area_id, pickup_date, token) => {
  try {
    const response = await axios.post(
      `${API_URL}bookings/create/`,
      { area_id, pickup_date },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserBookings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}bookings/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};