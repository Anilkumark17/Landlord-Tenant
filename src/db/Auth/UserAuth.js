import { ID } from "appwrite";
import { account } from "../appWriteClient";

// Service function to register a new user
export const registerUser = async (name, email, password) => {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const LoginUser = async (email, password) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return response;
  } catch (error) {
    console.error(error.message);
  }
};




// Service function to log out the current user session
export const logoutUser = async () => {
  try {
    const response = await account.deleteSession('current'); // Deletes the current session
    return response;
  } catch (error) {
    console.error('Logout failed:', error.message);
  }
};