import { useLoaderData } from "@remix-run/react";
import { getPageBySlug } from "~/api/get-page-by-slug.server";

import Faqs from "~/components/faqs";

export async function loader() {
  const slug = "pages";
  const response = await getPageBySlug(slug);
  return response.json();
}

function renderPageSection(data) {
  if (!data) return null;
  const components = data[0].attributes.sections;
  return components.map((component) => {
    switch (component.__component) {
      case "layout.faq":
        return <Faqs key={component.id} data={component} />;
      default:
        return null;
    }
  });
}

export default function HomeRoute() {
  const { data } = useLoaderData();
  return <div>{renderPageSection(data)}</div>
}
