import { supabase } from '../services/supabaseClient.js';

const DUTY_SELECT = 'id, name, notes, schedule_key_id, display_order, start_time, end_time, second_day, duty_types(name), duty_trains(train_id, sequence_order, trains(departure_time))';

export async function loadDutiesForScheduleDate(selectedDate) {
  const { data: validScheduleKeys, error: scheduleKeysError } = await supabase
    .from('schedule_keys')
    .select('id')
    .lte('valid_from', selectedDate)
    .gte('valid_to', selectedDate);

  if (scheduleKeysError) {
    return { data: [], error: scheduleKeysError };
  }

  const validScheduleKeyIds = (validScheduleKeys || [])
    .map((item) => item?.id)
    .filter(Boolean);

  if (!validScheduleKeyIds.length) {
    return { data: [], error: null };
  }

  const { data: directDuties, error: directDutiesError } = await supabase
    .from('duties')
    .select(DUTY_SELECT)
    .in('schedule_key_id', validScheduleKeyIds);

  if (directDutiesError) {
    return { data: [], error: directDutiesError };
  }

  const { data: mappedRows, error: mappedRowsError } = await supabase
    .from('schedule_key_duties')
    .select('duty_id')
    .in('schedule_key_id', validScheduleKeyIds);

  if (mappedRowsError) {
    return { data: [], error: mappedRowsError };
  }

  const directDutyIds = new Set((directDuties || []).map((item) => item?.id).filter(Boolean));
  const mappedDutyIds = [...new Set((mappedRows || []).map((row) => row?.duty_id).filter(Boolean))]
    .filter((dutyId) => !directDutyIds.has(dutyId));

  if (!mappedDutyIds.length) {
    return { data: directDuties || [], error: null };
  }

  const { data: mappedDuties, error: mappedDutiesError } = await supabase
    .from('duties')
    .select(DUTY_SELECT)
    .in('id', mappedDutyIds);

  if (mappedDutiesError) {
    return { data: [], error: mappedDutiesError };
  }

  return { data: [...(directDuties || []), ...(mappedDuties || [])], error: null };
}