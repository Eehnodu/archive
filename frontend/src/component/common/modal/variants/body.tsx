type Props = {
  description?: string;
  warning?: string;
};

const Body = ({ description, warning }: Props) => (
  <div className="px-6 pb-0 pt-3">
    {description && (
      <p className="body-md-medium text-black/80 whitespace-pre-line text-center">
        {description}
      </p>
    )}
    {warning && (
      <p className="mt-2 text-center text-[13px] leading-5 text-red-600 whitespace-pre-line">
        {warning}
      </p>
    )}
  </div>
);

export default Body;
