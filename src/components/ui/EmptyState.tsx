type EmptyStateProps = {
  title: string;
  description?: string;
  children?: React.ReactNode; // optional button or link
};

export default function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-300 p-10 text-center">
      <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}