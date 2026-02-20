import { Topic } from "@/data/studyData";

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
 * Decodes a base64 string back into a topic object with validation.
 */
export const decodeTopic = (code: string): Topic | null => {
  try {
    const json = decodeURIComponent(escape(atob(code)));
    const parsed = JSON.parse(json);

    // Basic validation of the structure
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof parsed.name === 'string' &&
      Array.isArray(parsed.items)
    ) {
      // Ensure IDs are unique for the new user's environment
      const timestamp = Date.now();
      return {
        ...parsed,
        id: `imported_${timestamp}`,
        items: parsed.items.map((item: any, idx: number) => ({
          ...item,
          id: `item_${timestamp}_${idx}`
        }))
      };
    }
    return null;
  } catch (e) {
    console.error("Failed to decode topic", e);
    return null;
  }
};

/**
 * Formats a topic for the developer to include in PREDEFINED_DATA.
 */
export const formatForDeveloper = (topic: Topic): string => {
  // Remove local IDs to keep it clean
  const cleanTopic = {
    ...topic,
    id: topic.name.toLowerCase().replace(/\s+/g, '-'),
    items: topic.items.map(item => ({
      term: item.term,
      definition: item.definition,
      options: item.options,
      isAbcdEnabled: item.isAbcdEnabled
    }))
  };
  return JSON.stringify(cleanTopic, null, 2);
};