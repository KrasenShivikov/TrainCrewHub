CREATE OR REPLACE FUNCTION cascade_actual_duty_update_to_children()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
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

  FOR child_duty IN
    SELECT id FROM duties
    WHERE parent_duty_id = NEW.duty_id
  LOOP
    -- If the employee changed, remove any conflicting row the NEW employee already has
    -- in the child duty so the following UPDATE doesn't violate the unique constraint.
    IF NEW.employee_id IS DISTINCT FROM OLD.employee_id THEN
      DELETE FROM actual_duties
      WHERE duty_id     = child_duty.id
        AND employee_id = NEW.employee_id
        AND date        = NEW.date + INTERVAL '1 day';
    END IF;

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
$$;
