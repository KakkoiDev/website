import { goatCounterCode } from "@/data";

const isDev = process.env.NODE_ENV !== "production";

// GoatCounter's origin when a site code is set, null otherwise. Production
// builds only, so pages viewed under `next dev` are never counted.
export const analyticsOrigin =
  goatCounterCode && !isDev ? `https://${goatCounterCode}.goatcounter.com` : null;
