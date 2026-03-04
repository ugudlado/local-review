import { featureApi } from "../services/featureApi";
import type { SpecReviewSession } from "../types/sessions";
import {
  useFeatureSession,
  type UseFeatureSessionReturn,
} from "./useFeatureSession";

export type UseSpecSessionReturn = UseFeatureSessionReturn<SpecReviewSession>;

export function useSpecSession(
  featureId: string | undefined,
): UseSpecSessionReturn {
  return useFeatureSession<SpecReviewSession>(featureId, {
    realtimeSuffix: "-spec.json",
    getSession: featureApi.getSpecSession,
    saveSession: featureApi.saveSpecSession,
    deleteSession: featureApi.deleteSpecSession,
    patchThread: featureApi.patchSpecThread,
  });
}
