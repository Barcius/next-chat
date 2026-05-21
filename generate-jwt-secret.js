import fs from 'fs';
import crypto from 'crypto';

const ENV_FILE = '.env';
const KEY_NAME = 'JWT_SECRET';
const SECRET_LENGTH = 32; // 32 bytes = 256 bits (Minimum for HS256)

function generateAndSaveSecret() {
  // Generate secure random string
  const newSecret = crypto.randomBytes(SECRET_LENGTH).toString('hex');
  const newLine = `${KEY_NAME}="${newSecret}"`;

  let fileContent = '';

  // Read existing file content if it exists
  try {
    fileContent = fs.readFileSync(ENV_FILE, 'utf8');
  } catch (e) {
    console.log(`ℹ️  .env file will be created`);
  }

  const regex = new RegExp(`^${KEY_NAME}=.*$`, 'm');

  if (regex.test(fileContent)) {
    // Replace existing key
    fileContent = fileContent.replace(regex, newLine);
    console.log(`✅ Updated existing ${KEY_NAME} in ${ENV_FILE}`);
  } else {
    // Append new key to the file
    fileContent = fileContent.trim() ? `${fileContent.trim()}\n${newLine}\n` : `${newLine}\n`;
    console.log(`✅ Added new ${KEY_NAME} to ${ENV_FILE}`);
  }

  // Write changes back to the file
  fs.writeFileSync(ENV_FILE, fileContent);
}

generateAndSaveSecret();
