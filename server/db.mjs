import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

export const getContacts = () => db.any("SELECT * FROM contacts");

export const addContact = ({ last_name, first_name, email, phone, notes }) =>
  db.any(
    "INSERT INTO contacts(last_name, first_name, email, phone, notes) VALUES(${last_name}, ${first_name}, ${email}, ${phone}, ${notes}) RETURNING *",
    { last_name, first_name, email, phone, notes },
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
