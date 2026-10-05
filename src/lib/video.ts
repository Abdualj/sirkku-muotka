export type VideoEmbed = { embedUrl: string; provider: "youtube" | "vimeo" | "drive" };

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

    // Accepts share links like drive.google.com/file/d/<id>/view and
    // drive.google.com/open?id=<id>. The file must be shared as
    // "Anyone with the link" or the embed shows a permission error.
    if (parsed.hostname === "drive.google.com") {
      const id =
        parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? parsed.searchParams.get("id");
      if (!id) return null;
      return { embedUrl: `https://drive.google.com/file/d/${id}/preview`, provider: "drive" };
    }
  } catch {
    return null;
  }

  return null;
}
