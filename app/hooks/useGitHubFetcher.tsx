import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

function useGitHubFetcher(githubUsername: string | null) {
	const gitHubFetcher = useFetcher();
	const languages: string[] = gitHubFetcher.data?.language;
	const stats = gitHubFetcher.data?.stats;

	useEffect(() => {
		if (githubUsername) gitHubFetcher.load(`/api/github/${githubUsername}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [githubUsername]);

	return [languages, stats, gitHubFetcher];
}

export default useGitHubFetcher;
