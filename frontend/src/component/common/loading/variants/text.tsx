type Props = { message: string };

const Text = ({ message }: Props) => (
  <p className="mt-2 flex gap-1 text-lg font-semibold text-main">
    {message.split("").map((char, i) => (
      <span
        key={i}
        className="animate-bounce inline-block"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        {char}
      </span>
    ))}
  </p>
);

export default Text;
