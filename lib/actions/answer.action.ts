"use server";
import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { connectDB } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";

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
