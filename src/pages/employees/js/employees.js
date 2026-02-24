import pageHtml from '../employees.html?raw';
import { supabase } from '../../../services/supabaseClient.js';
import { showToast } from '../../../components/toast/toast.js';
import { closeModal, escapeHtml, openModal, setupModalEscapeHandler } from './helpers.js';
import { employeesState } from './state.js';
import { loadEmployees, renderEmployeesTable } from './table.js';

const EMPLOYEE_PHOTOS_BUCKET = 'employee-photos';
let photoPreviewObjectUrl = null;

export async function renderEmployeesPage(container) {
  container.innerHTML = pageHtml;
  attachEmployeesHandlers(container);
  await loadPositionOptions(container);
  await loadEmployees(container);

  const profileEmployeeId = getEmployeeProfileFromQuery();
  if (profileEmployeeId) {
    await openEmployeeProfile(container, profileEmployeeId);
  }
}

function getEmployeeProfileFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('profile') || '';
}

function attachEmployeesHandlers(container) {
  const createButton = container.querySelector('#open-create-employee');
  const form = container.querySelector('#employee-form');
  const cancelButton = container.querySelector('#employee-cancel-btn');
  const tableBody = container.querySelector('#employees-table-body');
  const employeeModal = container.querySelector('#employee-modal');
  const deleteModal = container.querySelector('#employee-delete-modal');
  const profileModal = container.querySelector('#employee-profile-modal');
  const modalCloseButton = container.querySelector('#employee-modal-close');
  const profileCloseButton = container.querySelector('#employee-profile-close');
  const profileCloseFooterButton = container.querySelector('#employee-profile-close-btn');
  const deleteConfirmButton = container.querySelector('#employee-delete-confirm');
  const deleteCancelButton = container.querySelector('#employee-delete-cancel');
  const searchInput = container.querySelector('#employees-search');
  const positionFilterInput = container.querySelector('#employees-position-filter');
  const activeFilterInput = container.querySelector('#employees-active-filter');
  const filterResetButton = container.querySelector('#employees-filter-reset');
  const photoFileInput = container.querySelector('#employee-photo-file');
  const photoRemoveButton = container.querySelector('#employee-photo-remove-btn');

  createButton?.addEventListener('click', () => {
    resetEmployeeForm(container);
    openModal(employeeModal);
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveEmployee(container);
  });

  cancelButton?.addEventListener('click', () => {
    closeModal(employeeModal);
  });

  modalCloseButton?.addEventListener('click', () => {
    closeModal(employeeModal);
  });

  deleteCancelButton?.addEventListener('click', () => {
    closeModal(deleteModal);
  });

  profileCloseButton?.addEventListener('click', () => {
    closeModal(profileModal);
  });

  profileCloseFooterButton?.addEventListener('click', () => {
    closeModal(profileModal);
  });

  searchInput?.addEventListener('input', (event) => {
    employeesState.searchQuery = event.target.value.trim().toLowerCase();
    renderEmployeesTable(container);
  });

  positionFilterInput?.addEventListener('change', (event) => {
    employeesState.positionFilter = event.target.value || '';
    renderEmployeesTable(container);
  });

  activeFilterInput?.addEventListener('change', (event) => {
    employeesState.activeFilter = event.target.value || '';
    renderEmployeesTable(container);
  });

  filterResetButton?.addEventListener('click', () => {
    employeesState.searchQuery = '';
    employeesState.positionFilter = '';
    employeesState.activeFilter = '';

    if (searchInput) searchInput.value = '';
    if (positionFilterInput) positionFilterInput.value = '';
    if (activeFilterInput) activeFilterInput.value = '';

    renderEmployeesTable(container);
  });

  photoFileInput?.addEventListener('change', () => {
    const selectedFile = photoFileInput.files?.[0] ?? null;
    if (!selectedFile) {
      const currentPhotoPath = container.querySelector('#employee-photo-path')?.value || '';
      setEmployeePhotoPreview(container, currentPhotoPath);
      return;
    }

    if (!selectedFile.type?.startsWith('image/')) {
      showToast('Избери валиден файл с изображение.', 'warning');
      photoFileInput.value = '';
      const currentPhotoPath = container.querySelector('#employee-photo-path')?.value || '';
      setEmployeePhotoPreview(container, currentPhotoPath);
      return;
    }

    setEmployeePhotoPreview(container, selectedFile);
  });

  photoRemoveButton?.addEventListener('click', () => {
    const photoPathInput = container.querySelector('#employee-photo-path');
    if (photoPathInput) {
      photoPathInput.value = '';
    }

    if (photoFileInput) {
      photoFileInput.value = '';
    }

    setEmployeePhotoPreview(container, null);
  });

  setupModalEscapeHandler('employees', [
    deleteModal,
    profileModal,
    employeeModal
  ]);

  deleteConfirmButton?.addEventListener('click', async () => {
    const id = container.querySelector('#employee-delete-id').value;
    await deleteEmployee(id, container);
  });

  tableBody?.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('button[data-action]');
    if (!actionButton) {
      return;
    }

    const action = actionButton.getAttribute('data-action');
    if (action === 'profile') {
      const id = actionButton.getAttribute('data-id');
      await openEmployeeProfile(container, id);
      return;
    }

    if (action === 'edit') {
      populateEmployeeForm(container, {
        id: actionButton.getAttribute('data-id'),
        firstName: actionButton.getAttribute('data-first-name'),
        lastName: actionButton.getAttribute('data-last-name'),
        positionId: actionButton.getAttribute('data-position-id'),
        isActive: actionButton.getAttribute('data-active') === 'true',
        psychExpiry: actionButton.getAttribute('data-psych-expiry'),
        medicalExpiry: actionButton.getAttribute('data-medical-expiry'),
        licenseExpiry: actionButton.getAttribute('data-license-expiry'),
        photoUrl: actionButton.getAttribute('data-photo-url')
      });
      openModal(employeeModal);
      return;
    }

    if (action === 'delete') {
      const id = actionButton.getAttribute('data-id');
      container.querySelector('#employee-delete-id').value = id;
      openModal(deleteModal);
    }
  });

}

async function openEmployeeProfile(container, employeeId) {
  const { data, error } = await supabase
    .from('employees')
    .select('id, first_name, last_name, is_active, photo_url, psychological_assessment_expiry, medical_certificate_expiry, license_expiry, other_certificates, positions(title), user_profiles(id, username)')
    .eq('id', employeeId)
    .maybeSingle();

  if (error || !data) {
    showToast(error?.message || 'Служителят не е намерен.', 'error');
    return;
  }

  const linkedProfiles = Array.isArray(data.user_profiles)
    ? data.user_profiles
    : data.user_profiles
      ? [data.user_profiles]
      : [];

  const linkedProfilesLabel = linkedProfiles.length
    ? linkedProfiles
        .map((profile) => {
          const baseLabel = profile?.username || profile?.id || '';
          if (!baseLabel) {
            return '';
          }

          return baseLabel;
        })
        .filter(Boolean)
        .join(', ')
    : '-';

  const certificatesText = data.other_certificates
    ? JSON.stringify(data.other_certificates, null, 2)
    : '-';
  const photoUrl = resolveEmployeePhotoUrl(data.photo_url);

  const photoElement = container.querySelector('#employee-profile-photo');
  const photoEmptyElement = container.querySelector('#employee-profile-photo-empty');
  if (photoElement && photoEmptyElement) {
    if (photoUrl) {
      photoElement.src = photoUrl;
      photoElement.classList.remove('d-none');
      photoEmptyElement.classList.add('d-none');
    } else {
      photoElement.src = '';
      photoElement.classList.add('d-none');
      photoEmptyElement.classList.remove('d-none');
    }
  }

  container.querySelector('#employee-profile-name').textContent = `${data.first_name ?? ''} ${data.last_name ?? ''}`.trim() || '-';
  container.querySelector('#employee-profile-position').textContent = data.positions?.title || '-';
  container.querySelector('#employee-profile-active').textContent = data.is_active ? 'Да' : 'Не';
  container.querySelector('#employee-profile-linked-profiles').textContent = linkedProfilesLabel;
  container.querySelector('#employee-profile-psych').textContent = data.psychological_assessment_expiry || '-';
  container.querySelector('#employee-profile-medical').textContent = data.medical_certificate_expiry || '-';
  container.querySelector('#employee-profile-license').textContent = data.license_expiry || '-';
  container.querySelector('#employee-profile-certificates').textContent = certificatesText;

  openModal(container.querySelector('#employee-profile-modal'));
}

function resolveEmployeePhotoUrl(photoValue) {
  if (!photoValue) {
    return null;
  }

  const raw = String(photoValue).trim();
  if (!raw) {
    return null;
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  const normalized = raw.replace(/^\/+/, '');
  const defaultBuckets = ['employee-photos', 'employees', 'employee_photos'];

  const attempts = [];
  const explicitPathParts = normalized.split('/');
  if (explicitPathParts.length > 1) {
    const explicitBucket = explicitPathParts[0];
    const explicitObjectPath = explicitPathParts.slice(1).join('/');
    attempts.push({ bucket: explicitBucket, objectPath: explicitObjectPath });
  }

  defaultBuckets.forEach((bucket) => {
    attempts.push({ bucket, objectPath: normalized });
  });

  const seen = new Set();
  for (const attempt of attempts) {
    const key = `${attempt.bucket}/${attempt.objectPath}`;
    if (seen.has(key) || !attempt.bucket || !attempt.objectPath) {
      continue;
    }

    seen.add(key);
    const { data } = supabase.storage.from(attempt.bucket).getPublicUrl(attempt.objectPath);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  }

  return null;
}

async function loadPositionOptions(container) {
  const select = container.querySelector('#employee-position');
  const { data, error } = await supabase.from('positions').select('id, title').order('title', { ascending: true });

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  const options = (data || [])
    .map((item) => `<option value="${item.id}">${escapeHtml(item.title)}</option>`)
    .join('');

  select.innerHTML = '<option value="">Без позиция</option>' + options;
}

async function saveEmployee(container) {
  const idInput = container.querySelector('#employee-id');
  const firstNameInput = container.querySelector('#employee-first-name');
  const lastNameInput = container.querySelector('#employee-last-name');
  const positionInput = container.querySelector('#employee-position');
  const activeInput = container.querySelector('#employee-active');
  const psychExpiryInput = container.querySelector('#employee-psych-expiry');
  const medicalExpiryInput = container.querySelector('#employee-medical-expiry');
  const licenseExpiryInput = container.querySelector('#employee-license-expiry');
  const photoFileInput = container.querySelector('#employee-photo-file');
  const photoPathInput = container.querySelector('#employee-photo-path');
  const saveButton = container.querySelector('#employee-save-btn');

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const positionId = positionInput.value || null;
  const isActive = activeInput.checked;
  const psychExpiry = psychExpiryInput.value || null;
  const medicalExpiry = medicalExpiryInput.value || null;
  const licenseExpiry = licenseExpiryInput.value || null;
  const photoFile = photoFileInput.files?.[0] ?? null;
  const currentPhotoPath = photoPathInput.value.trim() || null;
  const editingId = idInput.value;

  if (!firstName || !lastName) {
    showToast('Моля, попълни име и фамилия.', 'warning');
    return;
  }

  const originalText = saveButton.innerHTML;
  saveButton.disabled = true;
  saveButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Запис...';

  const payload = {
    first_name: firstName,
    last_name: lastName,
    position_id: positionId,
    is_active: isActive,
    psychological_assessment_expiry: psychExpiry,
    medical_certificate_expiry: medicalExpiry,
    license_expiry: licenseExpiry,
    updated_at: new Date().toISOString()
  };

  if (photoFile && !photoFile.type?.startsWith('image/')) {
    saveButton.disabled = false;
    saveButton.innerHTML = originalText;
    showToast('Избери валиден файл с изображение.', 'warning');
    return;
  }

  let error;
  let employeeId = editingId || null;
  let photoPath = currentPhotoPath;
  let affectedRows = null;

  if (editingId) {
    if (photoFile) {
      const uploadedPhotoPath = await uploadEmployeePhoto(photoFile, editingId);
      if (!uploadedPhotoPath) {
        saveButton.disabled = false;
        saveButton.innerHTML = originalText;
        return;
      }

      photoPath = uploadedPhotoPath;
    }

    payload.photo_url = photoPath;
    ({ data: affectedRows, error } = await supabase
      .from('employees')
      .update(payload)
      .eq('id', editingId)
      .select('id'));
  } else {
    const { data: userData } = await supabase.auth.getUser();
    const createdFrom = userData?.user?.email ?? 'web_app';

    const { data: insertedEmployee, error: insertError } = await supabase
      .from('employees')
      .insert({ ...payload, created_from: createdFrom })
      .select('id')
      .single();

    error = insertError;
    employeeId = insertedEmployee?.id ?? null;

    if (!error && employeeId && photoFile) {
      const uploadedPhotoPath = await uploadEmployeePhoto(photoFile, employeeId);
      if (!uploadedPhotoPath) {
        saveButton.disabled = false;
        saveButton.innerHTML = originalText;
        return;
      }

      const { error: updatePhotoError } = await supabase
        .from('employees')
        .update({ photo_url: uploadedPhotoPath, updated_at: new Date().toISOString() })
        .eq('id', employeeId)
        .select('id');

      error = updatePhotoError;
      photoPath = uploadedPhotoPath;
    }
  }

  saveButton.disabled = false;
  saveButton.innerHTML = originalText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  if (editingId && Array.isArray(affectedRows) && affectedRows.length === 0) {
    showToast('Нямаш права да редактираш този служител.', 'warning');
    return;
  }

  showToast(editingId ? 'Служителят е обновен.' : 'Служителят е създаден.', 'success');
  closeModal(container.querySelector('#employee-modal'));
  resetEmployeeForm(container);
  await loadEmployees(container);
}

function populateEmployeeForm(container, employee) {
  container.querySelector('#employee-id').value = employee.id;
  container.querySelector('#employee-first-name').value = employee.firstName ?? '';
  container.querySelector('#employee-last-name').value = employee.lastName ?? '';
  container.querySelector('#employee-position').value = employee.positionId ?? '';
  container.querySelector('#employee-active').checked = Boolean(employee.isActive);
  container.querySelector('#employee-psych-expiry').value = employee.psychExpiry ?? '';
  container.querySelector('#employee-medical-expiry').value = employee.medicalExpiry ?? '';
  container.querySelector('#employee-license-expiry').value = employee.licenseExpiry ?? '';
  container.querySelector('#employee-photo-path').value = employee.photoUrl ?? '';
  container.querySelector('#employee-photo-file').value = '';
  setEmployeePhotoPreview(container, employee.photoUrl ?? null);

  container.querySelector('#employee-form-title').textContent = 'Редакция на служител';
  container.querySelector('#employee-save-btn').textContent = 'Запази';
}

function resetEmployeeForm(container) {
  container.querySelector('#employee-id').value = '';
  container.querySelector('#employee-first-name').value = '';
  container.querySelector('#employee-last-name').value = '';
  container.querySelector('#employee-position').value = '';
  container.querySelector('#employee-active').checked = true;
  container.querySelector('#employee-psych-expiry').value = '';
  container.querySelector('#employee-medical-expiry').value = '';
  container.querySelector('#employee-license-expiry').value = '';
  container.querySelector('#employee-photo-path').value = '';
  container.querySelector('#employee-photo-file').value = '';
  setEmployeePhotoPreview(container, null);

  container.querySelector('#employee-form-title').textContent = 'Нов служител';
  container.querySelector('#employee-save-btn').textContent = 'Създай';
}

async function deleteEmployee(id, container) {
  const deleteButton = container.querySelector('#employee-delete-confirm');
  const originalDeleteText = deleteButton.innerHTML;
  deleteButton.disabled = true;
  deleteButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Изтриване...';

  const { data: affectedRows, error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id)
    .select('id');

  deleteButton.disabled = false;
  deleteButton.innerHTML = originalDeleteText;

  if (error) {
    showToast(error.message, 'error');
    return;
  }

  if (Array.isArray(affectedRows) && affectedRows.length === 0) {
    showToast('Нямаш права да изтриеш този служител.', 'warning');
    return;
  }

  showToast('Служителят е изтрит.', 'success');
  closeModal(container.querySelector('#employee-delete-modal'));
  resetEmployeeForm(container);
  await loadEmployees(container);
}

async function uploadEmployeePhoto(file, employeeId) {
  if (!file || !employeeId) {
    return null;
  }

  const extension = (file.name?.split('.').pop() || 'jpg').toLowerCase();
  const safeExtension = extension.replace(/[^a-z0-9]/g, '') || 'jpg';
  const randomSuffix = Math.random().toString(36).slice(2, 10);
  const filePath = `${employeeId}/${Date.now()}-${randomSuffix}.${safeExtension}`;

  const { error } = await supabase.storage
    .from(EMPLOYEE_PHOTOS_BUCKET)
    .upload(filePath, file, { upsert: true, contentType: file.type || undefined });

  if (error) {
    showToast(error.message, 'error');
    return null;
  }

  return `${EMPLOYEE_PHOTOS_BUCKET}/${filePath}`;
}

function setEmployeePhotoPreview(container, fileOrPath) {
  const previewElement = container.querySelector('#employee-photo-preview');
  const emptyElement = container.querySelector('#employee-photo-preview-empty');
  if (!previewElement || !emptyElement) {
    return;
  }

  if (photoPreviewObjectUrl) {
    URL.revokeObjectURL(photoPreviewObjectUrl);
    photoPreviewObjectUrl = null;
  }

  if (!fileOrPath) {
    previewElement.src = '';
    previewElement.classList.add('d-none');
    emptyElement.classList.remove('d-none');
    return;
  }

  if (fileOrPath instanceof File) {
    photoPreviewObjectUrl = URL.createObjectURL(fileOrPath);
    previewElement.src = photoPreviewObjectUrl;
    previewElement.classList.remove('d-none');
    emptyElement.classList.add('d-none');
    return;
  }

  const resolvedUrl = resolveEmployeePhotoUrl(fileOrPath);
  if (!resolvedUrl) {
    previewElement.src = '';
    previewElement.classList.add('d-none');
    emptyElement.classList.remove('d-none');
    return;
  }

  previewElement.src = resolvedUrl;
  previewElement.classList.remove('d-none');
  emptyElement.classList.add('d-none');
}
