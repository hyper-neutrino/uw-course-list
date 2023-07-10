module.exports = {
	apps: [
		{
			name: "uw-course-list",
			script: "build/index.js",
			env: {
				PORT: 5753
			}
		}
	]
}
