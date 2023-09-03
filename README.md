# E-Commerce analysis API

## About the project

This project consists of consuming an e-commerce event dataset, aiming to create an API that returns data information for possible analysis.

This branch use Neo4j as database, but you can find the same project using PostgreSQL [here]().

## Technologies

- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Python](https://www.python.org/) - Programming language used to data analysis
- [Neo4j](https://neo4j.com/) - Database
- [NestJS](https://nestjs.com/) - API
- [OGM](https://github.com/kszinhu/ogm-neo4j) - Object Graph Mapper built by me
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

#### Import a large CSV

> Using neo4j-admin (Neo4j 4.0+)

```bash
$ neo4j-admin import --database eCommerce_analysis
  --nodes=User="headers/user.csv,[data/month].csv"
  --nodes=Product="headers/product.csv,[data/month].csv"
  --nodes=Category="headers/category.csv,[data/month].csv"
  --relationships=VIEW="headers/view.csv,[data/month].csv"
  --relationships=BUY="headers/buy.csv,[data/month].csv"
  --relationships=CART="headers/cart.csv,[data/month].csv"
  --relationships=REMOVE_FROM_CART="headers/remove_from_cart.csv,[data/month].csv"
  --trim-strings=true
```

> Using seed command

```bash
$ npm run command seed -c <csv_files.csv...>
```
