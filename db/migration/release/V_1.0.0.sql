create schema if not exists article;

create table article.user_details
(
    id               text not null primary key,
    full_name        text not null,
    email            text not null,
    deleted          boolean default false,
    blocked          boolean default false,
    active           boolean default false,
    created_by       jsonb,
    created_on       timestamp,
    last_modified_by jsonb,
    last_modified_on timestamp
);


create table article.user_credential
(
    id                 text not null primary key,
    user_id            text,
    max_login_attempts integer default 5,
    login_attempts     integer default 0,
    password           text not null,
    generated_salt     text,
    password_history   jsonb,
    created_by         jsonb,
    created_on         timestamp,
    last_modified_by   jsonb,
    last_modified_on   timestamp,
    deleted            boolean default false
);

create table article.posts
(
    id               text         not null primary key,
    author_id        text         not null,
    title            varchar(255) not null,
    content          text         not null,
    featured_image   text,
    created_by       jsonb,
    created_on       timestamp,
    last_modified_by jsonb,
    last_modified_on timestamp,
    deleted          boolean default false
)
