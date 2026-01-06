export function HunkExpandRow({
  gapLines,
  onExpand,
}: {
  gapLines: number;
  onExpand: () => void;
}) {
  if (gapLines <= 0) return null;
  return (
    <tr>
      <td colSpan={5} className="bg-[#161b22] py-1">
        <button
          type="button"
          onClick={onExpand}
          className="flex w-full items-center justify-center gap-2 text-[11px] text-slate-500 hover:text-slate-300"
        >
          <span className="h-px flex-1 bg-[#30363d]" />
          <span>↕ {gapLines} lines not shown</span>
          <span className="h-px flex-1 bg-[#30363d]" />
        </button>
      </td>
    </tr>
  );
}
