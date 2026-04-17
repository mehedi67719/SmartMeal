"use server"
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

interface DeleteResult {
    acknowledged: boolean;
    deletedCount: number;
}

export const deleteuser = async (email: string): Promise<DeleteResult> => {
    try {
        const usercollection = await dbconnect("users");
        const result = await usercollection.deleteOne({ email: email });
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};