import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sqlite3 from 'sqlite3';
import initChatDataBase from './db/chatdb-config';

const dbname = 'src/db/chatdb.db'; 
const db = new sqlite3.Database(dbname);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
initChatDataBase();

export { db };