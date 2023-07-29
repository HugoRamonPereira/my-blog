class HttpClient {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async get(path: string) {
		const response = await fetch(`${this.baseURL}${path}`);
		return response.json();
	}
}

export default HttpClient;