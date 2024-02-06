"use client";

import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  downvotes,
  hasdownVoted,
  hasSaved,
  hasupVoted,
  itemId,
  upvotes,
  userId,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSave = async () => {
    if (!userId) {
      return;
    }

    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });

    hasSaved
      ? toast.error("Removed from your collection")
      : toast.success("Saved in your collection");
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast("Please Log In", {
        description: "You must be logged in to perform this action",
      });
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          hasdownVoted,
          hasupVoted,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          hasdownVoted,
          hasupVoted,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      }

      hasupVoted
        ? toast.error("Upvote Removed")
        : toast.success("Upvote Sucessfull");
      return;
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          hasdownVoted,
          hasupVoted,
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          hasdownVoted,
          hasupVoted,
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          path: pathname,
        });
      }

      hasdownVoted
        ? toast.error("Downvote Removed")
        : toast.success("Downvote Sucessfull");
    }
  };

  useEffect(() => {
    viewQuestion({
      userId: userId ? JSON.parse(userId) : undefined,
      questionId: JSON.parse(itemId),
    });
  }, [pathname, router, userId, itemId]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* upvotes */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasupVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            alt="upvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        {/* downvotes */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasdownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            alt="downvote"
            width={18}
            height={18}
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="saved"
          width={18}
          height={18}
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};
export default Votes;
