/**
 * ParagraphNodeView — TipTap React Node View for paragraph blocks.
 * Wraps each paragraph in the AnnotatableNodeView affordance.
 */

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { ReactNodeViewProps } from "@tiptap/react";
import { useCallback } from "react";
import { AnnotatableNodeView } from "./AnnotatableNodeView";
import { useSpecRendererContext } from "./SpecRendererContext";
import type { SpecBlockAnchor } from "../../../types/sessions";

export function ParagraphNodeView({ getPos }: ReactNodeViewProps) {
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
    <NodeViewWrapper>
      <AnnotatableNodeView blockIndex={blockIndex} getAnchor={getAnchor}>
        {/*
         * NodeViewContent renders the TipTap-managed inline content.
         * We wrap it in a <p> tag for semantic correctness.
         * The `as` prop type constraint uses NoInfer<T> which prevents
         * TypeScript from inferring T from `as`, so we use a div here
         * and apply paragraph styling via className.
         */}
        <NodeViewContent className="text-ink text-[15px] leading-[1.75]" />
      </AnnotatableNodeView>
    </NodeViewWrapper>
  );
}
