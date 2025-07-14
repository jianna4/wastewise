import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const getCounties = async () => {
  try {
    // You'll need to create this endpoint in your Django API
    const response = await axios.get(`${API_URL}locations/counties/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubCounties = async (countyId) => {
  try {
    const response = await axios.get(`${API_URL}locations/subcounties/?county_id=${countyId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAreas = async (subCountyId) => {
  try {
    const response = await axios.get(`${API_URL}locations/areas/?subcounty_id=${subCountyId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};