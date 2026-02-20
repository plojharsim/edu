import { Topic } from "@/data/studyData";

const SIGNATURE = "plojharsim";

/**
 * Zakóduje téma do sdílecího kódu.
 * Přidá podpis pro ověření integrity.
 */
export const encodeTopicCode = (topic: Topic): string => {
  try {
    // Odstraníme ID, aby si příjemce mohl vygenerovat vlastní a nedocházelo ke kolizím
    const { id, ...rest } = topic;
    const dataString = JSON.stringify(rest);
    const signedData = `${dataString}|${SIGNATURE}`;
    return btoa(encodeURIComponent(signedData));
  } catch (error) {
    console.error("Chyba při kódování tématu:", error);
    return "";
  }
};

/**
 * Dekóduje sdílecí kód a ověří jeho integritu.
 */
export const decodeTopicCode = (code: string): Topic | null => {
  try {
    const decoded = decodeURIComponent(atob(code));
    const parts = decoded.split('|');
    
    if (parts.length < 2 || parts[parts.length - 1] !== SIGNATURE) {
      throw new Error("Neplatný nebo poškozený kód (chybí podpis plojharsim).");
    }

    // Spojíme zbytek zpět (pokud by v JSONu byla svislice)
    const jsonString = parts.slice(0, -1).join('|');
    const topicData = JSON.parse(jsonString);

    // Základní validace struktury
    if (!topicData.name || !Array.isArray(topicData.items)) {
      throw new Error("Kód neobsahuje platná data tématu.");
    }

    return {
      ...topicData,
      id: `imported_${Date.now()}` // Vygenerujeme nové ID
    };
  } catch (error) {
    console.error("Chyba při dekódování:", error);
    return null;
  }
};