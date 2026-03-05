/**
 * CodeBlockNodeView — TipTap React Node View for fenced code blocks.
 * Wraps each code block in the AnnotatableNodeView affordance with
 * dark background and monospace styling.
 */

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { ReactNodeViewProps } from "@tiptap/react";
import { useCallback } from "react";
import { AnnotatableNodeView } from "./AnnotatableNodeView";
import { useSpecRendererContext } from "./SpecRendererContext";
import type { SpecBlockAnchor } from "../../../types/sessions";

export function CodeBlockNodeView({ node, getPos }: ReactNodeViewProps) {
  const { posToBlockIndex, anchorMap } = useSpecRendererContext();

  const pos = typeof getPos === "function" ? getPos() : undefined;
  const blockIndex = pos !== undefined ? posToBlockIndex.get(pos) : undefined;

  const language = node.attrs.language as string | null;

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
        <div className="bg-canvas-elevated my-3 overflow-x-auto rounded-md p-4">
          {language && (
            <div className="text-ink-muted mb-2 font-mono text-[10px] uppercase tracking-wider">
              {language}
            </div>
          )}
          {/*
           * NodeViewContent renders TipTap-managed code content.
           * NodeViewContent's `as` prop uses NoInfer<T>, preventing inference
           * from `as="code"`, so we keep the default `div` and apply code styling.
           */}
          <NodeViewContent className="text-ink font-mono text-[13px] leading-relaxed" />
        </div>
      </AnnotatableNodeView>
    </NodeViewWrapper>
  );
}
