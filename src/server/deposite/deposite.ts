"use server"
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

interface DepositData {
    userId: string;
    userName: string;
    userEmail: string;
    amount: number;
    date: Date;
    messName: string;
    month: string;
    secretCode: string;
}

interface DepositResult {
    success: boolean;
    data?: any;
    error?: string;
}

export const deposit = async (amount: number, user: any, month: string, secretCode: string): Promise<DepositResult> => {
    try {
        if (!amount || amount <= 0) {
            return { success: false, error: "Invalid amount" };
        }
        
        if (!user || !user._id) {
            return { success: false, error: "User information is required" };
        }
        
        if (!month) {
            return { success: false, error: "Month is required" };
        }
        
        if (!secretCode || secretCode !== user.secretCode) {
            return { success: false, error: "Invalid secret code" };
        }
        
        const depositCollection = await dbconnect("deposite");
        
        const depositData: DepositData = {
            userId: user._id.toString(),
            userName: user.Name,
            userEmail: user.email,
            amount: amount,
            date: new Date(),
            messName: user.messName,
            month: month,
            secretCode: secretCode
        };
        
        const result = await depositCollection.insertOne(depositData);
        
        return { success: true, data: result };
    } catch (error) {
        console.error("Error saving deposit:", error);
        return { success: false, error: "Failed to save deposit" };
    }
};

export const getDeposits = async () => {
    try {
        const depositCollection = await dbconnect("deposite");
        const deposits = await depositCollection.find({}).sort({ date: -1 }).toArray();
        return deposits;
    } catch (error) {
        console.error("Error fetching deposits:", error);
        throw error;
    }
};

export const getDepositsByMonth = async (month: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        const deposits = await depositCollection.find({ month: month }).sort({ date: -1 }).toArray();
        return deposits;
    } catch (error) {
        console.error("Error fetching deposits by month:", error);
        throw error;
    }
};

export const getUserDepositsByMonth = async (userId: string, month: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        const deposits = await depositCollection.find({ 
            userId: userId, 
            month: month 
        }).sort({ date: -1 }).toArray();
        return deposits;
    } catch (error) {
        console.error("Error fetching user deposits by month:", error);
        throw error;
    }
};

export const getTotalUserDeposit = async (userId: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        const result = await depositCollection.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]).toArray();
        
        return result.length > 0 ? result[0].total : 0;
    } catch (error) {
        console.error("Error calculating total deposit:", error);
        return 0;
    }
};

export const getTotalUserDepositByMonth = async (userId: string, month: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        const result = await depositCollection.aggregate([
            { $match: { userId: userId, month: month } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]).toArray();
        
        return result.length > 0 ? result[0].total : 0;
    } catch (error) {
        console.error("Error calculating total deposit by month:", error);
        return 0;
    }
};

export const updateDeposit = async (depositId: string, amount: number, secretCode: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        
        const deposit = await depositCollection.findOne({ _id: new ObjectId(depositId) });
        
        if (!deposit) {
            return { success: false, error: "Deposit not found" };
        }
        
        if (secretCode !== deposit.secretCode) {
            return { success: false, error: "Invalid secret code" };
        }
        
        const result = await depositCollection.updateOne(
            { _id: new ObjectId(depositId) },
            { $set: { amount: amount, date: new Date() } }
        );
        
        return { success: true, data: result };
    } catch (error) {
        console.error("Error updating deposit:", error);
        return { success: false, error: "Failed to update deposit" };
    }
};

export const deleteDeposit = async (depositId: string, secretCode: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        
        const deposit = await depositCollection.findOne({ _id: new ObjectId(depositId) });
        
        if (!deposit) {
            return { success: false, error: "Deposit not found" };
        }
        
        if (secretCode !== deposit.secretCode) {
            return { success: false, error: "Invalid secret code" };
        }
        
        const result = await depositCollection.deleteOne({ _id: new ObjectId(depositId) });
        
        return { success: true, data: result };
    } catch (error) {
        console.error("Error deleting deposit:", error);
        return { success: false, error: "Failed to delete deposit" };
    }
};

export const getTotalDepositsByMonth = async (month: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        const result = await depositCollection.aggregate([
            { $match: { month: month } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]).toArray();
        
        return result.length > 0 ? result[0].total : 0;
    } catch (error) {
        console.error("Error calculating total deposits by month:", error);
        return 0;
    }
};

export const getAllUserDeposits = async (userId: string) => {
    try {
        const depositCollection = await dbconnect("deposite");
        const deposits = await depositCollection.find({ userId: userId }).sort({ date: -1 }).toArray();
        return deposits;
    } catch (error) {
        console.error("Error fetching user deposits:", error);
        throw error;
    }
};