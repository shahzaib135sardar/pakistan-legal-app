// components/LoadingSpinner.tsx

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="spinner"></div>
      <span>درخواست پر عمل ہو رہا ہے...</span>
    </div>
  );
}
