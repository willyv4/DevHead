import { useCallback, useEffect, useRef } from "react";

export const useFormClear = (isAdding: boolean) => {
	const formRef = useRef<HTMLFormElement | null | undefined>();
	const setFormRef = useCallback((node: HTMLFormElement | null) => {
		formRef.current = node;
	}, []);

	useEffect(() => {
		if (!isAdding) {
			formRef.current?.reset();
		}
	}, [isAdding]);

	return { ref: setFormRef };
};
