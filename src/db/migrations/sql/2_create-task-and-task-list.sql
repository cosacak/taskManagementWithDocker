
--Table: public.tasks

CREATE TABLE IF NOT EXISTS tasks
(
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(256),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------
--Table: public.task_lists

CREATE TABLE IF NOT EXISTS task_lists
(
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(256),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------
-- Table: public.task_list_rels

CREATE TABLE IF NOT EXISTS task_list_rels
(
    id VARCHAR(64) PRIMARY KEY,
    task_id VARCHAR(64),
    list_id VARCHAR(64)
);