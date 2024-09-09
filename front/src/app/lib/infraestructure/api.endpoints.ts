import apiClient from './api.client';

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw new Error('An error occurred while communicating with the API.');
};

export const getResource = async (resource: string, id?: string) => {
  try {

    const url = id ? `/${resource}/${id}` : `/${resource}`;
    const response = await apiClient.get(url);
    return response.data;

  } catch (error) {
    handleApiError(error);
  }
};

export const postResource = async (resource: string, data: any) => {

  try {
    const response = await apiClient.post(`/${resource}`, data);
    return response.data;

  } catch (error: any) {

    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }

};