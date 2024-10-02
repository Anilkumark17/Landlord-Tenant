import { Client, Account, Databases } from "appwrite";

// Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66f958f70012fa32920f");
// Initialize services
const account = new Account(client);
const databases = new Databases(client);

const database_id = "landlord123";
const collection_id = "66fcc24f0009ed8dd3b9";
const tenent_id = "66fcd718000e407edeb1";

export { client, account, databases, database_id, collection_id, tenent_id };
