"use server";

import { dbconnect } from "@/lib/dbconnect";
import { Collection } from "mongodb";

export interface UserPayload {
  name?: string;
  email: string;
  accountType?: string;
  messName?: string;
  secretCode?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}



export interface LoginPayload {
  email: string;
  password: string;
}

export const postuser = async (payload: UserPayload) => {
  const { email } = payload;

  if (!email) {
    throw new Error("Email is required");
  }

  const usercollection: Collection = await dbconnect("users");

  const existuser = await usercollection.findOne({ email });

  if (existuser) {
    throw new Error("User already exists");
  }

  const result = await usercollection.insertOne(payload);

  return {
    success: true,
    insertedId: result.insertedId.toString(),
  };
};




export const loginuser = async (payload: LoginPayload) => {
  const { email, password } = payload;

  console.log(email ,password)

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
      messName:user.messName,
      accountType: user.accountType,
      secretCode:user.secretCode,
    },
  };
};