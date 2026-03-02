ALTER TABLE duties
  ADD COLUMN IF NOT EXISTS parent_duty_id UUID REFERENCES duties(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_duties_parent_duty_id ON duties(parent_duty_id);
