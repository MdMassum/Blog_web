import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService{   // since we have used class base authentication so if we shift from appwrite to firebase we just need some changes in class functions and not req any changes in frontend part

    client = new Client();
    account

    AuthService(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)
    }

    // creating account
    async createAccount ({email,password, name}){
        try {

            const user = await this.account.create(ID.unique(), email, password, name)

            if(user){
                this.login({email, password})
            }
            else{
                return user;
            }
        } catch (error) {
            throw error;
        }
    }

    // for login
    async login ({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            return error;
        }
    }

    // get current user status
    async getCurrentUser(){
        try {
            return await this.account.get();
            // Logged in
        } catch (err) {
            // Not logged in
            return err;
        }
        return null;
    }

    async logout(){
        try {
            // return await this.account.deleteSession('current');  // deletes one session of current user
            return await this.account.deleteSessions(); // deletes all sessions
        } catch (error) {
            console.log("Appwrite Service :: logout :: error, ",error);
        }
    }

}

const authService = new AuthService();
export default authService;


