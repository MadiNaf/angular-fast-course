import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import DbHelper from 'src/db/chatdb-helper';
import { Message, Topic } from 'src/model/chat.model';

@Injectable()
export class ChatService {

  private readonly topicDb = 'src/db/topic.json';
  private readonly messageDb = 'src/db/message.json';

  async getTopics(): Promise<Topic []> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM topic ORDER BY id DESC;`;
        const topics = await DbHelper.selectAll(query) as Array<Topic>;
        resolve(topics)
      } catch (error) {
        reject('Error: Can not get topics.');
      }
    });
  }

  async getTopicByUser(userId: number): Promise<Topic []> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(userId)) reject('User id must be a number.');
      try {        
        const query = `SELECT * FROM topic WHERE user_id = ${userId} ORDER BY id DESC`;
        const topics = await DbHelper.selectAll(query) as Array<Topic>;
        resolve(topics);
      } catch (error) {
        reject('Error: Can not get topics');
      }
    });
  }

  async getTopicById(topicId: number): Promise<Topic> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(topicId)) reject('Topic id must be a number.');
      try {
        const query = `SELECT * FROM topic WHERE id = ${topicId}`
        const topic = await DbHelper.getOneElement(query);
        if (!topic) reject('Error: Topic not found');
        resolve(topic);
      } catch (error) {
        reject('Error: Can not get topics')
      }
    });
  }

  async addTopic(topic: Topic): Promise<Topic []> {
    return new Promise(async (resolve, reject) => {
      if (!topic) reject('Invalid topic');
      try {
        const { userId, title, author } = topic;
        const createdAt = this.geTimesTamp();
        const updatedAt = createdAt;
        const query = `INSERT INTO topic (user_id, title, author, creatAt, updatedAt) VALUES (?, ?, ?, ?, ?);`;
        const dbRes = await DbHelper.insertInto(query, [userId.toString(), title, author, createdAt, updatedAt]);
        resolve(dbRes);
      } catch (error) {
        reject('Error: Cannot create topic');
      }
    });
  }

  async updateTopic(topicId: number, topic: Topic): Promise<Topic> {
    return new Promise(async (resolve, reject) => {
      if (isNaN(topicId)) reject('Topic id must be a number.');
      try {
        let topicToUpdate = await this.getTopicById(topicId);
        if (!topicToUpdate) reject('Topic not found');
        topicToUpdate = {...topic, updatedAt: this.geTimesTamp()};

        const topics = await this.getTopics();
        const index = topics.indexOf(topicToUpdate);
        if (index < 0) reject('Topic not found');
        topics[index] = topicToUpdate;
        const topicsString = JSON.stringify(topics);
        fs.writeFileSync(this.topicDb, topicsString);
        resolve(topic);
      } catch (error) {
        reject('Cannot update topic');
      }
    });
  }

  async delteTopic(topicId: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (isNaN(topicId)) reject('Topic id must be a number.');
      try {
        let topicToDelete = await this.getTopicById(topicId);
        if (!topicToDelete) reject('Topic not found');

        const topics = await this.getTopics();
        const index = topics.indexOf(topicToDelete);
        if (index < 0) reject('Topic not found');
        topics.splice(index, 1);
        const topicsString = JSON.stringify(topics);
        fs.writeFileSync(this.topicDb, topicsString);
        resolve(true);
      } catch (error) {
        reject('Cannot update topic');
      }
    });
  }
  
  async getMessages(): Promise<Message []> {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM message ORDER BY id DESC;`;
        const messages = await DbHelper.selectAll(query) as Array<Message>;
        resolve(messages)
      } catch (error) {
        reject('Error: Can not get messages.');
      }
    });
  }

  async getMessagesByTopic(topicId: number): Promise<Message []> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(topicId)) reject('Topic id must be a number.');
      try {
        const query = `SELECT * FROM message WHERE id  = ${topicId} ORDER BY id DESC;`;
        const messages = await DbHelper.selectAll(query) as Array<Message>;
        resolve(messages)
      } catch (error) {
        reject('Error: Can not get messages.');
      }
    });
  }

  async sendMessage(message: Message): Promise<Message []> {
    return new Promise(async (resolve, reject) => {  
      if (!message) reject('Invalid messge');
      try {
        const { userId, topicId,content, author} = message;
        const createdAt = this.geTimesTamp();
        const query = `INSERT INTO message (user_id, topic_id, content, author, createdAt) VALUES (?, ?, ?, ?, ?)`;
        const dbRes = await DbHelper.insertInto(query, [userId.toString(), topicId.toString(),content, author, createdAt]);
        resolve(dbRes);
      } catch (error) {
        reject('Cannot create topic');
      }
    });
  }

  private geTimesTamp(): string {
    try {
      return new Date().getTime().toString();
    } catch (error) {
      return ''; 
    }
  }
}