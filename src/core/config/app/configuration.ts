const handleConnectionString = (): string => {
  if (process.env.DATABASE_POSTGRES_URL) {
    return process.env.DATABASE_POSTGRES_URL;
  } else if (process.env.DATABASE_NEO4J_URL) {
    return process.env.DATABASE_NEO4J_URL;
  }

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

export default (appVersion: 'postgres' | 'neo4j') => () => ({
  APP_PORT:
    parseInt(
      appVersion === 'postgres'
        ? process.env.APP_POSTGRES_PORT ?? ''
        : process.env.APP_NEO4J_PORT ?? '',
      10,
    ) || 3000,
  DATABASE: {
    USER: {
      USERNAME: process.env.DATABASE_USERNAME,
      PASSWORD: process.env.DATABASE_PASSWORD,
    },
    NAME: process.env.DATABASE_NAME,
    HOST: process.env.DATABASE_HOST,
    CONFIG: {},
    PORT: parseInt(process.env.DATABASE_PORT ?? '', 10) || 5432,
    PROTOCOL: process.env.DATABASE_PROTOCOL,
    CONNECTION_STRING: handleConnectionString(),
  },
});
