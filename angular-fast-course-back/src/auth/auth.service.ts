import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SALT_ROUNDS, SECRET_KEY } from './constent';

@Injectable()
export class AuthService {

  constructor() {}

  /**
   * Generate hashed password
   * @param password - password to hashe
   * @returns hashed password
   */
  async getHashedPassword(password: string): Promise<string> {
    return new Promise( async (resolve, reject) => {
      try {
        const hashed = await bcrypt.hashSync(password, SALT_ROUNDS);
        resolve(hashed);
      } catch (error) {
        reject('Error: Cannot hashed password.');
      }
    });
  }

  /**
   * check password validity
   * @param password - password to check
   * @param hashedPassword - hashed password
   */
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise( async (resolve, reject) => {
      try {
        const match = await bcrypt.compare(password, hashedPassword);
        resolve(match);
      } catch (error) {
        reject('Error: Cannot compare password.');
      }
    });
  }

  async generateNewToken(payload: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await jwt.sign({data: payload}, SECRET_KEY, {expiresIn: '3h'});
        resolve(token);
      } catch (e) {
        reject('Error: Cannot generate token.');
      }
    })
  }

  async verifyToken(token: string, username): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenInfo = await jwt.verify(token, SECRET_KEY);
        const isValid = tokenInfo?.data === username;
        resolve(isValid);
      } catch (e) {
        const codeError = e.toString().split(':')[0]
        if (codeError == 'TokenExpiredError') reject(false);
        reject(false);
      }
    });
  }

  async isValidCredentials(source: string, target: string): Promise<boolean> {
    return await this.comparePassword(source, target);
  }
}
