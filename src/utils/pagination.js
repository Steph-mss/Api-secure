const applyPagination = (query, queryString) => {
  const page = parseInt(queryString.page, 10) || 1;
  const limit = parseInt(queryString.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedQuery = query.skip(startIndex).limit(limit);

  const pagination = {};

  if (endIndex < query.model.countDocuments()) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  return { query: paginatedQuery, pagination };
};

module.exports = { applyPagination };
