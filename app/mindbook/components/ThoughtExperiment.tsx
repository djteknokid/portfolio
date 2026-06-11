"use client";

import { InteractiveBlock } from "./InteractiveBlock";

type Position = {
  label: string;
  response: string;
};

type Props = {
  title: string;
  scenario: string;
  positions: Position[];
  accentColor?: string;
};

export function ThoughtExperiment({ title, scenario, positions, accentColor }: Props) {
  return (
    <InteractiveBlock
      label="Thought Experiment"
      title={title}
      scenario={scenario}
      question="What is your position?"
      options={positions}
      accentColor={accentColor}
      responseLabel="A response to your position"
    />
  );
}
