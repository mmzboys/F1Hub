import {
	Paper,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	makeStyles,
	Hidden,
} from "@material-ui/core";

import Head from "components/Head";
import CollapseWithButton from "components/CollapseWithButton";
import DriversStandingsTable from "components/DriversStandingsTable";
import TeamColorBar from "components/TeamColorBar";
import SeasonsSelect from "components/SeasonsSelect";
import CenteredLoader from "components/CenteredLoader";
import ContentCard from "components/ContentCard";

import { useState, useEffect } from "react";
import Link from "next/link";

import getDriversStandings from "util/getDriversStandings";
import getWikiDefaultImage from "util/getWikiDefaultImage";
import getSeasonsList from "util/getSeasonsList";

const useStyles = makeStyles(theme => ({
	container: {
		[theme.breakpoints.up("xs")]: {
			gridTemplateColumns: "1fr",
		},
		[theme.breakpoints.up("sm")]: {
			gridTemplateColumns: "repeat(2, 1fr)",
			paddingTop: theme.spacing(3),
		},
		[theme.breakpoints.up("lg")]: {
			gridTemplateColumns: "repeat(4, 1fr)",
		},
		display: "grid",
		gridGap: theme.spacing(3),
		paddingTop: theme.spacing(2),
	},
	standings: {
		[theme.breakpoints.up("xs")]: {
			gridRow: "3 / 4",
		},
		[theme.breakpoints.up("sm")]: {
			gridColumn: "1 / 3",
			gridRow: "2 / 3",
		},
		[theme.breakpoints.up("md")]: {
			gridColumn: "2 / 3",
			gridRow: "1 / 3",
		},
		[theme.breakpoints.up("lg")]: {
			gridColumn: "3 / 5",
			gridRow: "1 / 3",
		},
		maxHeight: 394 * 2 + theme.spacing(3),
		overflow: "auto",
	},
	driverPhoto: {
		height: 180,
		backgroundPositionY: "25%",
		[theme.breakpoints.up("md")]: {
			height: 300
		},
	},
}));

const DriverCard = props => {
	const classes = useStyles();
	const { data } = props;
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const wikiImage = await getWikiDefaultImage(data.Driver.url);
			if (wikiImage) setImageUrl(wikiImage);
		}
		fetchData();
	}, []);

	return (
		<Card>
			<Link href={`/drivers/${data.Driver.driverId}`}>
				<CardActionArea>
					<CardMedia
						className={classes.driverPhoto}
						// TODO: find a better way to fetch images
						image={imageUrl ? imageUrl : "/static/images/no_photo.png"}
						title={`${data.Driver.givenName} ${data.Driver.familyName}`}
					/>
					<CardContent>
						<TeamColorBar team={data.Constructors[0].name}>
							<Typography variant="h5" component="h3">
								{`${data.Driver.givenName} ${data.Driver.familyName}`}
							</Typography>
							<Typography variant="overline" component="p">
								{data.Constructors[0].name}
							</Typography>
						</TeamColorBar>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	);
};

const Drivers = props => {
	const classes = useStyles();
	const seasons = props.seasons;

	const [data, setData] = useState(props.driversStandingsData);
	const [season, setSeason] = useState(seasons[0].season);
	const [loading, setLoading] = useState(false);

	const changeSeason = async e => {
		setLoading(true);

		setSeason(e.target.value);
		setData(await getDriversStandings(e.target.value));

		setLoading(false);
	};

	const DriverStandings = () => (
		<ContentCard
			className={classes.standings}
			loading={loading}
			name="Standings"
			caption={`after round\u00A0${data.round}`}>
			<Hidden mdUp>
				<CollapseWithButton height="200px">
					<DriversStandingsTable data={data} />
				</CollapseWithButton>
			</Hidden>
			<Hidden smDown>
				<DriversStandingsTable data={data} />
			</Hidden>
		</ContentCard>
	);

	return loading ? (
		<CenteredLoader />
	) : (
		<>
			<Head title="Drivers" />
			<SeasonsSelect
				name="season"
				id="select-season"
				value={season}
				onChange={changeSeason}
				seasonsList={seasons}
			/>
			<div className={classes.container}>
				<DriverStandings />
				{data.DriverStandings.map(row => (
					<DriverCard data={row} key={row.Driver.driverId} />
				))}
			</div>
		</>
	);
};

Drivers.getInitialProps = async () => {
	return {
		name: "Drivers",
		driversStandingsData: await getDriversStandings(),
		seasons: await getSeasonsList(),
	};
};

export default Drivers;
