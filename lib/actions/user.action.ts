"use server";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";

export const getAllUsers = async (params: GetAllUsersParams) => {
  try {
    connectDB();

    const { searchQuery } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.error(error);
  }
};

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

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

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

export const toggleSaveQuestion = async (params: ToggleSaveQuestionParams) => {
  try {
    connectDB();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    connectDB();

    // const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
    const { clerkId, page = 1, pageSize = 10, searchQuery } = params;

    const query: FilterQuery<typeof Question> = {};
    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Question,
      match: query,
      options: {
        sort: { createdAt: -1 },
        skip: (page - 1) * pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: ["_id", "name"] },
        {
          path: "author",
          model: User,
          select: ["_id", "name", "clerkId", "picture"],
        },
      ],
    });

    if (!user) {
      throw new Error("User not found!");
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserInfo = async (params: GetUserByIdParams) => {
  try {
    connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const noOfQuestions = await Question.find({ author: user._id });
    const noOfAnswers = await Answer.find({ author: user._id });

    return {
      user,
      noOfQuestions,
      noOfAnswers,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserQuestions = async (params: GetUserStatsParams) => {
  try {
    connectDB();

    // const { userId, page = 1, pageSize = 10 } = params;
    const { userId } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .populate({
        path: "author",
        select: "_id clerkId name picture",
      })
      .populate({
        path: "tags",
        select: "_id name",
      })
      .sort({ views: -1, upvotes: -1 });

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserAnswers = async (params: GetUserStatsParams) => {
  try {
    connectDB();

    // const { userId, page = 1, pageSize = 10 } = params;
    const { userId } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .populate({
        path: "author",
        select: "_id clerkId name picture",
      })
      .populate({
        path: "question",
        select: "_id title",
      })
      .sort({ upvotes: -1 });

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
