import cachedFetch from "util/cachedFetch";

export default async function(driver) {
	const data = await cachedFetch(
		`https://ergast.com/api/f1/drivers/${driver}/seasons.json?limit=999`
	)
		.then(res => res.MRData.SeasonTable.Seasons)
		.then(res => res.slice().reverse());
	return data;
}
