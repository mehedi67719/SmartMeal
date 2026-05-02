"use server"
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/Authoptions";

interface DeleteResult {
    acknowledged: boolean;
    deletedCount: number;
    message?: string;
}

export const deleteuser = async (email: string): Promise<DeleteResult> => {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            throw new Error("Unauthorized: Please login first");
        }

        const currentUser = session.user as any;
        const currentUserRole = currentUser?.accountType;
        const currentUserSecretCode = currentUser?.secretCode;

        if (currentUserRole !== "controller") {
            throw new Error("Access denied: Only controller can delete users");
        }

        if (!currentUserSecretCode) {
            throw new Error("Secret code not found");
        }

        const usercollection = await dbconnect("users");

        const targetUser = await usercollection.findOne({ email: email });

        if (!targetUser) {
            throw new Error("User not found");
        }

        if (targetUser.secretCode !== currentUserSecretCode) {
            throw new Error("Access denied: You can only delete users from your mess");
        }

        if (targetUser.accountType === "controller") {
            throw new Error("Cannot delete controller user");
        }

        const result = await usercollection.deleteOne({ 
            email: email, 
            secretCode: currentUserSecretCode 
        });

        if (result.deletedCount === 0) {
            throw new Error("User not found in your mess");
        }

        return {
            ...result,
            message: `User with email ${email} has been deleted successfully`
        };
    } catch (error: any) {
        console.error("Error deleting user:", error);
        throw new Error(error.message || "Failed to delete user");
    }
};