import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import type { LeetCodeData } from "~/types";

const useLeetCodeFetcher = (leetcodeUsername: string | null) => {
	const leetFetcher = useFetcher();
	const stats = leetFetcher.data || ({} as LeetCodeData);

	useEffect(() => {
		if (leetcodeUsername) {
			leetFetcher.load(`/api/leetcode-users/${leetcodeUsername}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [leetcodeUsername]);

	return [stats, leetFetcher];
};

export default useLeetCodeFetcher;
