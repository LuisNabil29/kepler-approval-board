const axios = require('axios');

const clickUpApi = axios.create({
  baseURL: 'https://api.clickup.com/api/v2',
  headers: {
    'Authorization': process.env.CLICKUP_API_KEY,
    'Content-Type': 'application/json'
  }
});

exports.updateClickUpTask = async (clickUpId, status) => {
  try {
    await clickUpApi.put(`/task/${clickUpId}`, {
      status: status
    });
  } catch (error) {
    console.error('Error updating ClickUp task:', error);
    throw error;
  }
};