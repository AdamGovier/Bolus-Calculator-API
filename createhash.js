// Node createHash.js // create a password for an admin user.

import bcrypt from "bcrypt";
import promptSync from 'prompt-sync';

const prompt = promptSync();

const password = prompt("Enter password to hash:");

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt);

console.log(hashedPassword);