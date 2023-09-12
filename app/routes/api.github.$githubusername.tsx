import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
	const username = params["githubusername"];
	const token = process.env.GITHUB_API_TOKEN;

	if (!token || !username) {
		console.error("GitHub API token is missing.");
		return {};
	}

	const mostCommonLanguages = await getMostCommonLanguages(token, username);
	const contributionsData = await getContributions(token, username);

	const yearlyContributions =
		contributionsData.data.user.contributionsCollection.contributionCalendar
			.totalContributions;

	const data = {
		stats: [
			{ name: "Contributions this year", value: yearlyContributions },
			{
				name: "Average Weekly Contributions",
				value: (yearlyContributions / 52.143).toFixed(1),
			},
			{
				name: "Public Repositories",
				value: contributionsData.data.user.repositories.totalCount,
			},
		],
		language: mostCommonLanguages,
	};

	return data;
};

async function getMostCommonLanguages(token: string, username: string) {
	const query = `
    query {
      user(login: "${username}") {
        repositories(first: 100, orderBy: { field: UPDATED_AT, direction: DESC }) {
          nodes {
            languages(first: 10) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ query }),
	};

	try {
		const response = await fetch(
			"https://api.github.com/graphql",
			requestOptions
		);
		const result = await response.json();
		const repositories = result.data.user.repositories.nodes;
		const languageCounts: { [key: string]: number } = {};

		repositories.forEach((repo: any) => {
			repo.languages.edges.forEach((lang: any) => {
				const langName = lang.node.name;
				const langSize = lang.size;

				if (langName) {
					if (languageCounts[langName]) {
						languageCounts[langName] += langSize;
					} else {
						languageCounts[langName] = langSize;
					}
				}
			});
		});

		const mostCommonLanguages = Object.keys(languageCounts)
			.sort((a, b) => languageCounts[b] - languageCounts[a])
			.slice(0, 3);

		return mostCommonLanguages;
	} catch (error) {
		console.error("Error fetching most common languages:", error);
		return [];
	}
}

async function getContributions(token: string, username: string) {
	const body = {
		query: `query {
      user(login: "${username}") {
        name
        repositories {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            colors
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
                weekday
              }
              firstDay
            }
          }
        }
      }
    }`,
	};

	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`,
		},
		body: JSON.stringify(body),
	};

	try {
		const response = await fetch(
			"https://api.github.com/graphql",
			requestOptions
		);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching contributions data:", error);
		return {};
	}
}
