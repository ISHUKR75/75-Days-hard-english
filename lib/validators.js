/**
 * Form Validators - Input validation functions for the app
 */

import { normalizeAnswer } from './utils.js';

/**
 * Validate a user's answer against the correct answer and optional alternatives
 * @param {string} userAnswer - The user's typed/selected answer
 * @param {string} correctAnswer - The expected correct answer
 * @param {string[]} [alternatives=[]] - Acceptable alternative answers
 * @returns {{ isCorrect: boolean, normalized: string }}
 */
export function validateAnswer(userAnswer, correctAnswer, alternatives = []) {
  if (!userAnswer || !correctAnswer) return { isCorrect: false, normalized: '' };

  const normalized = normalizeAnswer(userAnswer);
  const correct = normalizeAnswer(correctAnswer);
  const alts = alternatives.map(normalizeAnswer);

  const isCorrect = normalized === correct || alts.includes(normalized);
  return { isCorrect, normalized };
}

/**
 * Validate an email address
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, message: 'Email is required.' };
  }
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validate a display name
 * @param {string} name
 * @returns {{ valid: boolean, message: string }}
 */
export function isValidName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, message: 'Name is required.' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' };
  }
  if (trimmed.length > 50) {
    return { valid: false, message: 'Name must be 50 characters or fewer.' };
  }
  if (!/^[\w\s\u0900-\u097F'-]+$/.test(trimmed)) {
    return { valid: false, message: 'Name contains invalid characters.' };
  }
  return { valid: true, message: '' };
}

/**
 * Check that a value is not empty
 * @param {*} value
 * @param {string} [fieldName='Field']
 * @returns {{ valid: boolean, message: string }}
 */
export function isNotEmpty(value, fieldName = 'Field') {
  const isEmpty =
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0);

  return isEmpty
    ? { valid: false, message: `${fieldName} is required.` }
    : { valid: true, message: '' };
}

/**
 * Validate a password (min 8 chars, must contain letter and number)
 * @param {string} password
 * @returns {{ valid: boolean, message: string, strength: 'weak'|'medium'|'strong' }}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required.', strength: 'weak' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.', strength: 'weak' };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one letter.', strength: 'weak' };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number.', strength: 'weak' };
  }

  // Determine strength
  let strength = 'medium';
  if (password.length >= 12 && /[!@#$%^&*]/.test(password) && /[A-Z]/.test(password)) {
    strength = 'strong';
  }

  return { valid: true, message: '', strength };
}

/**
 * Validate that two passwords match (confirm password)
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePasswordMatch(password, confirmPassword) {
  if (password !== confirmPassword) {
    return { valid: false, message: 'Passwords do not match.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validate a search query (min length, max length)
 * @param {string} query
 * @param {number} [minLength=2]
 * @param {number} [maxLength=100]
 * @returns {{ valid: boolean, message: string }}
 */
export function validateSearchQuery(query, minLength = 2, maxLength = 100) {
  if (!query || query.trim().length < minLength) {
    return { valid: false, message: `Search query must be at least ${minLength} characters.` };
  }
  if (query.trim().length > maxLength) {
    return { valid: false, message: `Search query must be ${maxLength} characters or fewer.` };
  }
  return { valid: true, message: '' };
}
