export const formatDate = (date, opts = {}) =>
  new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric', ...opts,
  });

export const formatDateTime = (date) =>
  new Date(date).toLocaleString('fr-FR');