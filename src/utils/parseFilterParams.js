const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;

  const isCategory = (category) =>
    ['Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart'].includes(
      category,
    );

  if (isCategory(category)) return category;
};

const parseSuppliers = (suppliers) => {
  const isString = typeof suppliers === 'string';
  if (!isString) return;

  const isSuppliers = (suppliers) =>
    ['Square', 'Beximco', 'Uniliver', 'ACI', 'Acme'].includes(suppliers);

  if (isSuppliers(suppliers)) return suppliers;
};

export const parseFilterParams = (query) => {
  const { category, suppliers, search } = query;

  const parsedCategory = parseCategory(category);
  const parsedSuppliers = parseSuppliers(suppliers);

  return {
    category: parsedCategory,
    suppliers: parsedSuppliers,
    search: typeof search === 'string' ? search : undefined,
  };
};
