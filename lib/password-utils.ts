// Client-side password utilities (no server dependencies)

export interface PasswordStrength {
  score: number; // 0-100
  level: "weak" | "fair" | "good" | "strong";
  feedback: string[];
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length < 8) feedback.push("Password should be at least 8 characters");

  // Uppercase letters
  if (/[A-Z]/.test(password)) score += 15;
  else feedback.push("Add uppercase letters");

  // Lowercase letters
  if (/[a-z]/.test(password)) score += 15;
  else feedback.push("Add lowercase letters");

  // Numbers
  if (/\d/.test(password)) score += 15;
  else feedback.push("Add numbers");

  // Special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 20;
  else feedback.push("Add special characters");

  // Determine level
  let level: "weak" | "fair" | "good" | "strong";
  if (score < 30) level = "weak";
  else if (score < 60) level = "fair";
  else if (score < 85) level = "good";
  else level = "strong";

  return {
    score: Math.min(score, 100),
    level,
    feedback,
  };
}

export function generateStrongPassword(length: number = 16): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}';:,.<>?/";
  
  const allChars = uppercase + lowercase + numbers + special;
  let password = "";
  
  // Ensure password has at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split("").sort(() => Math.random() - 0.5).join("");
}
