import React from 'react';
import ShelterInputField from '../../components/userInputs/ShelterInputField'; // Import ShelterInputField component for user input
import Head from 'next/head';// Import Head component to manage metadata in the document head

import BGImage from '../../components/imgComponents/BGImage'; // Import BGImage component for background image
import sheltersPageBanner from '../../public/assets/sheltersPageBannerFull.jpg'; // Import the image to be used as background
import indexStyles from '../../styles/Home.module.css';// Import styles for the page

/**
 * OrganizationIndex Component
 * This page serves as the index for organizations. It includes a background image, 
 * the ShelterInputField for searching, and meta information for SEO.
 */

const OrganizationIndex = () => {
	return (
		<div className={indexStyles.home_hero}>
			<Head>
				<title>Organizations Page</title>
				<meta
					name="keywords"
					content="pet adoption, adopt-a-pet, petfinder"
				/>
			</Head>
			<BGImage
				image={sheltersPageBanner}
				alt={'A lot of puppies in a line'}
			/>
			<ShelterInputField />
		</div>
	);
};
export default OrganizationIndex;
