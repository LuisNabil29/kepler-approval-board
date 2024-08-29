import React from 'react';
import api from '../utils/api';

const Task = ({ task }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await api.put(`/tasks/${task.id}/status`, { status: newStatus });
      // You might want to update the task list after this
      // This could be done by lifting the state up to the Dashboard component
      // and passing a function to update the task status
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-indigo-600 truncate">{task.title}</p>
        <div className="ml-2 flex-shrink-0 flex">
          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {task.status}
          </p>
        </div>
      </div>
      <div className="mt-2 sm:flex sm:justify-between">
        <div className="sm:flex">
          <p className="flex items-center text-sm text-gray-500">
            {task.description}
          </p>
        </div>
      </div>
      {task.status === 'pending' && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => handleStatusChange('approved')}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Approve
          </button>
          <button
            onClick={() => handleStatusChange('rejected')}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reject
          </button>
        </div>
      )}
    </li>
  );
};

export default Task;