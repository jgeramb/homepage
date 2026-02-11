export const useReferenceItems = () =>
  useAsyncData("reference-items", () =>
    queryCollection("references").select("title", "year", "description", "links").order("year", "DESC").all()
  );
