CREATE TABLE IF NOT EXISTS info (
  firstName varchar(255),
  middleName varchar(255),
  lastname varchar(255),
  email varchar(255),
  workEmail varchar(255),
  linkedinUrl varchar(255),
  githubUrl varchar(255),
  facebookUrl varchar(255),
  bday date,
  primary key (firstName, lastName)
);