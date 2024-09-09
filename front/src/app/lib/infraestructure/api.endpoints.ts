import apiClient from './api.client';

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw new Error('An error occurred while communicating with the API.');
};

export const fetchResource = async (resource: string, id?: string) => {
  try {

    const url = id ? `/${resource}/${id}` : `/${resource}`;
    const response = await apiClient.get(url);
    return response.data;

  } catch (error) {
    handleApiError(error);
  }
};

export const createResource = async (resource: string, data: any) => {
  try {

    const response = await apiClient.post(`/${resource}`, data);
    return response.data;

  } catch (error) {
    handleApiError(error);
  }
};

export const updateResource = async (resource: string, id: string, data: any) => {
  const response = await apiClient.put(`/${resource}/${id}`, data);
  return response.data;
};

export const deleteResource = async (resource: string, data: any) => {
  try {
    const response = await apiClient.post(`/${resource}`, data);
    return response.data;

  } catch (error) {
    handleApiError(error);
  }
};