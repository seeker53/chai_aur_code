import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      console.log("Account creation successful:", userAccount);
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      console.log("Attempting to login with email:", email);
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("Login successful:", session);
      return session;
    } catch (error) {
      console.error("Login error:", error.message);
      console.error("Full error object:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
}

const authService = new AuthService();
export default authService;

