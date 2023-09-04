import { useNavigation } from "@remix-run/react";
import { useCallback, useEffect, useRef } from "react";

export const UseFormClear = (actionValue: string) => {
	const navigation = useNavigation();
	const isAdding =
		navigation.state === "submitting" &&
		navigation.formData?.get("_action") === actionValue;

	const formRef = useRef<HTMLFormElement | null | undefined>();

	const setFormRef = useCallback((node: HTMLFormElement | null) => {
		formRef.current = node;
	}, []);

	useEffect(() => {
		if (!isAdding) {
			formRef.current?.reset();
		}
	}, [isAdding]);

	return { ref: setFormRef, isAdding };
};
