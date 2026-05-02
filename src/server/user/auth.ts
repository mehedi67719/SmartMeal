"use server";

import { dbconnect } from "@/lib/dbconnect";
import { Collection } from "mongodb";

export interface UserPayload {
  Name?: string;
  email: string;
  accountType?: string;
  messName?: string;
  secretCode?: string;
  password?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const postuser = async (payload: UserPayload) => {
  const { email, accountType, messName, secretCode, password, Name } = payload;

  if (!email || !password || !Name) {
    throw new Error("Name, email and password are required");
  }

  const usercollection: Collection = await dbconnect("users");

  const existuser = await usercollection.findOne({ email });
  if (existuser) {
    throw new Error("User already exists");
  }

  if (accountType === "member") {
    if (!messName || !secretCode) {
      throw new Error("Mess name and secret code are required for members");
    }

    const messCollection: Collection = await dbconnect("users");
    const existingMess = await messCollection.findOne({ 
      messName: messName,
      secretCode: secretCode 
    });

    if (!existingMess) {
      throw new Error("Invalid mess name or secret code");
    }
  }

  if (accountType === "controller") {
    if (!messName || !secretCode) {
      throw new Error("Mess name and secret code are required");
    }

    const messCollection: Collection = await dbconnect("users");
    const existingMess = await messCollection.findOne({ messName: messName });

    if (existingMess) {
      throw new Error("Mess name already exists. Please choose a different name");
    }
  }

  const result = await usercollection.insertOne(payload);

  return {
    success: true,
    insertedId: result.insertedId.toString(),
  };
};

export const massname = async (): Promise<string[]> => {
  try {
    const usercollection: Collection = await dbconnect("users");
    
    const result = await usercollection.aggregate([
      {
        $match: {
          messName: { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$messName"
        }
      },
      {
        $project: {
          _id: 0,
          messName: "$_id"
        }
      }
    ]).toArray();
    
    const messNames = result.map(item => item.messName);
    
    console.log("Fetched mess names:", messNames);
    
    return messNames;
  } catch (error) {
    console.log("Error in massname:", error);
    return [];
  }
};

export const loginuser = async (payload: LoginPayload) => {
  const { email, password } = payload;

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  const usercollection: Collection = await dbconnect("users");
  const user = await usercollection.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid password",
    };
  }

  return {
    success: true,
    user: {
      id: user._id.toString(),
      name: user.Name,
      email: user.email,
      messName: user.messName,
      accountType: user.accountType,
      secretCode: user.secretCode,
    },
  };
};