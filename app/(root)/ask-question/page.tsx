import Question from "@/components/forms/Question";

type Props = {};
const AskQuestion = (props: Props) => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a public question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};
export default AskQuestion;
