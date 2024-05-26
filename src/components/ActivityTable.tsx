import React from 'react';
import { AuthorWorklogRow } from '../types';

interface ActivityTableProps {
  worklogRow: AuthorWorklogRow;
}

const ActivityTable: React.FC<ActivityTableProps> = ({ worklogRow }) => {
  return (
    <>
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Activity Table</h2>
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Activity</th>
            <th className="py-2 px-4 border-b">Count</th>
          </tr>
        </thead>
        <tbody>
          {worklogRow.totalActivity.map((activity, index) => (
            <tr key={index}>
              <td className="py-2 text-center px-4 border-b">{activity.name}</td>
              <td className="py-2 text-center px-4 border-b">{activity.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ActivityTable;
