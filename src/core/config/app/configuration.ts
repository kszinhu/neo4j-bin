const handleConnectionString = (): string => {
  if (process.env.DATABASE_CONNECTION_STRING) {
    return process.env.DATABASE_CONNECTION_STRING;
  }

  if (process.env.DATABASE_URL && process.env.DATABASE_NAME) {
    return `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;
  }

  if (
    process.env.DATABASE_PROTOCOL &&
    process.env.DATABASE_HOST &&
    process.env.DATABASE_PORT &&
    process.env.DATABASE_NAME
  ) {
    return `${process.env.DATABASE_PROTOCOL}://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
  }

  throw new Error(
    'No database connection string found. Please provide one in the DATABASE_CONNECTION_STRING environment variable.',
  );
};

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    user: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    config: {},
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    protocol: process.env.DATABASE_PROTOCOL,
    connectionString: handleConnectionString(),
  },
});
