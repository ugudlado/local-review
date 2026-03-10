/**
 * SpecRendererContext — shared context provided by SpecRenderer to Node Views.
 *
 * Node Views can't easily receive arbitrary props (they go through TipTap's
 * rendering pipeline), so we use React context to pass callbacks and data.
 */

import { createContext, useContext } from "react";
import type { AnchorMap } from "../../../utils/specAnchoring";
import type { ReviewThread, SpecBlockAnchor } from "../../../types/sessions";

export interface SpecRendererContextValue {
  /** Threads keyed by block index. */
  threadsByBlock: Map<number, ReviewThread[]>;
  /** Thread count keyed by block index. */
  threadCountByBlock: Map<number, number>;
  /** Full anchor map from buildAnchorMap(). */
  anchorMap: AnchorMap;
  /** Map from TipTap character position to sequential block index. */
  posToBlockIndex: Map<number, number>;
  /** Called when the user wants to compose a comment on a block. */
  onCompose: (anchor: SpecBlockAnchor) => void;
  /** Block index currently being composed on (highlights that block). */
  composingBlockIndex?: number;
  onReply?: (threadId: string, text: string) => void;
  onThreadStatusChange?: (
    threadId: string,
    status: "open" | "resolved" | "approved",
  ) => void;
  onSeverityChange?: (threadId: string, severity: string) => void;
  onComposeSubmit?: (text: string) => void;
  onComposeCancel?: () => void;
  composingSelectedText?: string;
  /** Whether the editor is in edit mode (disables annotation affordances). */
  isEditMode: boolean;
}

export const SpecRendererContext = createContext<SpecRendererContextValue>({
  threadsByBlock: new Map(),
  threadCountByBlock: new Map(),
  anchorMap: new Map(),
  posToBlockIndex: new Map(),
  onCompose: () => {},
  isEditMode: false,
});

export function useSpecRendererContext(): SpecRendererContextValue {
  return useContext(SpecRendererContext);
}
