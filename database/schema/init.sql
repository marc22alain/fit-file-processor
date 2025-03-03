CREATE TABLE fit_data (
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

-- Add index on start_time for better query performance
CREATE INDEX idx_start_time ON fit_data(start_time);