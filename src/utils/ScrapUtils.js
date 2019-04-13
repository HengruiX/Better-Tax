export const scrapI94 = async (data, firebase) => {
  const scrapTravel = firebase.functions.httpsCallable("scrapeTravel");
  const res = await scrapTravel(data);
  console.log(res);
};
