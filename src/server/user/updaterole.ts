"use server"
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/Authoptions";

interface UpdateResult {
    acknowledged: boolean;
    modifiedCount: number;
    matchedCount: number;
    upsertedCount: number;
    message?: string;
}

export const updaterole = async (role: string, email: string): Promise<UpdateResult> => {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            throw new Error("Unauthorized: Please login first");
        }

        const currentUser = session.user as any;
        const currentUserRole = currentUser?.accountType;
        const currentUserSecretCode = currentUser?.secretCode;

        if (currentUserRole !== "controller") {
            throw new Error("Access denied: Only controller can update user roles");
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
            throw new Error("Access denied: You can only update users from your mess");
        }

        if (role !== "controller" && role !== "manager" && role !== "member") {
            throw new Error("Invalid role. Role must be controller, manager, or member");
        }

        const result = await usercollection.updateOne(
            { email: email, secretCode: currentUserSecretCode },
            { $set: { accountType: role } }
        );

        if (result.matchedCount === 0) {
            throw new Error("User not found in your mess");
        }

        return {
            ...result,
            message: `User role updated to ${role} successfully`
        };
    } catch (error: any) {
        console.error("Error updating role:", error);
        throw new Error(error.message || "Failed to update role");
    }
};