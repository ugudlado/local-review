/**
 * HeadingNodeView — TipTap React Node View for heading blocks (h1–h6).
 * Wraps each heading in the AnnotatableNodeView affordance.
 */

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { ReactNodeViewProps } from "@tiptap/react";
import { useCallback } from "react";
import { AnnotatableNodeView } from "./AnnotatableNodeView";
import { useSpecRendererContext } from "./SpecRendererContext";
import type { SpecBlockAnchor } from "../../../types/sessions";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingClassMap: Record<HeadingLevel, string> = {
  1: "font-serif text-3xl font-medium text-ink mt-8 mb-4",
  2: "font-serif text-2xl font-medium text-ink border-b border-border pb-2 mb-4 mt-6",
  3: "font-serif text-xl font-medium text-ink mt-5 mb-3",
  4: "font-serif text-lg font-medium text-ink mt-4 mb-2",
  5: "font-serif text-base font-medium text-ink mt-4 mb-2",
  6: "font-serif text-sm font-medium text-ink mt-4 mb-2",
};

export function HeadingNodeView({ node, getPos }: ReactNodeViewProps) {
  const { posToBlockIndex, anchorMap } = useSpecRendererContext();

  const pos = typeof getPos === "function" ? getPos() : undefined;
  const blockIndex = pos !== undefined ? posToBlockIndex.get(pos) : undefined;

  const level = (node.attrs.level as HeadingLevel) ?? 1;
  const headingClass = headingClassMap[level] ?? headingClassMap[2];

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
         * NodeViewContent's `as` prop uses NoInfer<T> which prevents TypeScript
         * from inferring the tag from the `as` value. We render the heading
         * semantic tag via NodeViewWrapper and style NodeViewContent (div).
         */}
        <NodeViewContent className={headingClass} />
      </AnnotatableNodeView>
    </NodeViewWrapper>
  );
}
