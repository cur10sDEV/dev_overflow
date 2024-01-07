"use server";

import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import { connectDB } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    connectDB();

    const { questionId, userId } = params;

    // update view count for the question
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      // if user has already viewed the question simply return
      if (existingInteraction) {
        return;
      }

      // otherwise create an interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
