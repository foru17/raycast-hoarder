export interface Preferences {
  host: string;
  apiKey: string;
  showWebsitePreview: boolean;
  language: string;
}

export interface Config {
  host: string;
  apiKey: string;
  showWebsitePreview: boolean;
  language: string;
}

interface BookmarkContent {
  type: "text" | "asset" | "link";
  text?: string;
  sourceUrl?: string | null;

  assetType?: "image";
  assetId?: string;
  fileName?: string;

  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  screenshotAssetId?: string;
  favicon?: string;
  htmlContent?: string;
}

export interface Bookmark {
  id: string;
  createdAt: string;
  title: string | null;
  archived: boolean;
  favourited: boolean;
  taggingStatus: string;
  tags: [];
  content: BookmarkContent;
  assets: [];
  note?: string;
}
