import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(
  { params }: ParamsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const { question } = await getQuestionById({ questionId: params.id });

  return {
    title: `${question.title} | KnowledgeFlow`,
  };
}

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("sign-in");
  }

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark400_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(result.question)}
        />
      </div>
    </>
  );
};
export default page;
