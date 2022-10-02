import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Message, Topic } from 'src/model/chat.model';

@Injectable()
export class ChatService {

  private readonly topicDb = 'src/db/topic.json';
  private readonly messageDb = 'src/db/message.json';

  async getTopics(): Promise<Topic []> {
    return new Promise((resolve, reject) => {
      try {
        const jsonString = fs.readFileSync(this.topicDb, {encoding: 'utf-8'});
        const topics: Array<Topic> = JSON.parse(jsonString);
        resolve(topics)
      } catch (error) {
        throw reject('Cannot get topics');
      }
    });
  }

  async getTopicByUser(userId: number): Promise<Topic []> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(userId)) reject('User id must be a number.');

      const topics = await this.getTopics();
      const userTopics = topics.filter(topic => topic.userId === Number(userId));
      resolve(userTopics);
    });
  }

  async getTopicById(topicId: number): Promise<Topic> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(topicId)) reject('Topic id must be a number.');

      const topics = await this.getTopics();
      const topic = topics.find(topic => topic.id === Number(topicId));
      if (!topic) reject('Topic not found.');
      resolve(topic);
    });
  }

  async addTopic(topic: Topic): Promise<Topic []> {
    return new Promise(async (resolve, reject) => {
      if (!topic) reject('Invalid topic');
      try {
        const topics = await this.getTopics();
        topic = {
          ...topic,
          id: topics.length + 1,
          createdAt: this.geTimesTamp(),
          updatedAt: this.geTimesTamp()
        }
        topics.push(topic)
        const topicsString = JSON.stringify(topics);
        fs.writeFileSync(this.topicDb, topicsString);
        resolve(topics);
      } catch (error) {
        reject('Cannot create topic');
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
    return new Promise((resolve, reject) => {
      try {
        const jsonString = fs.readFileSync(this.messageDb, {encoding: 'utf-8'});
        const messages: Array<Message> = JSON.parse(jsonString);
        resolve(messages)
      } catch (error) {
        throw reject('Cannot get Messages');
      }
    });
  }

  async getMessagesByTopic(topicId: number): Promise<Message []> {
    return new Promise( async (resolve, reject) => {
      if (isNaN(topicId)) reject('Topic id must be a number.');
      const messages = await this.getMessages();
      const found = messages.filter(msg => msg.topicId === Number(topicId));
      resolve(found);
    });
  }

  async sendMessage(message: Message): Promise<Message []> {
    return new Promise(async (resolve, reject) => {
      if (!message) reject('Invalid messge');
      try {
        const messages = await this.getMessages();
        message = {
          ...message,
          id: messages.length + 1,
          createdAt: this.geTimesTamp(),
        }
        messages.push(message)
        const messagesString = JSON.stringify(messages);
        fs.writeFileSync(this.topicDb, messagesString);
        resolve(messages);
      } catch (error) {
        reject('Cannot create topic');
      }
    });
  }

  private geTimesTamp(): string {
    try {
      const date = new Date();
      return `${date.getTime()}`;
    } catch (error) {
      return ''; 
    }
  }
}
