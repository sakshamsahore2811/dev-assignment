// src/App.tsx
import React, { useState } from 'react';
import ActivityChart from './components/ActivityChart';
import ActivityTable from './components/ActivityTable';
import { sampleData } from './data/sampleData';
import { AuthorWorklogRow, Activity, DayWiseActivity } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>('all');

  const handlePersonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPerson(event.target.value);
  };

  const aggregateData = (): AuthorWorklogRow => {
    const aggregatedTotalActivity: Record<string, number> = {};
    const aggregatedDayWiseActivity: Record<string, Record<string, number>> = {};

    sampleData.data.AuthorWorklog.rows.forEach((row) => {
      row.totalActivity.forEach((activity) => {
        if (!aggregatedTotalActivity[activity.name]) {
          aggregatedTotalActivity[activity.name] = 0;
        }
        aggregatedTotalActivity[activity.name] += parseInt(activity.value, 10);
      });

      row.dayWiseActivity.forEach((dayActivity) => {
        if (!aggregatedDayWiseActivity[dayActivity.date]) {
          aggregatedDayWiseActivity[dayActivity.date] = {};
        }

        dayActivity.items.children.forEach((activity) => {
          if (!aggregatedDayWiseActivity[dayActivity.date][activity.label]) {
            aggregatedDayWiseActivity[dayActivity.date][activity.label] = 0;
          }
          aggregatedDayWiseActivity[dayActivity.date][activity.label] += parseInt(activity.count, 10);
        });
      });
    });

    const totalActivity: Activity[] = Object.keys(aggregatedTotalActivity).map((name) => ({
      name,
      value: aggregatedTotalActivity[name].toString(),
    }));

    const dayWiseActivity: DayWiseActivity[] = Object.keys(aggregatedDayWiseActivity).map((date) => ({
      date,
      items: {
        children: Object.keys(aggregatedDayWiseActivity[date]).map((label) => ({
          label,
          count: aggregatedDayWiseActivity[date][label].toString(),
          fillColor: sampleData.data.AuthorWorklog.activityMeta.find((meta) => meta.label === label)?.fillColor || '#000000',
        })),
      },
    }));

    return {
      name: 'All Employees',
      totalActivity,
      dayWiseActivity,
    };
  };

  const selectedWorklogRow: AuthorWorklogRow | undefined = selectedPerson === 'all'
    ? aggregateData()
    : sampleData.data.AuthorWorklog.rows.find((row) => row.name === selectedPerson);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-8">Employee Worklog Dashboard</h1>
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex justify-center items-center mb-4">
          <label htmlFor="person-select" className="mr-2">Select Person:</label>
          <select
            id="person-select"
            value={selectedPerson}
            onChange={handlePersonChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All Employees</option>
            {sampleData.data.AuthorWorklog.rows.map((row) => (
              <option key={row.name} value={row.name}>
                {row.name}
              </option>
            ))}
          </select>
        </div>
        {selectedWorklogRow && (
          <>
            <ActivityChart worklogRow={selectedWorklogRow} />
            <ActivityTable worklogRow={selectedWorklogRow} />
          </>
        )}
      </div>
      <Footer/>
    </div>
    
    </>
  );
};

export default App;
