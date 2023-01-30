DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS catalogue;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

create table customers(
    id serial primary key not null,
    firstname text not null,
    lastname text not null,
    email text not null,
    password text not null
);

create table products(
    id serial primary key not null,
    product text not null,
    small_price decimal not null,
    medium_price decimal not null,
    large_price decimal not null,
    ingredients text not null,
    image_url text not null
);

create table catalogue(
    id serial primary key not null,
    product_id int not null,
    session_id text not null,
    size text not null,
    price decimal not null,
    qty int not null,
    foreign key(product_id) references products(id) on delete cascade
);

create table orders(
    id serial primary key not null,
    customer_id int not null,
    product text not null,
    qty int not null,
    order_date time not null,
    order_status text not null,
    foreign key(customer_id) references customers(id) on delete cascade
);