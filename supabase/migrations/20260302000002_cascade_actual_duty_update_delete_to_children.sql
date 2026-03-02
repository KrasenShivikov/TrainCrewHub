-- Trigger function: cascade UPDATE on actual_duties to child duties
CREATE OR REPLACE FUNCTION cascade_actual_duty_update_to_children()
RETURNS TRIGGER AS $$
DECLARE
  child_duty RECORD;
BEGIN
  IF pg_trigger_depth() > 1 THEN
    RETURN NEW;
  END IF;

  -- Skip if the duty is itself a child duty
  IF EXISTS (
    SELECT 1 FROM duties WHERE id = NEW.duty_id AND parent_duty_id IS NOT NULL
  ) THEN
    RETURN NEW;
  END IF;

  -- Skip if nothing relevant changed
  IF OLD.employee_id IS NOT DISTINCT FROM NEW.employee_id
    AND OLD.assignment_role IS NOT DISTINCT FROM NEW.assignment_role
    AND OLD.date IS NOT DISTINCT FROM NEW.date
  THEN
    RETURN NEW;
  END IF;

  FOR child_duty IN
    SELECT id FROM duties
    WHERE parent_duty_id = NEW.duty_id
  LOOP
    UPDATE actual_duties
    SET
      employee_id   = NEW.employee_id,
      assignment_role = NEW.assignment_role,
      date          = NEW.date + INTERVAL '1 day'
    WHERE duty_id     = child_duty.id
      AND employee_id = OLD.employee_id
      AND date        = OLD.date + INTERVAL '1 day';
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_cascade_actual_duty_update_to_children
AFTER UPDATE ON actual_duties
FOR EACH ROW EXECUTE FUNCTION cascade_actual_duty_update_to_children();

-- Trigger function: cascade DELETE on actual_duties to child duties
CREATE OR REPLACE FUNCTION cascade_actual_duty_delete_to_children()
RETURNS TRIGGER AS $$
DECLARE
  child_duty RECORD;
BEGIN
  -- Skip if the duty is itself a child duty
  IF EXISTS (
    SELECT 1 FROM duties WHERE id = OLD.duty_id AND parent_duty_id IS NOT NULL
  ) THEN
    RETURN OLD;
  END IF;

  FOR child_duty IN
    SELECT id FROM duties
    WHERE parent_duty_id = OLD.duty_id
  LOOP
    DELETE FROM actual_duties
    WHERE duty_id     = child_duty.id
      AND employee_id = OLD.employee_id
      AND date        = OLD.date + INTERVAL '1 day';
  END LOOP;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_cascade_actual_duty_delete_to_children
AFTER DELETE ON actual_duties
FOR EACH ROW EXECUTE FUNCTION cascade_actual_duty_delete_to_children();
