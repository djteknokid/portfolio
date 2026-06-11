"use client";

import { InteractiveBlock } from "./InteractiveBlock";

type Option = {
  label: string;
  response: string;
};

type Props = {
  question: string;
  options: Option[];
  accentColor?: string;
};

export function ReflectionPause({ question, options, accentColor }: Props) {
  return (
    <InteractiveBlock
      label="Reflection Pause"
      question={question}
      options={options}
      accentColor={accentColor}
    />
  );
}
