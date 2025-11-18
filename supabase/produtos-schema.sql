-- Supabase - Script de Schema para imagens, vídeo (YouTube), checkout e destaque
-- Execute este arquivo no SQL Editor do seu projeto Supabase.

-- 1) Adicionar colunas na tabela public.produtos
alter table public.produtos add column if not exists imagens text[];
alter table public.produtos add column if not exists video_url text;
alter table public.produtos add column if not exists checkout_url text;
alter table public.produtos add column if not exists destaque boolean default false;

-- Garantir valores default em linhas existentes
update public.produtos set destaque = false where destaque is null;

do $$ begin
  create type public.payment_type as enum ('cod','delivery','prepaid');
exception when duplicate_object then null; end $$;

alter table public.produtos add column if not exists payment_type public.payment_type default 'cod';
update public.produtos set payment_type = 'cod' where payment_type is null;
alter table public.produtos alter column payment_type set not null;

-- 6) Atributos: cores e tamanhos + associações
create table if not exists public.cores (
  id serial primary key,
  nome text not null,
  hex text not null,
  ativo boolean default true,
  created_at timestamptz default now()
);
create unique index if not exists cores_hex_unique on public.cores (hex);

create table if not exists public.tamanhos (
  id serial primary key,
  descricao text not null,
  codigo text not null,
  ativo boolean default true,
  created_at timestamptz default now()
);
create unique index if not exists tamanhos_codigo_unique on public.tamanhos (lower(codigo));

create table if not exists public.produto_cores (
  produto_id integer not null references public.produtos(id) on delete cascade,
  cor_id integer not null references public.cores(id) on delete cascade,
  primary key (produto_id, cor_id)
);

create table if not exists public.produto_tamanhos (
  produto_id integer not null references public.produtos(id) on delete cascade,
  tamanho_id integer not null references public.tamanhos(id) on delete cascade,
  primary key (produto_id, tamanho_id)
);

alter table public.cores enable row level security;
alter table public.tamanhos enable row level security;
alter table public.produto_cores enable row level security;
alter table public.produto_tamanhos enable row level security;

do $$ begin create policy "cores select anon" on public.cores for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "cores insert anon" on public.cores for insert with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "cores update anon" on public.cores for update using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "cores delete anon" on public.cores for delete using (true); exception when duplicate_object then null; end $$;

do $$ begin create policy "tamanhos select anon" on public.tamanhos for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "tamanhos insert anon" on public.tamanhos for insert with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "tamanhos update anon" on public.tamanhos for update using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "tamanhos delete anon" on public.tamanhos for delete using (true); exception when duplicate_object then null; end $$;

do $$ begin create policy "produto_cores select anon" on public.produto_cores for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "produto_cores insert anon" on public.produto_cores for insert with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "produto_cores update anon" on public.produto_cores for update using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "produto_cores delete anon" on public.produto_cores for delete using (true); exception when duplicate_object then null; end $$;

do $$ begin create policy "produto_tamanhos select anon" on public.produto_tamanhos for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "produto_tamanhos insert anon" on public.produto_tamanhos for insert with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "produto_tamanhos update anon" on public.produto_tamanhos for update using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "produto_tamanhos delete anon" on public.produto_tamanhos for delete using (true); exception when duplicate_object then null; end $$;

-- 2) (Opcional) Habilitar RLS na tabela. Se usa anon para escrever, mantenha as policies abaixo.
alter table public.produtos enable row level security;

-- 3) Policies para permitir operações com a chave "anon"
do $$ begin
  create policy "produtos select anon" on public.produtos for select using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "produtos insert anon" on public.produtos for insert with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "produtos update anon" on public.produtos for update using (true) with check (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "produtos delete anon" on public.produtos for delete using (true);
exception when duplicate_object then null; end $$;

-- 4) Storage - Criar bucket público "produtos" (idempotente)
insert into storage.buckets (id, name, public)
select 'produtos', 'produtos', true
where not exists (select 1 from storage.buckets where id = 'produtos');

-- Garantir que o bucket esteja público
update storage.buckets set public = true where id = 'produtos';

-- 5) Policies do Storage para uso com "anon" (aplicadas ao bucket produtos)
-- IMPORTANTE: Criar policies em storage.objects requer privilégios de OWNER.
-- Os blocos abaixo tentam criar as policies e ignoram o erro de permissão (SQLSTATE '42501').
-- Se forem ignorados, crie manualmente pelo painel de Storage (Policies) com Role = anon.

do $$ begin
  begin
    create policy "storage select anon produtos" on storage.objects for select using (bucket_id = 'produtos');
  exception when duplicate_object then
    null;
  when others then
    if SQLSTATE = '42501' then
      -- insuficientes privilégios: criar manualmente via UI
      null;
    else
      raise;
    end if;
  end;
end $$;

do $$ begin
  begin
    create policy "storage insert anon produtos" on storage.objects for insert with check (bucket_id = 'produtos');
  exception when duplicate_object then
    null;
  when others then
    if SQLSTATE = '42501' then null; else raise; end if;
  end;
end $$;

do $$ begin
  begin
    create policy "storage update anon produtos" on storage.objects for update using (bucket_id = 'produtos');
  exception when duplicate_object then
    null;
  when others then
    if SQLSTATE = '42501' then null; else raise; end if;
  end;
end $$;

-- (Opcional) permitir delete
do $$ begin
  begin
    create policy "storage delete anon produtos" on storage.objects for delete using (bucket_id = 'produtos');
  exception when duplicate_object then
    null;
  when others then
    if SQLSTATE = '42501' then null; else raise; end if;
  end;
end $$;

-- Fim do script
-- Banners (home)
create table if not exists public.banner_sets (
  id serial primary key,
  name text not null,
  slider_enabled boolean default true,
  transition_ms integer default 4000,
  effect text default 'slide',
  active boolean default false,
  active_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.banner_images (
  id serial primary key,
  set_id integer not null references public.banner_sets(id) on delete cascade,
  url text not null,
  position integer not null,
  format text,
  width integer,
  height integer,
  created_at timestamptz default now()
);

alter table public.banner_sets enable row level security;
alter table public.banner_images enable row level security;

do $$ begin create policy "banner_sets select anon" on public.banner_sets for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "banner_sets insert anon" on public.banner_sets for insert with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "banner_sets update anon" on public.banner_sets for update using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "banner_sets delete anon" on public.banner_sets for delete using (true); exception when duplicate_object then null; end $$;

do $$ begin create policy "banner_images select anon" on public.banner_images for select using (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "banner_images insert anon" on public.banner_images for insert with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "banner_images update anon" on public.banner_images for update using (true) with check (true); exception when duplicate_object then null; end $$;
do $$ begin create policy "banner_images delete anon" on public.banner_images for delete using (true); exception when duplicate_object then null; end $$;

insert into storage.buckets (id, name, public)
select 'banners', 'banners', true
where not exists (select 1 from storage.buckets where id = 'banners');
update storage.buckets set public = true where id = 'banners';
