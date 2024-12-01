-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create pixels table
create table public.pixels (
    id uuid primary key default uuid_generate_v4(),
    x integer not null,
    y integer not null,
    owner text not null,
    image_url text,
    link_url text,
    color text,
    start_x integer not null,
    start_y integer not null,
    end_x integer not null,
    end_y integer not null,
    price numeric(20,9) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint pixels_coordinates_check check (
        x >= 0 and x < 1000 and
        y >= 0 and y < 1000 and
        start_x >= 0 and start_x < 1000 and
        start_y >= 0 and start_y < 1000 and
        end_x >= 0 and end_x < 1000 and
        end_y >= 0 and end_y < 1000 and
        end_x >= start_x and
        end_y >= start_y
    ),
    constraint pixels_xy_unique unique (x, y)
);

-- Create pixel_history table
create table public.pixel_history (
    id uuid primary key default uuid_generate_v4(),
    pixel_id uuid not null references public.pixels(id) on delete cascade,
    owner text not null,
    price numeric(20,9) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index pixels_owner_idx on public.pixels(owner);
create index pixels_coordinates_idx on public.pixels(x, y);
create index pixels_area_idx on public.pixels(start_x, start_y, end_x, end_y);
create index pixel_history_pixel_id_idx on public.pixel_history(pixel_id);
create index pixel_history_owner_idx on public.pixel_history(owner);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger pixels_updated_at
    before update on public.pixels
    for each row
    execute function public.handle_updated_at();

-- Enable Row Level Security
alter table public.pixels enable row level security;
alter table public.pixel_history enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Allow public read access" on public.pixels;
drop policy if exists "Allow authenticated users to insert" on public.pixels;
drop policy if exists "Allow owners to update their pixels" on public.pixels;
drop policy if exists "Allow public read access to history" on public.pixel_history;
drop policy if exists "Allow authenticated users to insert history" on public.pixel_history;

-- Create new RLS policies for anonymous access
create policy "Allow public read access"
    on public.pixels for select
    to anon, authenticated
    using (true);

create policy "Allow public insert"
    on public.pixels for insert
    to anon, authenticated
    with check (true);

create policy "Allow public update"
    on public.pixels for update
    to anon, authenticated
    using (true)
    with check (true);

create policy "Allow public read access to history"
    on public.pixel_history for select
    to anon, authenticated
    using (true);

create policy "Allow public insert history"
    on public.pixel_history for insert
    to anon, authenticated
    with check (true);