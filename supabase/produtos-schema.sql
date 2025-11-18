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
