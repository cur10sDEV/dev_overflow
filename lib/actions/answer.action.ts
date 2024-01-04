"use server";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectDB();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    // add the new answer to question's answer's array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: increase the user's reputation

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectDB();

    // const {questionId, page,pageSize,sortBy} = params;
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
        select: ["_id", "name", "clerId", "picture"],
      })
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
