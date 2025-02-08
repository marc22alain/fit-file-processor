-- Create temporary table with new schema
CREATE TABLE fit_data_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME UNIQUE,
    total_elapsed_time REAL,
    activity_type TEXT,
    total_distance REAL,
    avg_heart_rate REAL,
    max_heart_rate REAL,
    avg_power REAL,
    max_power REAL,
    event TEXT,
    event_type TEXT
);

-- Copy data from old table to new table
INSERT INTO fit_data_new 
SELECT id,
       datetime(start_time) as start_time,
       total_elapsed_time,
       activity_type,
       total_distance,
       avg_heart_rate,
       max_heart_rate,
       avg_power,
       max_power,
       event,
       event_type
FROM fit_data;

-- Drop the old table
DROP TABLE fit_data;

-- Rename the new table to the original name
ALTER TABLE fit_data_new RENAME TO fit_data;

-- Create any necessary indexes (if you had any on the original table)
CREATE INDEX IF NOT EXISTS idx_start_time ON fit_data(start_time);