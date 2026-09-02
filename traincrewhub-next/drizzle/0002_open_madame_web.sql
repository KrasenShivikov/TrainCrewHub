ALTER TABLE "actual_duties" ADD COLUMN "original_employee_id" uuid;--> statement-breakpoint
ALTER TABLE "actual_duties" ADD COLUMN "original_duty_id" uuid;--> statement-breakpoint
ALTER TABLE "actual_duties" ADD COLUMN "original_assignment_role" text;--> statement-breakpoint
UPDATE "actual_duties"
SET
  "original_employee_id" = "employee_id",
  "original_duty_id" = "duty_id",
  "original_assignment_role" = "assignment_role"
WHERE "original_employee_id" IS NULL
  AND "original_duty_id" IS NULL
  AND "original_assignment_role" IS NULL;--> statement-breakpoint
ALTER TABLE "actual_duties" ADD CONSTRAINT "actual_duties_original_employee_id_employees_id_fk" FOREIGN KEY ("original_employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "actual_duties" ADD CONSTRAINT "actual_duties_original_duty_id_duties_id_fk" FOREIGN KEY ("original_duty_id") REFERENCES "public"."duties"("id") ON DELETE no action ON UPDATE no action;
