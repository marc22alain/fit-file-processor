CREATE TABLE fit_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time TEXT UNIQUE,
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
