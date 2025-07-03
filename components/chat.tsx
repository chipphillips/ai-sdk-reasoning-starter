"use client";

import cn from "classnames";
import { toast } from "sonner";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { Messages } from "./messages";
import { modelID, models } from "@/lib/models";
import { Footnote } from "./footnote";
import {
  ArrowUpIcon,
  CheckedSquare,
  ChevronDownIcon,
  StopIcon,
  UncheckedSquare,
} from "./icons";
import { Input } from "./input";

export function Chat() {
  const [input, setInput] = useState<string>("");
  const [selectedModelId, setSelectedModelId] = useState<modelID>("sonnet-3.7");
  const [isReasoningEnabled, setIsReasoningEnabled] = useState<boolean>(true);

  const { messages, append, status, stop } = useChat({
    id: "primary",
    onError: () => {
      toast.error("An error occurred, please try again!");
    },
  });

  const isGeneratingResponse = ["streaming", "submitted"].includes(status);

  return (
    <div
      className={cn(
        "px-4 md:px-0 pb-4 pt-8 flex flex-col h-dvh items-center w-full max-w-3xl",
        {
          "justify-between": messages.length > 0,
          "justify-center gap-4": messages.length === 0,
        },
      )}
    >
      {messages.length > 0 ? (
        <Messages messages={messages} status={status} />
      ) : (
        <div className="flex flex-col gap-0.5 sm:text-2xl text-xl w-full text-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="text-american-navy dark:text-american-white font-semibold">Welcome to the AI SDK Reasoning Preview.</div>
          </div>
          <div className="text-american-charcoal/70 dark:text-slate-400">
            What would you like me to think about today?
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        <div className="w-full relative p-3 bg-american-cream dark:bg-slate-800 rounded-2xl flex flex-col gap-1 border border-american-silver dark:border-slate-600 shadow-american">
          <Input
            input={input}
            setInput={setInput}
            selectedModelId={selectedModelId}
            isGeneratingResponse={isGeneratingResponse}
            isReasoningEnabled={isReasoningEnabled}
          />

          <div className="absolute bottom-2.5 left-2.5">
            <button
              disabled={selectedModelId !== "sonnet-3.7"}
              className={cn(
                "relative w-fit text-sm p-1.5 rounded-lg flex flex-row items-center gap-2 hover:bg-american-silver dark:hover:bg-slate-600 cursor-pointer disabled:opacity-50 transition-colors",
                {
                  "bg-american-silver dark:bg-slate-600": isReasoningEnabled,
                },
              )}
              onClick={() => {
                setIsReasoningEnabled(!isReasoningEnabled);
              }}
            >
              {isReasoningEnabled ? <CheckedSquare /> : <UncheckedSquare />}
              <div className="text-american-charcoal dark:text-american-white">Reasoning</div>
            </button>
          </div>

          <div className="absolute bottom-2.5 right-2.5 flex flex-row gap-2">
            <div className="relative w-fit text-sm p-1.5 rounded-lg flex flex-row items-center gap-0.5 hover:bg-american-silver dark:hover:bg-slate-700 cursor-pointer transition-colors">
              {/* <div>
                {selectedModel ? selectedModel.name : "Models Unavailable!"}
              </div> */}
              <div className="flex justify-center items-center text-american-charcoal/70 dark:text-slate-400 px-1">
                <span className="pr-1">{models[selectedModelId]}</span>
                <ChevronDownIcon />
              </div>

              <select
                className="absolute opacity-0 w-full p-1 left-0 cursor-pointer"
                value={selectedModelId}
                onChange={(event) => {
                  if (event.target.value !== "sonnet-3.7") {
                    setIsReasoningEnabled(true);
                  }
                  setSelectedModelId(event.target.value as modelID);
                }}
              >
                {Object.entries(models).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={cn(
                "size-8 flex flex-row justify-center items-center bg-american-navy dark:bg-american-white text-american-white dark:text-american-navy p-1.5 rounded-full hover:bg-american-red dark:hover:bg-american-silver hover:scale-105 active:scale-95 transition-all shadow-american",
                {
                  "bg-american-silver dark:bg-slate-600 text-american-charcoal dark:text-slate-400":
                    isGeneratingResponse || input === "",
                },
              )}
              onClick={() => {
                if (input === "") {
                  return;
                }

                if (isGeneratingResponse) {
                  stop();
                } else {
                  append({
                    role: "user",
                    content: input,
                    createdAt: new Date(),
                  });
                }

                setInput("");
              }}
            >
              {isGeneratingResponse ? <StopIcon /> : <ArrowUpIcon />}
            </button>
          </div>
        </div>

        <Footnote />
      </div>
    </div>
  );
}
