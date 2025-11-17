import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }) => {
    return (
        <div className={`flex justify-center gap-3 mt-8 ${className}`}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold text-white transition
                        ${currentPage === page
                            ? "bg-orange-500"
                            : "bg-orange-200 hover:bg-orange-300"}`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
