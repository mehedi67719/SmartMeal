"use server"
import { dbconnect } from "@/lib/dbconnect";

interface UpdateResult {
    acknowledged: boolean;
    modifiedCount: number;
    matchedCount: number;
    upsertedCount: number;
}

export const updaterole = async (role: string, email: string): Promise<UpdateResult> => {
    try {
        const usercollection = await dbconnect("users");
        const result = await usercollection.updateOne(
            { email: email },
            { $set: { accountType: role } }
        );
        return result;
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
};