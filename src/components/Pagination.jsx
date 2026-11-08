// 1. دالة مساعدة خارج المكون
const getPageNumbers = (page, totalPages) => {
  const currentPage = Number(page);
  const total = Number(totalPages);
  const delta = 1;
  const pages = [];

  for (let i = 1; i <= total; i += 1) {
    if (
      i === 1 ||
      i === total ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return pages;
};

// 2. مكون React الأساسي
const Pagination = ({ page, totalPages, onPageChange }) => {
  const currentPage = Number(page) || 1;
  const total = Number(totalPages) || 1;

  if (total <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, total);

  // 3. الـ JSX مع كلاسات Tailwind
  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* زر السابق */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 h-10 flex items-center justify-center rounded-xl bg-white border border-[#EFE8DE] text-[#7A685D] hover:bg-[#FAF7F2] hover:text-[#B28421] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-bold"
      >
        Prev
      </button>

      {/* أرقام الصفحات والنقاط */}
      {pageNumbers.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="w-10 h-10 flex items-center justify-center text-[#7A685D] font-bold"
          >
            …
          </span>
        ) : (
          <button
            type="button"
            key={pageNumber}
            onClick={() => onPageChange(Number(pageNumber))}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
              pageNumber === currentPage
                ? "bg-[#B28421] text-white shadow-md transform scale-105"
                : "bg-white border border-[#EFE8DE] text-[#3B2519] hover:bg-[#FAF7F2] hover:text-[#B28421]"
            }`}
          >
            {pageNumber}
          </button>
        )
      )}

      {/* زر التالي */}
      <button
        type="button"
        disabled={currentPage === total}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 h-10 flex items-center justify-center rounded-xl bg-white border border-[#EFE8DE] text-[#7A685D] hover:bg-[#FAF7F2] hover:text-[#B28421] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-bold"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;