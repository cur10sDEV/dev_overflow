"use server";

import User from "@/database/user.model";
import { connectDB } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export const getTopInteractedTags = async (
  params: GetTopInteractedTagsParams
) => {
  try {
    connectDB();

    // const { userId, limit = 3 } = params;
    const { userId } = params;

    const user = await User.findById({ _id: userId });

    if (!user) throw new Error("User not found!");

    // find interactions for the user and group by tags...
    // Interaction

    return [
      {
        _id: 1,
        name: "Science",
        totalQuestions: 20,
        showCount: true,
      },
      {
        _id: 2,
        name: "History",
        totalQuestions: 15,
        showCount: false,
      },
      {
        _id: 3,
        name: "Mathematics",
        showCount: true,
      },
    ];
  } catch (error) {
    console.error(error);
  }
};
