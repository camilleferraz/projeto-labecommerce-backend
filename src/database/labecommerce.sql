-- Active: 1675271780970@@127.0.0.1@3306

CREATE TABLE users (
	id INTEGER PRIMARY KEY UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL
);

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
	name TEXT  NOT NULL,
	price REAL NOT NULL,
    category TEXT NOT NULL
);
CREATE TABLE purchase(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
	total_price REAL  NOT NULL,
	paid  INTEGER NOT NULL,
    delivered_at  TEXT,
    buyer_id TEXT NOT NULL,

    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

SELECT * FROM users;
SELECT * FROM products;

SELECT * FROM purchase;

INSERT INTO users (id, email, password)
VALUES 
(1,"maria@email.com","123456"),
(2,"joao@email.com","456788"),
(3,"sergio@email.com","543211");

INSERT INTO products (id, name, price, category)
VALUES
("c001","Frappe",3.5,"Cold Drinks"),
("c002","Strawberry Juice",5,"Fresh Drinks"),
("c003","Expresso",1.5,"Hot Drinks"),
("c004","Latte",2,"Hot Drinks"),
("c005","Mocha",2.5,"Hot Drinks");

INSERT INTO purchase (id, total_price, paid, delivered_at, buyer_id)
VALUES
("p001", 6.78, 0, datetime('now'), 1 ),
("p002", 1.50, 1, datetime('now'), 2);


DROP TABLE users;
DROP TABLE products;
