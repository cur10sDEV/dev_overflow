"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatDialog = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // vercel's ai sdk
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    error,
    status,
  } = useChat({ api: "/api/assistant" });

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status]);

  return (
    <div>
      {isChatOpen && (
        <Card className="fixed bottom-28 right-10 z-50 h-[650px] rounded-xl border bg-light-900 px-4 shadow-lg transition-all dark:border-gray-950 dark:bg-dark-400 md:w-[700px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-dark100_light900 text-lg">
              Hey! 👋 How can i help you?
            </CardTitle>
            <Button
              onClick={toggleChat}
              size="sm"
              variant="ghost"
              className="p-0"
            >
              <Image
                src={"/assets/icons/cross.svg"}
                width={25}
                height={25}
                alt="Close Chat"
                className="invert-colors"
              />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[450px] w-full">
              {messages.length === 0 && (
                <div className="flex h-[450px] w-full items-center justify-center gap-3 text-lg">
                  <h1 className="text-dark100_light900">No messages yet.</h1>
                </div>
              )}
              {messages.length > 0 &&
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"} w-auto`}
                  >
                    <div
                      className={`background-light700_dark300 text-dark100_light900 inline-block max-w-[600px] rounded-lg ${msg.role === "user" ? "p-4" : "px-8 py-6"}`}
                    >
                      <ReactMarkdown
                        components={{
                          code({
                            node,
                            // @ts-ignore
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                // @ts-ignore
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                          ul: ({ children }) => (
                            <ul className="m-2 ml-4 list-disc">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="m-2 ml-4 list-decimal">
                              {children}
                            </ol>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
              {status === "submitted" && (
                <div className="mb-4 w-auto text-left">
                  <div className="background-light700_dark300 text-dark100_light900 inline-block max-w-[600px] rounded-lg p-4">
                    <h1>Typing...</h1>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex h-[450px] w-full flex-col items-center justify-center gap-3 text-lg">
                  <h1 className="text-dark100_light900">An error occurred.</h1>
                  <Button
                    className="background-light800_dark300 text-dark100_light900"
                    onClick={() => reload()}
                  >
                    Retry
                  </Button>
                </div>
              )}
              <div ref={scrollRef}></div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center space-x-2"
            >
              <div
                className={`background-light800_darkgradient relative flex min-h-[56px] flex-1 grow items-center gap-4 rounded-[10px] px-4`}
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  className="paragraph-regular no-focus placeholder text-dark400_light700 flex-1 border-none bg-transparent text-base shadow-none outline-none focus:border-none"
                  placeholder="Type your message here..."
                />
              </div>
              <Button
                type="submit"
                className="background-light800_dark300 size-14 p-3"
                size="icon"
              >
                <Image
                  src={"/assets/icons/send.svg"}
                  width={40}
                  height={40}
                  alt="Close Chat"
                  className="invert-colors"
                />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
      <Button
        ref={chatIconRef}
        onClick={toggleChat}
        className="fixed bottom-10 right-10 z-50 size-14 rounded-full bg-primary-500 p-0 shadow-lg"
      >
        <Image
          src={"/assets/icons/chat.svg"}
          width={40}
          height={40}
          alt="Chat with AI"
          className="invert-colors"
        />
      </Button>
    </div>
  );
};

export default ChatDialog;
