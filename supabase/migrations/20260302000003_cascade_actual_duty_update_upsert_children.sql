-- Fix UPDATE trigger: also INSERT child record if it doesn't exist yet (UPSERT behavior)
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
    -- Try to update existing child record that matches OLD values
    UPDATE actual_duties
    SET
      employee_id     = NEW.employee_id,
      assignment_role = NEW.assignment_role,
      date            = NEW.date + INTERVAL '1 day'
    WHERE duty_id     = child_duty.id
      AND employee_id = OLD.employee_id
      AND date        = OLD.date + INTERVAL '1 day';

    -- If no row was updated (child didn't exist yet), insert it
    IF NOT FOUND THEN
      INSERT INTO actual_duties (date, employee_id, duty_id, assignment_role)
      VALUES (NEW.date + INTERVAL '1 day', NEW.employee_id, child_duty.id, NEW.assignment_role)
      ON CONFLICT (date, employee_id, duty_id) DO NOTHING;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
