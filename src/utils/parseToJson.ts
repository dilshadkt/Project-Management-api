function cleanMarkdown(text: string) {
  // Remove markdown bold syntax (asterisks)
  return text.replace(/\*\*/g, '').trim();
}

export function parseResponse(text: string) {
  try {
    const jsonData = JSON.parse(text);
    // Clean markdown from JSON data
    return jsonData.map((item: any) => ({
      heading: cleanMarkdown(item.heading),
      description: cleanMarkdown(item.description),
    }));
  } catch (e) {
    console.log("Couldn't parse as JSON, attempting manual parsing");
    // If JSON parsing fails, attempt to manually structure the data
    const items = text.split('\n').filter((line) => line.trim() !== '');
    return items.map((item) => {
      const [heading, ...descriptionParts] = item.split(':');
      return {
        heading: cleanMarkdown(heading.replace(/^\d+\.\s*/, '')),
        description: cleanMarkdown(descriptionParts.join(':')),
      };
    });
  }
}
