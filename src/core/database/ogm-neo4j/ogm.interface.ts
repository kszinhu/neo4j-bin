export interface Neo4jConfig {
  connectionString: string;
  database: string;
  username: string;
  password: string;
  config: Record<string, any>;
}
