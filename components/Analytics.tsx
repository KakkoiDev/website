import { analyticsOrigin } from "@/lib/analytics";
import { withBasePath } from "@/lib/base-path";

// One pageview per page load, sent by public/count.js. Renders nothing until
// a GoatCounter code is set in data/analytics.ts. Deferred, so it runs after
// the CSP meta tag is in force.
export default function Analytics() {
  if (!analyticsOrigin) return null;
  return (
    <script
      defer
      src={withBasePath("/count.js")}
      data-goatcounter={`${analyticsOrigin}/count`}
    />
  );
}
