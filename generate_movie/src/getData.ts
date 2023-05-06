export const getTalks = async (path: string) => {
	const data = await getData(path);
	const talks = data
		.filter((obj) => obj.category === 'talk')
		//.map((obj) => obj.content);
	return talks;  
};

export const getData = async (path: string) => {
	const response = await fetch(path);
	const text = await response.text();
	const jsonData = text.split('\n').map(line => JSON.parse(line));
	return jsonData.filter(x=>x);
};
