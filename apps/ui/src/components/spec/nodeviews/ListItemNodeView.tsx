/**
 * ListItemNodeView — TipTap React Node View for list item blocks.
 * Wraps each list item in the AnnotatableNodeView affordance.
 */

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { ReactNodeViewProps } from "@tiptap/react";
import { useCallback } from "react";
import { AnnotatableNodeView } from "./AnnotatableNodeView";
import { useSpecRendererContext } from "./SpecRendererContext";
import type { SpecBlockAnchor } from "../../../types/sessions";

export function ListItemNodeView({ getPos }: ReactNodeViewProps) {
  const { posToBlockIndex, anchorMap } = useSpecRendererContext();

  const pos = typeof getPos === "function" ? getPos() : undefined;
  const blockIndex = pos !== undefined ? posToBlockIndex.get(pos) : undefined;

  const getAnchor = useCallback((): SpecBlockAnchor | null => {
    if (blockIndex === undefined) return null;
    const info = anchorMap.get(blockIndex);
    if (!info) return null;
    return {
      type: info.type,
      hash: info.hash,
      path: info.path,
      preview: info.preview,
      blockIndex: info.blockIndex,
    };
  }, [blockIndex, anchorMap]);

  return (
    <NodeViewWrapper as="li">
      <AnnotatableNodeView blockIndex={blockIndex} getAnchor={getAnchor}>
        <NodeViewContent className="text-ink leading-[1.75]" />
      </AnnotatableNodeView>
    </NodeViewWrapper>
  );
}
