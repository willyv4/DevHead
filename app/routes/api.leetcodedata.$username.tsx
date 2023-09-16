import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

type Tag = {
	tagName: string;
	problemsSolved: number;
};

type Tags = {
	advanced: Tag[];
	intermediate: Tag[];
	fundamental: Tag[];
};

export const loader: LoaderFunction = async ({ params }) => {
	const username = params["username"];
	const getProfile = fetch("https://leetcode.com/graphql/", {
		headers: {
			accept: "*/*",
			"accept-language": "en-US,en;q=0.9",
			authorization: "",
			baggage:
				"sentry-environment=production,sentry-release=7ae6db3d,sentry-transaction=%2Fu%2F%5Busername%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=9607a2bfea60483baa66e3fada43e427,sentry-sample_rate=0.03",
			"content-type": "application/json",
			"random-uuid": "d5d96c10-9848-e657-749d-1d88b5009e5c",
			"sec-ch-ua":
				'"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"macOS"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"sentry-trace": "9607a2bfea60483baa66e3fada43e427-9c49f6cdaf440a35-0",
			"x-csrftoken":
				"EjUNOpyuYzrJmDnSmzZP4ZjDwzFxpxYLxHSrv7Nsu9JlAndATvbKdTS9qqgjeFbR",
		},
		referrer: `https://leetcode.com/${username}/`,
		referrerPolicy: "strict-origin-when-cross-origin",
		body: `{"query":"\\n    query userPublicProfile($username: String!) {\\n  matchedUser(username: $username) {\\n    contestBadge {\\n      name\\n      expired\\n      hoverText\\n      icon\\n    }\\n    username\\n    githubUrl\\n    twitterUrl\\n    linkedinUrl\\n    profile {\\n      ranking\\n      userAvatar\\n      realName\\n      aboutMe\\n      school\\n      websites\\n      countryName\\n      company\\n      jobTitle\\n      skillTags\\n      postViewCount\\n      postViewCountDiff\\n      reputation\\n      reputationDiff\\n      solutionCount\\n      solutionCountDiff\\n      categoryDiscussCount\\n      categoryDiscussCountDiff\\n    }\\n  }\\n}\\n    ","variables":{"username":"${username}"},"operationName":"userPublicProfile"}`,
		method: "POST",
		mode: "cors",
		credentials: "include",
	});

	const getSkills = fetch("https://leetcode.com/graphql/", {
		headers: {
			accept: "*/*",
			"accept-language": "en-US,en;q=0.9",
			authorization: "",
			baggage:
				"sentry-environment=production,sentry-release=7ae6db3d,sentry-transaction=%2Fu%2F%5Busername%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=9607a2bfea60483baa66e3fada43e427,sentry-sample_rate=0.03",
			"content-type": "application/json",
			"random-uuid": "d5d96c10-9848-e657-749d-1d88b5009e5c",
			"sec-ch-ua":
				'"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"macOS"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"sentry-trace": "9607a2bfea60483baa66e3fada43e427-a612cc91e03f7844-0",
			"x-csrftoken":
				"EjUNOpyuYzrJmDnSmzZP4ZjDwzFxpxYLxHSrv7Nsu9JlAndATvbKdTS9qqgjeFbR",
		},
		referrer: `https://leetcode.com/${username}/`,
		referrerPolicy: "strict-origin-when-cross-origin",
		body: `{"query":"\\n    query skillStats($username: String!) {\\n  matchedUser(username: $username) {\\n    tagProblemCounts {\\n      advanced {\\n        tagName\\n        tagSlug\\n        problemsSolved\\n      }\\n      intermediate {\\n        tagName\\n        tagSlug\\n        problemsSolved\\n      }\\n      fundamental {\\n        tagName\\n        tagSlug\\n        problemsSolved\\n      }\\n    }\\n  }\\n}\\n    ","variables":{"username":"${username}"},"operationName":"skillStats"}`,
		method: "POST",
		mode: "cors",
		credentials: "include",
	});

	const getLanguages = fetch("https://leetcode.com/graphql/", {
		headers: {
			accept: "*/*",
			"accept-language": "en-US,en;q=0.9",
			authorization: "",
			baggage:
				"sentry-environment=production,sentry-release=7ae6db3d,sentry-transaction=%2Fu%2F%5Busername%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=9607a2bfea60483baa66e3fada43e427,sentry-sample_rate=0.03",
			"content-type": "application/json",
			"random-uuid": "d5d96c10-9848-e657-749d-1d88b5009e5c",
			"sec-ch-ua":
				'"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"macOS"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"sentry-trace": "9607a2bfea60483baa66e3fada43e427-9e2b763f6ab843f9-0",
			"x-csrftoken":
				"EjUNOpyuYzrJmDnSmzZP4ZjDwzFxpxYLxHSrv7Nsu9JlAndATvbKdTS9qqgjeFbR",
		},
		referrer: `https://leetcode.com/${username}/`,
		referrerPolicy: "strict-origin-when-cross-origin",
		body: `{"query":"\\n    query languageStats($username: String!) {\\n  matchedUser(username: $username) {\\n    languageProblemCount {\\n      languageName\\n      problemsSolved\\n    }\\n  }\\n}\\n    ","variables":{"username":"${username}"},"operationName":"languageStats"}`,
		method: "POST",
		mode: "cors",
		credentials: "include",
	});

	const getProblemSolvedSummary = fetch("https://leetcode.com/graphql/", {
		headers: {
			accept: "*/*",
			"accept-language": "en-US,en;q=0.9",
			authorization: "",
			baggage:
				"sentry-environment=production,sentry-release=d324b9e9,sentry-transaction=%2Fu%2F%5Busername%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=b191700a75bc44618410960442c6f6e0,sentry-sample_rate=0.03,sentry-replay_id=fd0c7af88ca7453097389277976002da",
			"content-type": "application/json",
			"random-uuid": "d288408b-52d5-746f-2b5b-798bb5e09763",
			"sec-ch-ua":
				'"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"macOS"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"sentry-trace": "b191700a75bc44618410960442c6f6e0-b13b2407706c659c-0",
			"x-csrftoken":
				"czDD35OEzd12TUOAdRHxc2kyGDQPCypwekUrf9HoPwTcpI0U20fYdZysod33rObw",
		},
		referrer: `https://leetcode.com/${username}`,
		referrerPolicy: "strict-origin-when-cross-origin",
		body: `{"query":"\\n    query userProblemsSolved($username: String!) {\\n  allQuestionsCount {\\n    difficulty\\n    count\\n  }\\n  matchedUser(username: $username) {\\n    problemsSolvedBeatsStats {\\n      difficulty\\n      percentage\\n    }\\n    submitStatsGlobal {\\n      acSubmissionNum {\\n        difficulty\\n        count\\n      }\\n    }\\n  }\\n}\\n    ","variables":{"username":"${username}"},"operationName":"userProblemsSolved"}`,
		method: "POST",
		mode: "cors",
		credentials: "include",
	});

	try {
		// Fetch data from multiple API endpoints
		const apiReqs = await Promise.all([
			getProfile,
			getSkills,
			getLanguages,
			getProblemSolvedSummary,
		]);

		//Parse the JSON responses
		const [profile, skills, languages, summary] = await Promise.all(
			apiReqs.map((r) => r.json())
		);

		//Define a helper function to map tags
		const mapTags = (tagList: Tag[]) =>
			tagList.map((tags: Tag) => ({
				name: tags.tagName,
				solved: tags.problemsSolved,
			}));

		// Extract advanced, intermediate, and fundamental tags
		function extractTagLists(tagProblemCounts: Tags) {
			const advancedTags = mapTags(tagProblemCounts.advanced);
			const intermediateTags = mapTags(tagProblemCounts.intermediate);
			const fundamentalTags = mapTags(tagProblemCounts.fundamental);

			return {
				advancedTags,
				intermediateTags,
				fundamentalTags,
			};
		}

		//Extract success rates
		const successRates: number[] =
			summary.data.matchedUser.problemsSolvedBeatsStats.map(
				(stats: { percentage: string }) => stats.percentage
			);

		//function to calculate the average of success rates
		function calculateAverage(successRates: number[]) {
			const validSuccessRates = successRates.filter(
				(rate) => typeof rate === "number"
			);
			if (validSuccessRates.length === 0) return null;

			const sum = validSuccessRates.reduce((total, rate) => total + rate, 0);
			const average = sum / validSuccessRates.length;

			return parseFloat(average.toFixed(2));
		}

		//Calculate LeetCode summary
		const leetCodeSummary = [
			{ name: "All", idx: 0 },
			{ name: "Easy", idx: 1 },
			{ name: "Medium", idx: 2 },
			{ name: "Hard", idx: 3 },
		].map((category) => ({
			name: category.name,
			solved:
				summary.data.matchedUser.submitStatsGlobal.acSubmissionNum[category.idx]
					.count,
			total: summary.data.allQuestionsCount[category.idx].count,
			successRate:
				category.name === "All"
					? calculateAverage(successRates)
					: category.idx === 1
					? successRates[0]
					: category.idx === 2
					? successRates[1]
					: successRates[2],
		}));

		return json({
			prefferedLanguage: languages.data.matchedUser.languageProblemCount[0],
			rank: profile.data.matchedUser.profile.ranking,
			tags: extractTagLists(skills.data.matchedUser.tagProblemCounts),
			leetCodeSummary,
		});
	} catch (error) {
		return json({ success: false, status: 500, error: error });
	}
};
