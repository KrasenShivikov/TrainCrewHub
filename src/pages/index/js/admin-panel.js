import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';

export async function loadAdminDashboardSnapshot(container, helpers) {
  const { setText, formatDateTime, escapeHtml } = helpers;

  const [
    profilesResponse,
    usersWithRolesResponse,
    rolesCatalogResponse,
    linkedProfilesResponse
  ] = await Promise.all([
    supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
    supabase.from('user_roles').select('user_id'),
    supabase.from('roles').select('name', { count: 'exact', head: true }),
    supabase.from('user_profiles').select('id', { count: 'exact', head: true }).not('employee_id', 'is', null)
  ]);

  const hasError = [profilesResponse, usersWithRolesResponse, rolesCatalogResponse, linkedProfilesResponse].some(
    (item) => item.error
  );
  if (hasError) {
    showToast('Част от админ данните на индекс страницата не могат да се заредят.', 'warning');
  }

  const uniqueUserIds = new Set((usersWithRolesResponse.data || []).map((item) => item.user_id).filter(Boolean));

  setText(container, '#index-kpi-planned', String(profilesResponse.count ?? 0));
  setText(container, '#index-kpi-actual', String(uniqueUserIds.size));
  setText(container, '#index-kpi-absences', String(linkedProfilesResponse.count ?? 0));
  setText(container, '#index-kpi-employees', String(rolesCatalogResponse.count ?? 0));
  await loadAdminPendingUsersSnapshot(container, { setText, formatDateTime, escapeHtml });
  setText(container, '#index-last-updated', `Последно обновяване: ${formatDateTime(new Date())}`);
}

async function loadAdminPendingUsersSnapshot(container, helpers) {
  const { setText, formatDateTime, escapeHtml } = helpers;
  const panel = container.querySelector('#index-pending-users-panel');
  const body = container.querySelector('#index-pending-users-body');

  if (!panel || !body) {
    return;
  }

  const [{ data: profiles, error: profilesError }, { data: roleRows, error: rolesError }] = await Promise.all([
    supabase.from('user_profiles').select('id, username, created_at').order('created_at', { ascending: true }),
    supabase.from('user_roles').select('user_id')
  ]);

  if (profilesError || rolesError) {
    showToast('Списъкът с чакащи потребители не може да се зареди.', 'warning');
    setText(container, '#index-pending-users-count', '0');
    body.innerHTML = '<tr><td colspan="3" class="text-secondary">Грешка при зареждане.</td></tr>';
    return;
  }

  const usersWithRoles = new Set((roleRows || []).map((item) => String(item?.user_id || '').trim()).filter(Boolean));
  const pendingProfiles = (profiles || []).filter((profile) => !usersWithRoles.has(String(profile?.id || '').trim()));

  setText(container, '#index-pending-users-count', String(pendingProfiles.length));

  if (!pendingProfiles.length) {
    body.innerHTML = '<tr><td colspan="3" class="text-secondary">Няма чакащи потребители.</td></tr>';
    return;
  }

  body.innerHTML = pendingProfiles
    .map((profile) => {
      const username = String(profile?.username || '').trim() || String(profile?.id || '-');
      const createdAt = profile?.created_at || '';
      const createdDate = createdAt ? new Date(createdAt) : null;
      const createdLabel = createdDate && !Number.isNaN(createdDate.getTime())
        ? formatDateTime(createdDate)
        : '-';
      const waitingLabel = formatWaitingDuration(createdAt);

      return `
        <tr>
          <td>${escapeHtml(username)}</td>
          <td>${escapeHtml(createdLabel)}</td>
          <td>${escapeHtml(waitingLabel)}</td>
        </tr>
      `;
    })
    .join('');
}

function formatWaitingDuration(value) {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  const elapsedMs = Math.max(Date.now() - date.getTime(), 0);
  const totalMinutes = Math.floor(elapsedMs / 60000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days} д ${hours} ч`;
  }

  if (hours > 0) {
    return `${hours} ч ${minutes} мин`;
  }

  if (minutes > 0) {
    return `${minutes} мин`;
  }

  return 'под 1 мин';
}
