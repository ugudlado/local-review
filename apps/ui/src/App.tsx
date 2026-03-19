import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { useMemo } from "react";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import { ReviewPage } from "./pages/ReviewPage";
import NotFound from "./pages/NotFound";
import FeatureLayout from "./components/FeatureLayout";
import { getStatusConfig } from "./utils/featureStatus";
import { FeaturesProvider, useFeatures } from "./hooks/useFeaturesContext";
import { FEATURE_TAB } from "./types/constants";

/** Root layout that provides FeaturesProvider to all routes. */
function RootLayout() {
  return (
    <FeaturesProvider>
      <Outlet />
    </FeaturesProvider>
  );
}

/** Redirects /features/:featureId to the tab matching the feature's current status. */
function FeatureDefaultRedirect() {
  const { featureId } = useParams<{ featureId: string }>();
  const { features, loading, error } = useFeatures();

  const defaultTab = useMemo(() => {
    const feature = features.find((f) => f.id === featureId);
    if (!feature) return FEATURE_TAB.Code;
    return getStatusConfig(feature.status).defaultTab;
  }, [features, featureId]);

  if (loading || (error && features.length === 0)) return null;
  return <Navigate to={defaultTab} replace />;
}

/** Wrapper that resolves a feature's worktree path and renders ReviewPage in embedded mode. */
function FeatureCodeTab() {
  const { featureId } = useParams<{ featureId: string }>();
  const { features, loading, error } = useFeatures();

  const feature = useMemo(
    () => features.find((f) => f.id === featureId) ?? null,
    [features, featureId],
  );

  if ((loading || error) && !feature) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--bg-base)]">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-blue-400" />
      </div>
    );
  }

  if (!feature?.worktreePath) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--bg-base)]">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-600 border-t-blue-400" />
      </div>
    );
  }

  return (
    <ReviewPage
      featureId={featureId}
      worktreePath={feature.worktreePath}
      sourceBranch={feature.branch}
      embedded
    />
  );
}

const featureChildren = [
  { index: true, element: <FeatureDefaultRedirect /> },
  { path: FEATURE_TAB.Tasks, element: <TasksPage /> },
  { path: FEATURE_TAB.Code, element: <FeatureCodeTab /> },
];

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      { path: "/workspace/:workspaceName", element: <Dashboard /> },
      {
        path: "/workspace/:workspaceName/features/:featureId",
        element: <FeatureLayout />,
        children: featureChildren,
      },
      {
        path: "/features/:featureId",
        element: <FeatureLayout />,
        children: featureChildren,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
