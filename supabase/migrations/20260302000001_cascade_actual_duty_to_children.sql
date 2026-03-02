-- Function: cascade actual_duties records to child duties (next day)
-- Fires after INSERT on actual_duties for parent duties only.
-- Child duties are those with parent_duty_id pointing to the inserted duty.
-- Uses pg_trigger_depth() to prevent recursive triggering.

CREATE OR REPLACE FUNCTION cascade_actual_duty_to_children()
RETURNS TRIGGER AS $$
DECLARE
  child_duty RECORD;
  next_date DATE;
BEGIN
  -- Prevent recursive triggering (this trigger inserting rows triggers itself again)
  IF pg_trigger_depth() > 1 THEN
    RETURN NEW;
  END IF;

  -- Skip if the duty being inserted is itself a child duty (has parent_duty_id set)
  -- to avoid double-cascading when child records are manually inserted
  IF EXISTS (
    SELECT 1 FROM duties WHERE id = NEW.duty_id AND parent_duty_id IS NOT NULL
  ) THEN
    RETURN NEW;
  END IF;

  next_date := NEW.date + INTERVAL '1 day';

  FOR child_duty IN
    SELECT id FROM duties
    WHERE parent_duty_id = NEW.duty_id
  LOOP
    INSERT INTO actual_duties (date, employee_id, duty_id, assignment_role)
    VALUES (next_date, NEW.employee_id, child_duty.id, NEW.assignment_role)
    ON CONFLICT (date, employee_id, duty_id) DO NOTHING;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_cascade_actual_duty_to_children
AFTER INSERT ON actual_duties
FOR EACH ROW EXECUTE FUNCTION cascade_actual_duty_to_children();
