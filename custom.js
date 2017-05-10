const countries =[];
const request = new Request('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
        fetch(request)
            .then(blob => blob.json())
            .then(data => {
            	countries.push(...data)
            	console.log(countries);
					});


function findMatches(wordToMatch, countries){
	return countries.filter(place=>{
		const regex = new RegExp(wordToMatch, 'gi');
		
		return place.name.common.match(regex);
	});
}

function displayMatches(){
	
	const matchArray = findMatches(this.value, countries);
	const displayHtml = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
		const cityName = place.name.common.replace(regex, `<span class="highlighted">${this.value}</span>`);
		return `
		<li><span class="name">${cityName}</span></li>
		<li><span class="capital">capital: ${place.capital}</span></li>
		<li><span class="region">region: ${place.subregion}</span></li>
		<li><span class="borders">has borders with: ${place.borders}</span></li>
		`;
	}).join('');
	suggestions.innerHTML = displayHtml;
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
            	