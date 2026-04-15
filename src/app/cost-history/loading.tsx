export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-indigo-100 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-6 text-slate-600 font-medium text-lg">Loading cost details...</p>
        <p className="mt-2 text-slate-400 text-sm">Please wait while we fetch transaction information</p>
      </div>
    </div>
  );
}