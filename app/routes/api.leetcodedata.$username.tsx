import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

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

	const apiReqs = await Promise.all([
		getProfile,
		getSkills,
		getLanguages,
		getProblemSolvedSummary,
	]);

	const [profile, skills, languages, summary] = await Promise.all(
		apiReqs.map((r) => r.json())
	);

	const advancedTags = skills.data.matchedUser.tagProblemCounts.advanced.map(
		(tags: any) => {
			return { name: tags.tagName, solved: tags.problemsSolved };
		}
	);

	const intermediateTags =
		skills.data.matchedUser.tagProblemCounts.intermediate.map((tags: any) => {
			return { name: tags.tagName, solved: tags.problemsSolved };
		});

	const fundamentalTags =
		skills.data.matchedUser.tagProblemCounts.fundamental.map((tags: any) => {
			return { name: tags.tagName, solved: tags.problemsSolved };
		});

	const successRateOne =
		summary.data.matchedUser.problemsSolvedBeatsStats[0].percentage;
	const successRateTwo =
		summary.data.matchedUser.problemsSolvedBeatsStats[1].percentage;
	const successRateThree =
		summary.data.matchedUser.problemsSolvedBeatsStats[2].percentage;

	function calculateAverage(
		successRateOne: number | null,
		successRateTwo: number | null,
		successRateThree: number | null
	) {
		successRateOne = typeof successRateOne === "number" ? successRateOne : 0;
		successRateTwo = typeof successRateTwo === "number" ? successRateTwo : 0;
		successRateThree =
			typeof successRateThree === "number" ? successRateThree : 0;

		let average = (successRateOne + successRateTwo + successRateThree) / 3;
		const result = average !== 0 ? parseFloat(average.toFixed(2)) : null;
		return result;
	}

	const leetCodeSummary = [
		{
			name: "All",
			solved:
				summary.data.matchedUser.submitStatsGlobal.acSubmissionNum[0].count,
			total: summary.data.allQuestionsCount[0].count,
			successRate: calculateAverage(
				successRateOne,
				successRateTwo,
				successRateThree
			),
		},
		{
			name: "Easy",
			solved:
				summary.data.matchedUser.submitStatsGlobal.acSubmissionNum[1].count,
			total: summary.data.allQuestionsCount[1].count,
			successRate: successRateOne,
		},
		{
			name: "Medium",
			solved:
				summary.data.matchedUser.submitStatsGlobal.acSubmissionNum[2].count,
			total: summary.data.allQuestionsCount[2].count,
			successRate: successRateTwo,
		},
		{
			name: "Hard",
			solved:
				summary.data.matchedUser.submitStatsGlobal.acSubmissionNum[3].count,
			total: summary.data.allQuestionsCount[3].count,
			successRate: successRateThree,
		},
	];

	return json({
		prefferedLanguage: languages.data.matchedUser.languageProblemCount[0],
		rank: profile.data.matchedUser.profile.ranking,
		tags: { advancedTags, intermediateTags, fundamentalTags },
		leetCodeSummary,
	});
};
