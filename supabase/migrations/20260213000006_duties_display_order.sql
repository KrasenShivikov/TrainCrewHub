alter table duties
add column if not exists display_order integer;

with ordered as (
  select id, row_number() over (order by created_at, id) as rn
  from duties
)
update duties d
set display_order = ordered.rn
from ordered
where d.id = ordered.id
  and d.display_order is null;

update duties
set display_order = 0
where display_order is null;

alter table duties
alter column display_order set not null;

create index if not exists idx_duties_display_order
on duties(display_order);
