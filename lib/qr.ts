import { create } from "qrcode";

// The blank margin a reader needs around the symbol, in modules.
const QUIET_ZONE = 4;

// A QR code (error correction M) as one SVG path, computed at build time so
// the page ships no JavaScript for it. Each run of dark modules in a row is
// one rectangle. `size` is in modules and includes the quiet zone.
export function qrCode(text: string) {
  const { modules } = create(text, { errorCorrectionLevel: "M" });
  const n = modules.size;
  let path = "";
  for (let y = 0; y < n; y++) {
    let x = 0;
    while (x < n) {
      if (!modules.get(y, x)) {
        x++;
        continue;
      }
      const start = x;
      while (x < n && modules.get(y, x)) x++;
      path += `M${start + QUIET_ZONE} ${y + QUIET_ZONE}h${x - start}v1h-${x - start}z`;
    }
  }
  return { size: n + 2 * QUIET_ZONE, path };
}
