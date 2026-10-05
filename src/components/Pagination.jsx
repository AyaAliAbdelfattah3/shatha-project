
// 1. دالة مساعدة خارج المكون (للتوزيع وتجنب إعادة بنائها مع كل Render)
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

// 2. مكون React الأساسي كـ Arrow Function
const Pagination = ({ page, totalPages, onPageChange }) => {
  const currentPage = Number(page) || 1;
  const total = Number(totalPages) || 1;

  // إذا كان عدد الصفحات صفراً أو 1، لا نعرض شيئاً
  if (total <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, total);

  // 3. الجزء الخاص بـ JSX يوضع داخل return
  return (
    <nav className="pagination" aria-label="Pagination">
      {/* زر السابق */}
      <button
        type="button"
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {/* أرقام الصفحات والنقاط */}
      {pageNumbers.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="pagination-btn"
            style={{ cursor: "default", border: "none" }}
          >
            …
          </span>
        ) : (
          <button
            type="button"
            key={pageNumber}
            className={`pagination-btn${pageNumber === currentPage ? " active" : ""}`}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </button>
        )
      )}

      {/* زر التالي */}
      <button
        type="button"
        className="pagination-btn"
        disabled={currentPage === total}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};

// 4. تصدير المكون ليكون قابلاً للاستدعاء في باقي المشروع
export default Pagination;
