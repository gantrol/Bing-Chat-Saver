// db.ts
import Dexie, { type Table, Transaction } from "dexie";
import { getUUID } from "~utils/uuid";


export interface User {
  id: string;
  name: string;
  // 1 is true, 0 is false
  login: number;
  created_time: Date;
  updated_time: Date;
}

export interface Chat {
  id: string;
  title: string;
  user_id: string;
  created_time: Date;
  updated_time: Date;
}

export interface Ref {
  index: number,
  title: string,
  href: string,
}

export interface Message {
  id: string,
  body: string,
  html?: string,
  meta?: [string],
  refs?: [Ref],
  is_bing: boolean,
  chat_id: string,
  user_id: string,
  order: number,
  created_time: Date,
}

export class ChatDB extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  chats!: Table<Chat>;
  users!: Table<User>;
  messages!: Table<Message>;

  constructor() {
    super("chatMessage");
    console.log("init");
    this.version(1.1).stores({
      messages: "id, chat_id, user_id, created_time",
      chats: "id, title, user_id, type, created_time, updated_time",
      users: "login"
    });
  }
}

export const db = new ChatDB();

db.on("populate", (tx: Transaction) => {
  // Use provided transaction to populate database with initial data
  console.log("populate");
  const firstUser = getUUID();
  const chatID = getUUID();
  tx.table("users").bulkAdd([
    { id: getUUID(), name: "Bing", login: 0, created_time: new Date(), updated_time: new Date() },
    { id: firstUser, name: "Me", login: 1, created_time: new Date(), updated_time: new Date() }
  ]);
  tx.table("chats").bulkAdd([
    { id: chatID, title: "Demo Chat auto saved", user_id: firstUser, created_time: new Date(), updated_time: new Date() },
    { id: chatID, title: "Demo Chat saved with Export", user_id: firstUser, created_time: new Date(), updated_time: new Date() }
  ]);
  tx.table("messages").bulkAdd([
    {
      id: getUUID(),
      chat_id: chatID,
      user_id: firstUser,
      created_time: new Date(),
      is_bing: true,
      order: 0,
      body: "Hello!"
    },
    { id: getUUID(), chat_id: chatID, user_id: firstUser, created_time: new Date(), is_bing: false, order: 1, body: "Hi" }
  ]);
});

