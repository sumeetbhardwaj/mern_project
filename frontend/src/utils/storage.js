
const storage = {
	getToken: () => {
		return JSON.parse(window.localStorage.getItem("token") );
	},
	setToken: (token) => {
		window.localStorage.setItem("token", JSON.stringify(token));
	},
	clearToken: () => {
		window.localStorage.removeItem("token");
	},
};

export default storage;