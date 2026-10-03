export type Locale = "en" | "ja";

export type Localized<T = string> = Record<Locale, T>;
