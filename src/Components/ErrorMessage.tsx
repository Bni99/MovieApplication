type ErrorMessageProps = {
  errorMessage: string | undefined;
  className?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  errorMessage,
  className,
}) => {
  const baseStyles = "text-sm ml-1 text-gray-500";

  return <span className={`${baseStyles} ${className}`}>{errorMessage}</span>;
};

export default ErrorMessage;
