export type InputChangeEvent<T = any> = {
	target: {
		name: string
		value: T
	}
};

export const getInputChangeData = (e: InputChangeEvent): {[key: string]: any} => {
	const key = e.target.name;
	const value = e.target.value;

	return {[key]: value};
};
