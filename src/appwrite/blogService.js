import config from "../config/config"
import { Client, ID, Databases, Storage  } from "appwrite"

export class Service {

    client = new Client();
    database;
    storage

    Service(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }   

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // or we can take ID.unique()
                {
                    title,content,featuredImage,status,userId
                },
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error, ",error);
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}){

        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,content,featuredImage,status,userId
                },
            )
        } catch (error) {
            console.log("Appwrite Service :: UpdatePost :: error, ",error);
        }
    }
    async deletePost(slug){

        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: DeletePost :: error, ",error);
            return false;
        }
    }
    async getPost(slug){

        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error, ",error);
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){

        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getAllPost :: error, ",error);
        }
    }

    // upload file service -->
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteUrlBucketId,
                ID.userId(),
                file

            )
        } catch (error) {
            console.log("Appwrite Service :: UploadFile :: error, ",error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteUrlBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: DeleteFile :: error, ",error);
            return false;
        }
    }
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteUrlBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;
