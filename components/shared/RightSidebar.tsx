import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const questions = [
  {
    _id: 1,
    url: "",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    _id: 2,
    url: "",
    title: "Is it me or the font is bolder than necessary?",
  },
  {
    _id: 3,
    url: "",
    title: "Can i get the course for free?",
  },
  {
    _id: 4,
    url: "",
    title: "Redux Toolkit not updating the state as Expected",
  },
  {
    _id: 5,
    url: "",
    title: "How to ask a question?",
  },
];

const tags = [
  { _id: 1, name: "nextjs", totalQuestions: 26 },
  { _id: 2, name: "test", totalQuestions: 18 },
  { _id: 3, name: "react", totalQuestions: 17 },
  { _id: 4, name: "css", totalQuestions: 12 },
  { _id: 5, name: "next js", totalQuestions: 9 },
];

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {questions.map((question) => {
            return (
              <Link
                key={question._id}
                className="flex cursor-pointer items-center justify-between gap-7"
                href={`/questions/${question._id}`}
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron right icon"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {tags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default RightSidebar;
