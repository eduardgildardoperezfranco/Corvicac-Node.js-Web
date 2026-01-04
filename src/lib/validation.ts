/**
 * Validation utilities to prevent common syntax errors
 */

/**
 * Validates if a string is properly quoted
 * @param str The string to validate
 * @returns A properly quoted string
 */
export function ensureQuotedString(str: string): string {
  // If the string is already properly quoted, return as is
  if ((str.startsWith('"') && str.endsWith('"')) || 
      (str.startsWith("'") && str.endsWith("'"))) {
    return str;
  }

  // Otherwise, wrap it in single quotes
  return `'${str}'`;
}

/**
 * Validates and fixes common JSON syntax issues
 * @param jsonString The JSON string to validate
 * @returns A valid JSON string
 */
export function validateAndFixJSON(jsonString: string): string {
  try {
    // Try to parse the JSON
    JSON.parse(jsonString);
    return jsonString; // If it parses successfully, return as is
  } catch (error) {
    // If there's an error, try to fix common issues
    let fixedJSON = jsonString;

    // Fix missing quotes around property names
    fixedJSON = fixedJSON.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');

    // Fix missing quotes around string values
    fixedJSON = fixedJSON.replace(/:\s*([a-zA-Z][a-zA-Z0-9\s,\.]*)(?=[,}])/g, ': "$1"');

    // Fix trailing commas
    fixedJSON = fixedJSON.replace(/,(\s*[}\]])/g, '$1');

    // Try to parse the fixed JSON
    try {
      JSON.parse(fixedJSON);
      return fixedJSON;
    } catch (secondError) {
      // If it still fails, throw the original error
      throw error;
    }
  }
}

/**
 * Validates URL format
 * @param url The URL to validate
 * @returns A valid URL string
 */
export function validateURL(url: string): string {
  if (!url) return '';

  // If the URL doesn't start with http:// or https://, add https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
}

/**
 * Validates email format
 * @param email The email to validate
 * @returns A valid email string or empty string if invalid
 */
export function validateEmail(email: string): string {
  if (!email) return '';

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return email;
  }

  return '';
}

/**
 * Validates phone number format
 * @param phone The phone number to validate
 * @returns A valid phone number string or empty string if invalid
 */
export function validatePhone(phone: string): string {
  if (!phone) return '';

  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // Check if it has a reasonable number of digits (7-15)
  if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
    // If it doesn't start with +, add it
    if (!phone.startsWith('+')) {
      return `+${digitsOnly}`;
    }
    return phone;
  }

  return '';
}
