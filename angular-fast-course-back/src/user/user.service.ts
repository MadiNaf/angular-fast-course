import { Injectable } from '@nestjs/common';
import { ConnectedUser, User } from 'src/model/user.model';
import UserGuards from './user-guards';
import DbHelper from 'src/db/chatdb-helper';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService extends UserGuards {

  constructor(private readonly authService: AuthService) {
    super();
  }

  async getUsers(): Promise<User []> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM user ORDER BY id DESC;`;
        const dbUsers = await DbHelper.selectAll(query) as Array<User>;
        resolve(dbUsers)
      } catch (error) {
        reject('Error: unauthorized');
      }
    });
  }

  async getUserById(userId: number): Promise<User> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(userId)) reject('User id must be a number.');
      try {
        const query = `SELECT * FROM user WHERE id = ${userId}`;
        const user = await DbHelper.getOneElement(query);
        
        if (!user) reject('Error: user not found');
        resolve({...user, password: '***'});
      } catch (error) {
        reject('Error: Cannot get user');
      }
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return new Promise( async (resolve, reject) => {
      if (!this.isValidName(username)) reject('Error: Invalid username.');
      
      try {
        const query = `SELECT * FROM user WHERE username ='${username}';`;
        const user = await DbHelper.getOneElement(query);
        
        if (!user) reject('Error: user not found');
        resolve(user);
      } catch (error) {
        reject('Error: Cannot get user.');
      }
    });
  }

  async Login(username: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      if (!this.isValidUsernmae(username) || !this.isValidPassword(password)) {
        reject('Invalid username or password.');
      }
      try {
        const user = await this.getUserByUsername(username);
        if (!user) reject('Invalid username or password.');

        const isValidPwd = await this.authService.isValidCredentials(password, user.password);
        if (!isValidPwd) reject('Invalid username or password.');

        const token = user?.token;
        const query = `UPDATE user SET token ='${token}' WHERE id = ${user.id} AND username ='${user.username}';`;
        const dbRes = await DbHelper.update(query);
        if (!dbRes) reject('ERROR: Cannot login.');

        resolve({...user, password: '***'});
      } catch (error) {
        reject(error);
      }
    });
  }

  async SignUp(user: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      if (!user) reject('Error: user should not be null.')

      const { firstname, lastname, username, password, } = user;
      if (!this.isValidPassword(password)) reject('Error: Unacceptable password.')
      if (!this.isValidName(user.firstname)) reject('Error: Invalid first name.');
      if (!this.isValidName(user.lastname)) reject('Error: Invalid last name.');
      if (!this.isValidName(user.username)) reject('Error: Invalid username.');
      if (!this.isValidName(user.password)) reject('Error: Weak password.');

      const users = await this.getUsers();
      if (!this.isUniqueUserName(user.username, users)) reject('This username already exist');

      try {
        // hashe password

        const pwd = await this.authService.getHashedPassword(password);

        // Create a new toekn
        const token = await this.authService.generateNewToken(username);

        const query = `INSERT INTO user (firstname, lastname, username, password, token) VALUES (?, ?, ?, ?, ?);`;
        const dbRes = await DbHelper.insertInto(query, [firstname, lastname, username, pwd, token]);
        if (!dbRes) reject('ERROR: Sign up');
        user = { ...user, token: token };
        resolve(user)
      } catch (error) {
        reject('ERROR: Sign up.');
      }
    });
  }

  async getConnectedUsers(): Promise<ConnectedUser []> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM chat_session ORDER BY id DESC;`;
        const dbUsers = await DbHelper.selectAll(query) as Array<ConnectedUser>;
        resolve(dbUsers)
      } catch (error) {
        reject('Error: GET all chat session.');
      }
    });
  }

  async addConnectedUser(user: User): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!user) reject('Cannot create session.');
      try {
        const { id, username } = user;
        const query = `INSERT INTO chat_session (user_id, username) VALUES (?, ?);`;
        const dbRes = await DbHelper.insertInto(query, [id?.toString(), username]);
        if (!dbRes) reject('ERROR: Sign up');
        user = { ...user, token: '' };
        resolve(true);
      } catch (error) {
        reject('Cannot add user to a session.');
      }
    });
  }
}