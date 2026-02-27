import { Topic } from "@/data/studyData";
import { z } from "zod";
import { sanitizeInput } from "./utils";

// Schema for validating imported topic data
const TopicSchema = z.object({
  name: z.string().min(1),
  items: z.array(z.object({
    term: z.string(),
    definition: z.string(),
    options: z.array(z.string()).optional(),
    category: z.string().optional()
  }))
});

/**
 * Encodes a topic object into a base64 string for easy sharing.
 */
export const encodeTopic = (topic: Topic): string => {
  try {
    const json = JSON.stringify(topic);
    return btoa(unescape(encodeURIComponent(json)));
  } catch (e) {
    console.error("Failed to encode topic", e);
    return "";
  }
};

/**
 * Decodes a base64 string back into a topic object with validation and sanitization.
 */
export const decodeTopic = (code: string): Topic | null => {
  try {
    const json = decodeURIComponent(escape(atob(code)));
    const parsed = JSON.parse(json);
    
    // Validate the structure using Zod
    const validated = TopicSchema.parse(parsed);

    // Return sanitized topic
    return {
      id: `imported_${Date.now()}`,
      name: sanitizeInput(validated.name),
      items: validated.items.map(item => ({
        term: sanitizeInput(item.term),
        definition: sanitizeInput(item.definition),
        options: item.options?.map(sanitizeInput) || ["", "", ""],
        category: item.category ? sanitizeInput(item.category) : undefined
      })),
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
      randomizeDirection: true
    };
  } catch (e) {
    console.error("Failed to decode topic or validation failed", e);
    return null;
  }
};

/**
 * Formats a topic for the developer to include in PREDEFINED_DATA.
 */
export const formatForDeveloper = (topic: Topic): string => {
  const cleanTopic = {
    ...topic,
    id: topic.name.toLowerCase().replace(/\s+/g, '-'),
    items: topic.items.map(item => ({
      term: item.term,
      definition: item.definition,
      options: item.options
    }))
  };
  return JSON.stringify(cleanTopic, null, 2);
};