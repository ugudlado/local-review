import { featureApi } from "../services/featureApi";
import type { CodeReviewSession } from "../types/sessions";
import {
  useFeatureSession,
  type UseFeatureSessionReturn,
} from "./useFeatureSession";

export type UseCodeSessionReturn = UseFeatureSessionReturn<CodeReviewSession>;

export function useCodeSession(
  featureId: string | undefined,
): UseCodeSessionReturn {
  return useFeatureSession<CodeReviewSession>(featureId, {
    realtimeSuffix: "-code.json",
    getSession: featureApi.getCodeSession,
    saveSession: featureApi.saveCodeSession,
    deleteSession: featureApi.deleteCodeSession,
    patchThread: featureApi.patchCodeThread,
  });
}
