"use server";

import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserParams) => {
  try {
    connectDB();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectDB();

    const { clerkId, updateData, path } = params;

    await User.findByIdAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectDB();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found!");
    }

    // TODO: - delete all user's actions - questions, answers, comments, etc

    // delete questions
    // const questionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    await Question.deleteMany({ author: user._id });

    // delete user's answers comments and more

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
