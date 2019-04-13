export const scrapeI94 = async (data) => {
  const res = await fetch(process.env.BACKEND_SERVICE_URL + "scrape", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};
