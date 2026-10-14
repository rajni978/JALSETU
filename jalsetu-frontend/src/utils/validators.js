export const validateReport = ({ areaId, village, category, urgency, description }) => {
  const e = {};
  if (!areaId) e.areaId = 'Select your area';
  if (!village?.trim()) e.village = 'Enter the village or locality';
  if (!category) e.category = 'Select a problem type';
  if (!urgency) e.urgency = 'Select how urgent it is';
  if (!description?.trim() || description.trim().length < 15) e.description = 'Describe the problem in at least 15 characters';
  return e;
};

export const validateSuggestion = ({ areaId, title, category, description }) => {
  const e = {};
  if (!areaId) e.areaId = 'Select an area';
  if (!title?.trim() || title.trim().length < 5) e.title = 'Title must be at least 5 characters';
  if (!category) e.category = 'Select a category';
  if (!description?.trim() || description.trim().length < 15) e.description = 'Explain your idea in at least 15 characters';
  return e;
};

export const validateAction = ({ areaId, title, category }) => {
  const e = {};
  if (!areaId) e.areaId = 'Select an area';
  if (!title?.trim() || title.trim().length < 5) e.title = 'Title must be at least 5 characters';
  if (!category) e.category = 'Select a category';
  return e;
};