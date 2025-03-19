import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ask Question | KnowledgeFlow",
};

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("sign-in");
  }
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a public question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} type="create" />
      </div>
    </div>
  );
};
export default AskQuestion;
