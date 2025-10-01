const Weekdays = () => (
  <div className="grid grid-cols-7 text-[11px] text-main/80 px-1">
    {"일월화수목금토".split("").map((w) => (
      <div key={w} className="h-6 flex items-center justify-center">
        {w}
      </div>
    ))}
  </div>
);

export default Weekdays;
