# E-Commerce analysis API (Postgres)

## About the project

This project consists of consuming an e-commerce event dataset, aiming to create an API that returns data information for possible analysis.

This branch use Postgres as database, but you can find the same project using Neo4j [here]().

## Technologies

- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Python](https://www.python.org/) - Programming language used to data analysis
- [Postgres](https://www.postgresql.org/) - Database
- [NestJS](https://nestjs.com/) - API
- [Prisma](https://www.prisma.io/) - ORM
- [Docker](https://www.docker.com/) - Containerization

### CSV files

> Headers

- event_time
- event_type
- product_id
- category_id
- category_code
- brand
- price
- user_id
- user_session

### API

Using a [JSON-API](https://jsonapi.org) standard to return data

is possible to use the following query params:

- page (default: 1) - number of page
- limit (default: 25) - number of items per page
- sort (default: id) - sort by field
- order (default: ASC) - order by field
- fields (default: all) - fields to return (comma separated)
- filter (default: all) - filter by field (comma separated)
- include (default: none) - include relationships (comma separated)

### TODO

- [ ] Create a swagger documentation
