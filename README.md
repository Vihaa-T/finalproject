Pet adoption website using Next.js framework and Petfinder's API for content. 

Search for different types and breeds of animals that are available for adoption near you. View each animal individually and see which shelter or organization they're at.

Search for organizations in your area and see what animals they have available for adoption. View each organization to see their contact information.

Each animal and organization page includes a link to their full bio on Petfinder's website, as well as the organization's website if available.

Petfinder API requires key and secret. Oauth request created in pages\api\pf-oauth-token.js and called in pages_app.js. Token is passed to the rest of the app with React Context so any component can make API requests.
 
 

 
