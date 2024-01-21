"use server";

import Question from "@/database/question.model";
import Tag, { TagInterface } from "@/database/tag.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectDB } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";

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
    throw error;
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectDB();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof Tag> = {};

    const skipAmount = (page - 1) * pageSize;

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestionsByTagId = async (
  params: GetQuestionsByTagIdParams
) => {
  try {
    connectDB();

    const { tagId, searchQuery, page = 1, pageSize = 10 } = params;

    const tagFilter: FilterQuery<TagInterface> = { _id: tagId };

    const skipAmount = (page - 1) * pageSize;

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize,
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

    if (!tag) {
      throw new Error("Tag not found");
    }

    const totalTagQuestions = await Tag.findOne(tagFilter);

    const isNext =
      totalTagQuestions.questions.length > skipAmount + tag.questions.length;

    return { tagTitle: tag.name, questions: tag.questions, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTopPopularTags = async () => {
  try {
    connectDB();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, noOfQuestions: { $size: "$questions" } } },
      { $sort: { noOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
