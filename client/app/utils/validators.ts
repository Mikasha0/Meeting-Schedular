export function validateName(name: string | null, field = "Name") {
  if (!name) {
    return `${field} should not be empty`;
  }
  if (name.length <= 3) {
    return "Name is too short";
  }
  if (name.length >= 30) {
    return "Name is too long";
  }
  if (/\d/.test(name)) {
    return "Name should not contain numbers";
  }
  if (/[^a-zA-Z\s]/.test(name)) {
    return "Name should not contain special characters (except for spaces)";
  }
}
export function validateLocation(location: string | null, field = "Name") {
  if (!location) {
    return `${field} should not be empty`;
  }
  if (location.length <= 3) {
    return "Name is too short";
  }
  if (location.length >= 30) {
    return "Name is too long";
  }
}

function validateEmail(email: string | null) {
  if (!email) {
    return "Email should not be empty";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return "Invalid email format";
  }
}
export function validateMeetingForm(name: string, location: string, email: string) {
  const errors: any = {};
  errors.name = validateName(name);
  errors.location = validateLocation(location);
  errors.email = validateEmail(email);

  return errors;
}
