type Props = { emptyText: string };

const Empty = ({ emptyText }: Props) => (
  <div className="py-8 text-center text-main/60 text-sm">{emptyText}</div>
);

export default Empty;
