import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Profile | KnowledgeFlow",
};

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("sign-in");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <>
      <h1 className="h1-bold text-dark400_light900">Edit Question</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};
export default page;
