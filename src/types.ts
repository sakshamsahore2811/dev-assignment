// src/types.ts

export interface ActivityMeta {
  label: string;
  fillColor: string;
}

export interface Activity {
  name: string;
  value: string;
}

export interface DayWiseActivityItem {
  count: string;
  label: string;
  fillColor: string;
}

export interface DayWiseActivity {
  date: string;
  items: {
    children: DayWiseActivityItem[];
  };
}

export interface AuthorWorklogRow {
  name: string;
  totalActivity: Activity[];
  dayWiseActivity: DayWiseActivity[];
}

export interface AuthorWorklog {
  activityMeta: ActivityMeta[];
  rows: AuthorWorklogRow[];
}

export interface SampleData {
  data: {
    AuthorWorklog: AuthorWorklog;
  };
}
