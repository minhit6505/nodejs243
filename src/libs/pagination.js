module.exports = async (currentPage, limit, Model, query) => {
  const totalRows = await Model.find(query).countDocuments();
  const totalPages = Math.ceil(totalRows/limit);
  const next = currentPage + 1;
  const prev = currentPage - 1;
  const hasNext = currentPage >= totalPages
    ? false 
    : true;
  const hasPrev = currentPage <= 1
    ? false 
    : true;

  return {
    totalRows,
    totalPages,
    currentPage,
    next,
    prev,
    hasNext,
    hasPrev,
  };
};
