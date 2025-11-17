export default function UlasanPopup() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[30%] text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">
          Ulasan Tersimpan
        </h2>

        <div className="flex justify-center">
          <div className="bg-orange-500 rounded-full w-15 h-15 flex items-center justify-center">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}