import { account, databases } from "../appWriteClient";
import { ID, Query } from "appwrite";
import { database_id, collection_id, tenent_id } from "../appWriteClient";

// Service function to register a new user
export const RegisterAPi = async ({ name, email, password, role }) => {
  try {
    const existingUser = await databases.listDocuments(
      database_id,
      collection_id,
      [Query.equal("email", email)]
    );

    if (existingUser.total > 0) {
      throw new Error(
        "Email is already registered. Please use a different one."
      );
    }

    const response = await account.create(ID.unique(), email, password, name);
    const userDetails = {
      name: name,
      email: email,
      role: role,
    };

    if (role === "Landlord") {
      const saveResponse = await databases.createDocument(
        database_id,
        collection_id,
        ID.unique(),
        userDetails
      );
      return { user: response, saveResponse };
    } else {
      const saveResponse = await databases.createDocument(
        database_id,
        tenent_id,
        ID.unique(),
        userDetails
      );
      return { user: response, saveResponse };
    }
  } catch (e) {
    console.error("Registration failed:", e.message);
    throw new Error(e.message);
  }
};
