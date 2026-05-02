"use server";
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/Authoptions";

interface User {
  _id: string;
  Name: string;
  email: string;
  accountType: string;
  messName: string;
  secretCode: string;
  password: string;
}

interface ApiResponse<T> {
  status: number;
  data: T;
  success: boolean;
  message?: string;
}

export const alluser = async (): Promise<ApiResponse<User[]>> => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return {
        status: 401,
        data: [],
        success: false,
        message: "Unauthorized"
      };
    }

    const userSecretCode = (session.user as any)?.secretCode;
    
    if (!userSecretCode) {
      return {
        status: 401,
        data: [],
        success: false,
        message: "Secret code not found"
      };
    }

    const usercollection = await dbconnect("users");

    const users = await usercollection.find({ 
      secretCode: userSecretCode 
    }).toArray();

    const serializedUsers: User[] = users.map(user => ({
      _id: user._id.toString(),
      Name: user.Name || "",
      email: user.email || "",
      accountType: user.accountType || "member",
      messName: user.messName || "",
      secretCode: user.secretCode || "",
      password: user.password || ""
    }));

    return {
      status: 200,
      data: serializedUsers,
      success: true,
      message: "Users fetched successfully"
    };
  } catch (error) {
    console.error("Error fetching users:", error);

    return {
      status: 500,
      data: [],
      success: false,
      message: "Failed to fetch users",
    };
  }
};