import cachedFetch from "util/cachedFetch";

export default async function(constructor) {
  const data = await cachedFetch(
    `http://ergast.com/api/f1/constructors/${constructor}.json?limit=999`
  ).then(res => res.MRData.ConstructorTable.Constructors[0]);
  return data;
};