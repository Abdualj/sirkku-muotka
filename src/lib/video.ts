export type VideoEmbed = { embedUrl: string; provider: "youtube" | "vimeo" };

export function getVideoEmbed(url: string | undefined | null): VideoEmbed | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      const id = parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");
      if (!id) return null;
      return { embedUrl: `https://www.youtube.com/embed/${id}`, provider: "youtube" };
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      if (!id) return null;
      return { embedUrl: `https://player.vimeo.com/video/${id}`, provider: "vimeo" };
    }
  } catch {
    return null;
  }

  return null;
}
