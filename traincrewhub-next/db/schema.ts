import {
  boolean,
  date,
  integer,
  interval,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
  unique,
  uuid
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const appRole = pgEnum("app_role", [
  "admin",
  "head_of_transport",
  "instructor",
  "user"
]);

export const scheduleType = pgEnum("schedule_type", [
  "seasonal",
  "ad-hoc",
  "temporary"
]);

export const accessScope = pgEnum("access_scope", [
  "none",
  "all",
  "own",
  "role_attached_employees"
]);

const id = () => uuid("id").primaryKey().defaultRandom();
const createdAt = () => timestamp("created_at", { withTimezone: true }).defaultNow();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).defaultNow();
const createdFrom = () => text("created_from");

export const positions = pgTable("positions", {
  id: id(),
  title: text("title").notNull(),
  createdAt: createdAt(),
  createdFrom: createdFrom()
});

export const employees = pgTable("employees", {
  id: id(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  photoUrl: text("photo_url"),
  positionId: uuid("position_id").references(() => positions.id),
  isActive: boolean("is_active").default(true),
  psychologicalAssessmentExpiry: date("psychological_assessment_expiry"),
  medicalCertificateExpiry: date("medical_certificate_expiry"),
  licenseExpiry: date("license_expiry"),
  otherCertificates: jsonb("other_certificates"),
  createdAt: createdAt(),
  createdFrom: createdFrom(),
  updatedAt: updatedAt()
});

export const absenceReasons = pgTable("absence_reasons", {
  id: id(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: createdAt(),
  createdFrom: createdFrom()
});

export const employeeAbsences = pgTable("employee_absences", {
  id: id(),
  employeeId: uuid("employee_id").notNull().references(() => employees.id),
  reasonId: uuid("reason_id").notNull().references(() => absenceReasons.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  notes: text("notes"),
  createdAt: createdAt(),
  createdFrom: createdFrom()
});

export const scheduleKeys = pgTable("schedule_keys", {
  id: id(),
  name: text("name").notNull(),
  isActive: boolean("is_active").default(true),
  type: scheduleType("type").default("seasonal"),
  validFrom: date("valid_from").notNull(),
  validTo: date("valid_to").notNull(),
  crewRole: text("crew_role"),
  createdAt: createdAt(),
  createdFrom: createdFrom(),
  displayOrder: integer("display_order").default(0)
});

export const dutyTypes = pgTable("duty_types", {
  id: id(),
  name: text("name").notNull().unique(),
  createdAt: createdAt(),
  createdFrom: createdFrom()
});

export const duties = pgTable("duties", {
  id: id(),
  scheduleKeyId: uuid("schedule_key_id").references(() => scheduleKeys.id),
  dutyTypeId: uuid("duty_type_id").references(() => dutyTypes.id),
  parentDutyId: uuid("parent_duty_id"),
  name: text("name").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  breakStartTime: time("break_start_time"),
  breakEndTime: time("break_end_time"),
  breakDuration: interval("break_duration"),
  duration: interval("duration").generatedAlwaysAs(sql`
    case
      when end_time >= start_time then end_time - start_time
      else (end_time - start_time) + interval '24 hours'
    end
  `),
  isSecondDay: boolean("is_second_day").default(false),
  notes: text("notes"),
  displayOrder: integer("display_order").default(0),
  createdAt: createdAt(),
  createdFrom: createdFrom()
});

export const trains = pgTable("trains", {
  id: id(),
  number: text("number").notNull(),
  originStation: text("origin_station").notNull(),
  destinationStation: text("destination_station").notNull(),
  departureTime: time("departure_time").notNull(),
  arrivalTime: time("arrival_time").notNull(),
  timetableUrl: text("timetable_url"),
  createdAt: createdAt(),
  createdFrom: createdFrom()
});

export const dutyTrains = pgTable(
  "duty_trains",
  {
    dutyId: uuid("duty_id").notNull().references(() => duties.id, { onDelete: "cascade" }),
    trainId: uuid("train_id").notNull().references(() => trains.id, { onDelete: "cascade" }),
    sequenceOrder: integer("sequence_order").notNull().default(1)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.dutyId, table.trainId] })
  })
);

export const scheduleKeyDuties = pgTable(
  "schedule_key_duties",
  {
    scheduleKeyId: uuid("schedule_key_id").notNull().references(() => scheduleKeys.id, { onDelete: "cascade" }),
    dutyId: uuid("duty_id").notNull().references(() => duties.id, { onDelete: "cascade" }),
    displayOrder: integer("display_order").default(0)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.scheduleKeyId, table.dutyId] })
  })
);

export const plannedDuties = pgTable(
  "planned_duties",
  {
    id: id(),
    date: date("date").notNull(),
    employeeId: uuid("employee_id").references(() => employees.id),
    dutyId: uuid("duty_id").references(() => duties.id),
    assignmentRole: text("assignment_role"),
    createdAt: createdAt(),
    createdFrom: createdFrom()
  },
  (table) => ({
    uniquePlannedDuty: unique().on(table.date, table.employeeId, table.dutyId, table.assignmentRole)
  })
);

export const actualDuties = pgTable(
  "actual_duties",
  {
    id: id(),
    date: date("date").notNull(),
    employeeId: uuid("employee_id").references(() => employees.id),
    dutyId: uuid("duty_id").references(() => duties.id),
    assignmentRole: text("assignment_role"),
    startTimeOverride: time("start_time_override"),
    endTimeOverride: time("end_time_override"),
    sourceActualDutyId: uuid("source_actual_duty_id"),
    reportedAt: timestamp("reported_at", { withTimezone: true }).defaultNow()
  },
  (table) => ({
    uniqueActualDuty: unique().on(table.date, table.employeeId, table.dutyId, table.assignmentRole)
  })
);

export const roles = pgTable("roles", {
  name: text("name").primaryKey(),
  displayName: text("display_name").notNull(),
  displayNameBg: text("display_name_bg"),
  createdAt: createdAt()
});

export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").primaryKey(),
  username: text("username").unique(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  employeeId: uuid("employee_id").references(() => employees.id),
  isActive: boolean("is_active").default(false),
  createdAt: createdAt(),
  createdFrom: createdFrom(),
  updatedAt: updatedAt()
});

export const userRoles = pgTable(
  "user_roles",
  {
    id: id(),
    userId: uuid("user_id").notNull(),
    role: text("role").notNull().references(() => roles.name),
    grantedBy: uuid("granted_by"),
    createdAt: createdAt(),
    createdFrom: createdFrom()
  },
  (table) => ({
    uniqueUserRole: unique().on(table.userId, table.role)
  })
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: id(),
    role: text("role").notNull().references(() => roles.name),
    resource: text("resource").notNull(),
    canView: boolean("can_view").default(false),
    canCreate: boolean("can_create").default(false),
    canEdit: boolean("can_edit").default(false),
    canDelete: boolean("can_delete").default(false),
    viewScope: accessScope("view_scope").default("none"),
    createScope: accessScope("create_scope").default("none"),
    editScope: accessScope("edit_scope").default("none"),
    deleteScope: accessScope("delete_scope").default("none"),
    createdAt: createdAt(),
    updatedAt: updatedAt()
  },
  (table) => ({
    uniqueRoleResource: unique().on(table.role, table.resource)
  })
);

export const schedulePublications = pgTable(
  "schedule_publications",
  {
    id: id(),
    date: date("date").notNull().unique(),
    publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow(),
    publishedBy: uuid("published_by"),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    confirmedBy: uuid("confirmed_by"),
    invalidatedAt: timestamp("invalidated_at", { withTimezone: true })
  }
);

export const scheduleChangeEvents = pgTable("schedule_change_events", {
  id: id(),
  date: date("date").notNull(),
  employeeId: uuid("employee_id").references(() => employees.id),
  dutyId: uuid("duty_id").references(() => duties.id),
  action: text("action").notNull(),
  createdAt: createdAt(),
  createdBy: uuid("created_by")
});

export const documentCategories = pgTable("document_categories", {
  id: id(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: createdAt(),
  createdFrom: createdFrom()
});

export const documents = pgTable("documents", {
  id: id(),
  categoryId: uuid("category_id").references(() => documentCategories.id),
  title: text("title").notNull(),
  documentUrl: text("document_url"),
  storagePath: text("storage_path"),
  notes: text("notes"),
  createdAt: createdAt(),
  createdFrom: createdFrom(),
  updatedAt: updatedAt()
});

export const userRoleAuditLogs = pgTable("user_role_audit_logs", {
  id: id(),
  targetUserId: uuid("target_user_id").notNull(),
  role: text("role").notNull(),
  action: text("action").notNull(),
  changedBy: uuid("changed_by"),
  changedAt: timestamp("changed_at", { withTimezone: true }).defaultNow()
});
