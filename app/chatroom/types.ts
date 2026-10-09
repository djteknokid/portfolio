export interface ChatroomCharacter {
  id: string;
  name: string;
  tagline: string;
  avatar_color: string;
  avatar_initials: string;
  system_prompt: string;
  is_online: boolean;
}

export interface ChatroomMessage {
  id: number;
  room_id: string;
  sender_type: "user" | "character" | "system";
  sender_id: string;
  sender_name: string;
  content: string;
  is_background: boolean;
  created_at: string;
}

export interface ChatroomRoom {
  id: string;
  name: string;
  topic: string | null;
  mood: string | null;
  last_tick: string;
  facts: Record<string, Record<string, string>>; // facts[userId][key] = value
}

export interface OrchestratorResult {
  scores: Record<string, number>;
  responding_characters: string[];
  room_topic: string;
  room_mood: string;
  reasoning: string;
}
