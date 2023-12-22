import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How to use TypeScript with React?",
    tags: [
      { _id: 1, name: "typescript" },
      { _id: 2, name: "react" },
    ],
    author: {
      _id: "user1",
      name: "John Doe",
      picture: "https://example.com/john-doe.jpg",
    },
    upvotes: 10,
    views: 100,
    answers: [
      { text: "You can use the `tsx` file extension for TypeScript in React." },
      { text: "Make sure to install the @types/react package." },
    ],
    createdAt: new Date("2023-01-14T12:00:00Z"),
  },
  {
    _id: "2",
    title: "Best practices for unit testing in Angular",
    tags: [
      { _id: 3, name: "angular" },
      { _id: 4, name: "testing" },
    ],
    author: {
      _id: "user2",
      name: "Jane Smith",
      picture: "https://example.com/jane-smith.jpg",
    },
    upvotes: 15,
    views: 120,
    answers: [
      { text: "Use Jasmine for testing Angular components." },
      { text: "Mock services using TestBed.configureTestingModule." },
    ],
    createdAt: new Date("2023-12-01T10:30:00Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] p-3 !text-light-900">
            Ask a question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          icon="/assets/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((item) => {
            return <QuestionCard key={item._id} {...item} />;
          })
        ) : (
          <NoResult
            title="There's no questions to show"
            description="Be the first to break the silence! 🚀 Ask a question and kickstart the
        discussion. Our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
