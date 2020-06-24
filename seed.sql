DROP TABLE IF EXISTS countries,
cities;
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name character varying(100) NOT NULL
);
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name character varying(100) NOT NULL,
  country_id INTEGER,
  FOREIGN KEY (country_id) REFERENCES countries (id)
);
INSERT INTO countries (id, name)
VALUES (1, 'Denmark'),
  (2, 'Italy'),
  (3, 'Portugal'),
  (4, 'Spain'),
  (5, 'France');
INSERT INTO cities (id, name, country_id)
VALUES (1, 'Copenhagen', 1),
  (2, 'Frederiksberg', 1),
  (3, 'Florence', 2),
  (4, 'Trieste', 2),
  (5, 'Lisbon', 3),
  (6, 'Porto', 3),
  (7, 'Madrid', 4),
  (8, 'Valencia', 4),
  (9, 'Marseille', 3),
  (10, 'Nîmes', 3);
