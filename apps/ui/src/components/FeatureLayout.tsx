import { Outlet, useParams } from "react-router-dom";
import FeatureNavBar from "./FeatureNavBar";
import { FeaturesProvider } from "../hooks/useFeaturesContext";
import { FeatureHeaderProvider } from "../hooks/useFeatureHeader";

/**
 * Layout wrapper for all feature routes (/features/:featureId/*)
 * Renders the FeatureNavBar top bar + Outlet for child routes.
 * Wraps children in FeaturesProvider so all feature sub-routes share one fetch.
 * Wraps children in FeatureHeaderProvider so pages can inject header actions.
 */
export default function FeatureLayout() {
  const { featureId } = useParams<{ featureId: string }>();

  return (
    <FeaturesProvider>
      <FeatureHeaderProvider>
        <div className="bg-canvas text-ink flex h-screen flex-col overflow-hidden">
          <FeatureNavBar featureId={featureId ?? ""} />

          <div className="min-h-0 flex-1">
            <Outlet />
          </div>
        </div>
      </FeatureHeaderProvider>
    </FeaturesProvider>
  );
}
