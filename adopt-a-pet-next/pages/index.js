import Head from 'next/head';
import Image from 'next/image';
import homeStyles from '../styles/Home.module.css'; // Import custom styles for the home page
import IndexHero from '../components/indexComponents/IndexHero';// Import the Hero component for the homepage
import { PetFinderAuthContext } from './_app'; // Import context to access the PetFinder API token
import React, { useState, useContext, useEffect, useRef } from 'react'; // Import React hooks

import Carousel from '../components/carouselComponents/Carousel'; // Import the carousel component to display animal results

import { petfinderUrls } from '../URLs/petfinderurls';// Import URLs for API endpoints

export default function Home() {
	// State variables for storing API results and managing loading state
	const [results, setResults] = useState(null); // Stores the list of animals fetched from the API

	const [isLoading, setIsLoading] = useState(true);  // Tracks if data is still being loaded

	const [petTypesAvailable, setPetTypesAvailable] = useState([]); // Stores available pet types (not used yet)

	// play around with useref, see if it can replace pettypes, breeds in animalinput. Might not be the right choice.
	 

	// Current recieved access token
	const token = useContext(PetFinderAuthContext);

	 // useRef to store the list of retrieved pets (potentially across multiple pages of results)
	const retrievedPets = useRef([]);

	useEffect(() => {
		if (token === null) return;
		try {
			const fetchAnimals = async () => {
				// Fetch animals from the PetFinder API using the token for authorization
				const animalData = await fetch(
					 

					`${petfinderUrls.animals}`, // URL for fetching animals
					{
						headers: {
							Authorization: `Bearer ${token}`, // Send the token in the Authorization header
						},
					}
				);
				// Parse the response JSON to extract animal data
				const animalDataJson = await animalData.json();

				 
                                // Update state with the fetched animal data
				setResults(animalDataJson.animals);

				setIsLoading(false);  // Set loading state to false after data is fetched
			};

			fetchAnimals();
		} catch (error) {
			//
			console.error(error);
		}

		// Update when token changes
	}, [token]);

	if (isLoading) {
		return (
			<div className={homeStyles.container}>
				<Head>
					<title>Adopt-A-Pet </title>
					<meta
						name="keywords"
						content="pet adoption, adopt-a-pet, petfinder"
					/>
					<link
						rel="icon"
						href="\assets\aapTitleLogoTransparent.png"
					/>
				</Head>
				<IndexHero />
				<div>loading...</div>
			</div>
		);
	}
	// Render the main content once the data is loaded
	return (
		<div className={homeStyles.container}>
			<Head>
				<title>Adopt-A-Pet </title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
				<link rel="icon" href="\assets\aapTitleLogoTransparent.png" />
			</Head>
			<IndexHero />
			{/* <AnimalInputField className={homeStyles.home_input_field} /> */}
			<h1 className={homeStyles.headline}></h1>
			<h2 className={homeStyles.subheadline}>New and Featured Animals</h2>
			<div className={homeStyles.carousel_container}>
				<Carousel results={results} />
			</div>
		</div>
	);
}
