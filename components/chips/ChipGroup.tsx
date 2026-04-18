import { SparkleChip } from "./SparkleChip";

export function ChipGroup({
  title,
  chips,
  activeId,
  onSelect,
}: {
  title: string;
  chips: { id: string; label: string }[];
  activeId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--mc-text-tertiary)]">
        {title}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <SparkleChip
            key={c.id}
            label={c.label}
            active={c.id === activeId}
            onClick={() => onSelect(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
