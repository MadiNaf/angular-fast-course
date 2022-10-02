import { Injectable } from '@nestjs/common';
import { ConnectedUser, User } from 'src/model/user.model';
import UserGuards from './user-guards';
import DbHelper from 'src/db/chatdb-helper';

@Injectable()
export class UserService extends UserGuards{

  async getUsers(): Promise<User []> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM user ORDER BY id DESC;`;
        const dbUsers = await DbHelper.selectAll(query) as Array<User>;
        resolve(dbUsers)
      } catch (error) {
        reject('Error: GET all users.');
      }
    });
  }

  async getUserById(userId: number): Promise<User> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(userId)) reject('User id must be a number.');
      const users = await this.getUsers();
      const user = users.find(user => user.id === Number(userId));
      if (!user) reject('User not found.');
      resolve({...user, password: '***'});
    });
  }

  async Login(username: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      if (!this.isValidUsernmae(username) || !this.isValidPassword(password)) {
        reject('Invalid username or password.');
      }
      try {
        const users = await this.getUsers();
        const user = users.find(user => (user.username === username) && (user.password === password));
        if (!user) reject('Invalid username or password.');
        await this.addConnectedUser(user);
        resolve({...user, password: '***'});
      } catch (error) {
        reject(error);
      }
    });
  }

  async SignUp(user: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      if (!this.isValidName(user.firstname)) reject('Invalid first name.');
      if (!this.isValidName(user.lastname)) reject('Invalid last name.');
      if (!this.isValidName(user.username)) reject('Invalid username.');
      if (!this.isValidName(user.password)) reject('Weak password.');

      const users = await this.getUsers();
      if (!this.isUniqueUserName(user.username, users)) reject('This username already exist');

      try {
        const { firstname, lastname, username, password, } = user;
        const token = '';
        const query = `INSERT INTO user (firstname, lastname, username, password, token) VALUES (?, ?, ?, ?, ?);`;
        const dbRes = await DbHelper.insertOrUpdate(query, [firstname, lastname, username, password, token]);
        if (!dbRes) reject('ERROR: Sign up');
        user = { ...user, token: '' };
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
        const dbUsers = await DbHelper.selectAll(query) as Array<User>;
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
        const dbRes = await DbHelper.insertOrUpdate(query, [id?.toString(), username]);
        if (!dbRes) reject('ERROR: Sign up');
        user = { ...user, token: '' };
        resolve(true);
      } catch (error) {
        reject('Cannot add user to a session.');
      }
    });
  }
}