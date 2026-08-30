CREATE TYPE "public"."access_scope" AS ENUM('none', 'all', 'own', 'role_attached_employees');--> statement-breakpoint
CREATE TYPE "public"."app_role" AS ENUM('admin', 'head_of_transport', 'instructor', 'user');--> statement-breakpoint
CREATE TYPE "public"."schedule_type" AS ENUM('seasonal', 'ad-hoc', 'temporary');--> statement-breakpoint
CREATE TABLE "absence_reasons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text
);
--> statement-breakpoint
CREATE TABLE "actual_duties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"employee_id" uuid,
	"duty_id" uuid,
	"assignment_role" text,
	"start_time_override" time,
	"end_time_override" time,
	"source_actual_duty_id" uuid,
	"reported_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "actual_duties_date_employee_id_duty_id_assignment_role_unique" UNIQUE("date","employee_id","duty_id","assignment_role")
);
--> statement-breakpoint
CREATE TABLE "document_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid,
	"title" text NOT NULL,
	"document_url" text,
	"storage_path" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "duties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"schedule_key_id" uuid,
	"duty_type_id" uuid,
	"parent_duty_id" uuid,
	"name" text NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"break_start_time" time,
	"break_end_time" time,
	"break_duration" interval,
	"duration" interval GENERATED ALWAYS AS (
    case
      when end_time >= start_time then end_time - start_time
      else (end_time - start_time) + interval '24 hours'
    end
  ) STORED,
	"is_second_day" boolean DEFAULT false,
	"notes" text,
	"display_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text
);
--> statement-breakpoint
CREATE TABLE "duty_trains" (
	"duty_id" uuid NOT NULL,
	"train_id" uuid NOT NULL,
	"sequence_order" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "duty_trains_duty_id_train_id_pk" PRIMARY KEY("duty_id","train_id")
);
--> statement-breakpoint
CREATE TABLE "duty_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text,
	CONSTRAINT "duty_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "employee_absences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid NOT NULL,
	"reason_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"photo_url" text,
	"position_id" uuid,
	"is_active" boolean DEFAULT true,
	"psychological_assessment_expiry" date,
	"medical_certificate_expiry" date,
	"license_expiry" date,
	"other_certificates" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "planned_duties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"employee_id" uuid,
	"duty_id" uuid,
	"assignment_role" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text,
	CONSTRAINT "planned_duties_date_employee_id_duty_id_assignment_role_unique" UNIQUE("date","employee_id","duty_id","assignment_role")
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" text NOT NULL,
	"resource" text NOT NULL,
	"can_view" boolean DEFAULT false,
	"can_create" boolean DEFAULT false,
	"can_edit" boolean DEFAULT false,
	"can_delete" boolean DEFAULT false,
	"view_scope" "access_scope" DEFAULT 'none',
	"create_scope" "access_scope" DEFAULT 'none',
	"edit_scope" "access_scope" DEFAULT 'none',
	"delete_scope" "access_scope" DEFAULT 'none',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "role_permissions_role_resource_unique" UNIQUE("role","resource")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"name" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"display_name_bg" text,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "schedule_change_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"employee_id" uuid,
	"duty_id" uuid,
	"action" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "schedule_key_duties" (
	"schedule_key_id" uuid NOT NULL,
	"duty_id" uuid NOT NULL,
	"display_order" integer DEFAULT 0,
	CONSTRAINT "schedule_key_duties_schedule_key_id_duty_id_pk" PRIMARY KEY("schedule_key_id","duty_id")
);
--> statement-breakpoint
CREATE TABLE "schedule_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"type" "schedule_type" DEFAULT 'seasonal',
	"valid_from" date NOT NULL,
	"valid_to" date NOT NULL,
	"crew_role" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text,
	"display_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "schedule_publications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"published_at" timestamp with time zone DEFAULT now(),
	"published_by" uuid,
	"confirmed_at" timestamp with time zone,
	"confirmed_by" uuid,
	"invalidated_at" timestamp with time zone,
	CONSTRAINT "schedule_publications_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "trains" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" text NOT NULL,
	"origin_station" text NOT NULL,
	"destination_station" text NOT NULL,
	"departure_time" time NOT NULL,
	"arrival_time" time NOT NULL,
	"timetable_url" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text,
	"email" text,
	"first_name" text,
	"last_name" text,
	"employee_id" uuid,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "user_role_audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"target_user_id" uuid NOT NULL,
	"role" text NOT NULL,
	"action" text NOT NULL,
	"changed_by" uuid,
	"changed_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" text NOT NULL,
	"granted_by" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"created_from" text,
	CONSTRAINT "user_roles_user_id_role_unique" UNIQUE("user_id","role")
);
--> statement-breakpoint
ALTER TABLE "actual_duties" ADD CONSTRAINT "actual_duties_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "actual_duties" ADD CONSTRAINT "actual_duties_duty_id_duties_id_fk" FOREIGN KEY ("duty_id") REFERENCES "public"."duties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_category_id_document_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."document_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duties" ADD CONSTRAINT "duties_schedule_key_id_schedule_keys_id_fk" FOREIGN KEY ("schedule_key_id") REFERENCES "public"."schedule_keys"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duties" ADD CONSTRAINT "duties_duty_type_id_duty_types_id_fk" FOREIGN KEY ("duty_type_id") REFERENCES "public"."duty_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duty_trains" ADD CONSTRAINT "duty_trains_duty_id_duties_id_fk" FOREIGN KEY ("duty_id") REFERENCES "public"."duties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duty_trains" ADD CONSTRAINT "duty_trains_train_id_trains_id_fk" FOREIGN KEY ("train_id") REFERENCES "public"."trains"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_absences" ADD CONSTRAINT "employee_absences_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_absences" ADD CONSTRAINT "employee_absences_reason_id_absence_reasons_id_fk" FOREIGN KEY ("reason_id") REFERENCES "public"."absence_reasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planned_duties" ADD CONSTRAINT "planned_duties_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "planned_duties" ADD CONSTRAINT "planned_duties_duty_id_duties_id_fk" FOREIGN KEY ("duty_id") REFERENCES "public"."duties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_roles_name_fk" FOREIGN KEY ("role") REFERENCES "public"."roles"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_change_events" ADD CONSTRAINT "schedule_change_events_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_change_events" ADD CONSTRAINT "schedule_change_events_duty_id_duties_id_fk" FOREIGN KEY ("duty_id") REFERENCES "public"."duties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_key_duties" ADD CONSTRAINT "schedule_key_duties_schedule_key_id_schedule_keys_id_fk" FOREIGN KEY ("schedule_key_id") REFERENCES "public"."schedule_keys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_key_duties" ADD CONSTRAINT "schedule_key_duties_duty_id_duties_id_fk" FOREIGN KEY ("duty_id") REFERENCES "public"."duties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_roles_name_fk" FOREIGN KEY ("role") REFERENCES "public"."roles"("name") ON DELETE no action ON UPDATE no action;