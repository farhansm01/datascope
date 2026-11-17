import Button from "./Button";

type ErrorBoxProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorBox({ message = "Something went wrong.", onRetry }: ErrorBoxProps) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}