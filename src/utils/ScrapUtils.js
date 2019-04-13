export const scrapeI94 = async (data, firebase) => {
  const res = await fetch("https://pdfparsertax.herokuapp.com/scrape", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return await res.json();
};
