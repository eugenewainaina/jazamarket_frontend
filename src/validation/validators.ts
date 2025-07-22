export const validateName = (name: string): string => {
  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return "Name must be at least 2 characters long.";
  }

  // Check for multiple consecutive spaces
  if (/ {2,}/.test(trimmed)) {
    return "Name cannot contain multiple consecutive spaces.";
  }

  return "";
};

export const validateEmail = (email: string): string => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format.";
  }
  return "";
};

export const validatePhone = (phone: string): string => {
  if (!/^\+?[0-9]+$/.test(phone)) {
    return 'Phone number can only contain numbers and an optional leading "+".';
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (password.length < 5) {
    return "Password must be at least 5 characters long.";
  }
  if (password.length > 30) {
    return "Password cannot be more than 30 characters long.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!/[a-zA-Z]/.test(password)) {
    return "Password must contain at least one letter.";
  }
  return "";
};

export const validatePrice = (price: string): string => {
  if (!price) {
    return "Price is required.";
  }
  if (!/^\d+(\.\d{1,2})?$/.test(price)) {
    return "Price must be a valid number (e.g., 100 or 100.99).";
  }
  if (parseFloat(price) <= 0) {
    return "Price must be greater than zero.";
  }
  return "";
};

export const validateString = (
  input: string,
  fieldName: string = "Field"
): string => {
  if (!input || input.trim().length === 0) {
    return `${fieldName} is required.`;
  }
  if (input.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long.`;
  }
  return "";
};

export const validateWhatsapp = (whatsapp: string): string => {
  if (!/^[0-9]+$/.test(whatsapp)) {
    return 'WhatsApp number can only contain numbers.';
  }
  return "";
};

export const validateUsername = (username: string): string => {
  if (/\s/.test(username)) {
    return "Username cannot contain whitespace.";
  }
  return "";
};
