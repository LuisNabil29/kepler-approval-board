import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Task from './Task';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['pending', 'approved', 'rejected'].map((status) => (
          <div key={status} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">{status}</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Task key={task.id} task={task} />
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;