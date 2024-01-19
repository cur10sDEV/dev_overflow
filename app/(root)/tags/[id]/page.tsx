import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    q: string;
  };
}

const page = async ({ params, searchParams }: Props) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    pageSize: 10,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          icon="/assets/icons/search.svg"
          placeholder="Search tag questions..."
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((item: any) => {
            return (
              <QuestionCard
                key={item._id}
                _id={item._id}
                title={item.title}
                tags={item.tags}
                author={item.author}
                upvotes={item.upvotes}
                views={item.views}
                answers={item.answers}
                createdAt={item.createdAt}
              />
            );
          })
        ) : (
          <NoResult
            title="There's no tag questions to show"
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
};
export default page;
