const STORAGE_KEY = 'perfil-usuario-webapp';

const defaultProfile = {
  name: 'María Fernanda López',
  role: 'Diseñadora de producto & estratega digital',
  bio: 'Me especializo en crear experiencias intuitivas, accesibles y medibles para productos web y móviles. Trabajo conectando diseño, negocio y tecnología.',
  location: 'Bogotá, Colombia',
};

const elements = {
  name: document.querySelector('#profile-name'),
  role: document.querySelector('#profile-role'),
  bio: document.querySelector('#profile-bio'),
  location: document.querySelector('#profile-location'),
  editButton: document.querySelector('#edit-profile'),
  resetButton: document.querySelector('#reset-profile'),
  dialog: document.querySelector('#profile-dialog'),
  form: document.querySelector('#profile-form'),
  cancelButton: document.querySelector('#cancel-dialog'),
};

const readProfile = () => {
  const savedProfile = window.localStorage.getItem(STORAGE_KEY);
  if (!savedProfile) return defaultProfile;

  try {
    return { ...defaultProfile, ...JSON.parse(savedProfile) };
  } catch {
    return defaultProfile;
  }
};

const writeProfile = (profile) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

const renderProfile = (profile) => {
  elements.name.textContent = profile.name;
  elements.role.textContent = profile.role;
  elements.bio.textContent = profile.bio;
  elements.location.textContent = profile.location;
};

const fillForm = (profile) => {
  elements.form.elements.name.value = profile.name;
  elements.form.elements.role.value = profile.role;
  elements.form.elements.bio.value = profile.bio;
  elements.form.elements.location.value = profile.location;
};

const openDialog = () => {
  const profile = readProfile();
  fillForm(profile);
  elements.dialog.showModal();
};

const closeDialog = () => {
  elements.dialog.close();
};

elements.editButton.addEventListener('click', openDialog);
elements.cancelButton.addEventListener('click', closeDialog);
elements.resetButton.addEventListener('click', () => {
  writeProfile(defaultProfile);
  renderProfile(defaultProfile);
});

elements.form.addEventListener('submit', (event) => {
  event.preventDefault();

  const profile = {
    name: elements.form.elements.name.value.trim(),
    role: elements.form.elements.role.value.trim(),
    bio: elements.form.elements.bio.value.trim(),
    location: elements.form.elements.location.value.trim(),
  };

  writeProfile(profile);
  renderProfile(profile);
  closeDialog();
});

renderProfile(readProfile());
