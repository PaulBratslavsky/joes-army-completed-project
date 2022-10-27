const qs = require('qs');

const params = (slug) => qs.stringify({
  populate: {
    sections: {
      populate: "*"
    }
  },
  filter: { slug: slug },
});

export async function getPageBySlug(slug) {
  const baseUrl = process.env.BASE_URL
  const query = `/api/pages?${params(slug)}`;
  return await fetch(baseUrl + query)
}
