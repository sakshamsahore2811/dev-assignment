import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { AuthorWorklogRow, ActivityMeta } from '../types';
import { sampleData } from '../data/sampleData';

interface ActivityChartProps {
  worklogRow: AuthorWorklogRow;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ worklogRow }) => {
  const activityMeta: ActivityMeta[] = sampleData.data.AuthorWorklog.activityMeta;

  // Prepare data for the line chart
  const lineChartData = worklogRow.dayWiseActivity.map((day) => {
    const activityCounts: Record<string, number | string> = {
      date: day.date,
    };

    day.items.children.forEach((activity) => {
      activityCounts[activity.label] = parseInt(activity.count, 10);
    });

    return activityCounts;
  });

  // Prepare data for the bar chart
  const barChartData = worklogRow.dayWiseActivity.map((day) => {
    const activityCounts: Record<string, number | string> = {
      date: day.date,
    };

    day.items.children.forEach((activity) => {
      activityCounts[activity.label] = parseInt(activity.count, 10);
    });

    return activityCounts;
  });

  // Prepare data for the average PRs merged per day line chart
  const prMergedData = worklogRow.dayWiseActivity.map((day) => ({
    date: day.date,
    prMerged: parseInt(day.items.children.find(activity => activity.label === 'PR Merged')?.count || "0", 10),
  }));

  // Calculate the average PRs merged per day
  const totalPRsMerged = prMergedData.reduce((sum, entry) => sum + entry.prMerged, 0);
  const averagePRsMerged = prMergedData.length ? (totalPRsMerged / prMergedData.length).toFixed(2) : 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between space-x-8">
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Line Chart</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {activityMeta.map((activity) => (
                <Line
                  key={activity.label}
                  type="monotone"
                  dataKey={activity.label}
                  stroke={activity.fillColor}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Average PRs Merged per Day</h3>
          <p className="text-2xl font-bold mb-4">{averagePRsMerged}</p>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={prMergedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="prMerged" stroke="#0000FF" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="p-4 bg-white shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={barChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="date" />
            <Tooltip />
            <Legend />
            {activityMeta.map((activity) => (
              <Bar
                key={activity.label}
                dataKey={activity.label}
                stackId="a"
                fill={activity.fillColor}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
