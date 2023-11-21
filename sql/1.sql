create extension if not exists citext;
create extension if not exists "uuid-ossp";
create table users (
	id uuid default uuid_generate_v4() primary key,
	username citext unique not null,
	password text,
	created_at timestamp default now(),
	updated_at timestamp default now()
);
create table notes (
	id uuid default uuid_generate_v4() primary key,
	parent_id uuid references notes (id),
	user_id uuid not null references users (id),
	title text,
	content text,
	is_published boolean not null default false,
	created_at timestamp default now(),
	updated_at timestamp default now()
);