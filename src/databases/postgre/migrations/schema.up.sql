-- Master schema
CREATE SCHEMA IF NOT EXISTS master;
-- Users
CREATE TABLE IF NOT EXISTS master.users (
  id uuid NOT NULL,
  name VARCHAR(15) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);