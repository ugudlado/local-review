import { featureApi } from "../services/featureApi";
import type { SpecReviewSession } from "../types/sessions";
import {
  useFeatureSession,
  type UseFeatureSessionReturn,
} from "./useFeatureSession";

export type UseSpecSessionReturn = UseFeatureSessionReturn<SpecReviewSession>;

async function createInitialSpecSession(
  featureId: string,
): Promise<SpecReviewSession> {
  const { path: specPath } = await featureApi.getSpec(featureId);
  const now = new Date().toISOString();
  return {
    featureId,
    worktreePath: "",
    specPath,
    verdict: null,
    threads: [],
    taskProgress: {
      featureId,
      developmentMode: "Non-TDD",
      total: 0,
      completed: 0,
      inProgress: 0,
      phases: [],
      overallProgress: 0,
    },
    metadata: { createdAt: now, updatedAt: now },
  };
}

export function useSpecSession(
  featureId: string | undefined,
): UseSpecSessionReturn {
  return useFeatureSession<SpecReviewSession>(featureId, {
    realtimeSuffix: "-spec.json",
    getSession: featureApi.getSpecSession,
    saveSession: featureApi.saveSpecSession,
    deleteSession: featureApi.deleteSpecSession,
    patchThread: featureApi.patchSpecThread,
    createInitialSession: createInitialSpecSession,
  });
}
