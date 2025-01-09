const VALID_FINAL_PATH = /\w+/;

function updateFieldWithFormData<T>(modelRef: T, path: string, attrValue: string): T {
    const fieldRegex = /^\.?(\w+)/;
    const match = fieldRegex.exec(path);

    if (match && match[1]) {
        const field = match[1];
        const remainingPath = path.slice(match[0].length);

        // Ensure modelRef is treated as an object with string keys
        if (typeof modelRef === 'object' && modelRef !== null) {
            // Type cast to Record<string, any> to allow string indexing
            const modelObj = modelRef as Record<string, any>;
            modelObj[field] = updateFieldWithFormData(modelObj[field] || {}, remainingPath, attrValue);
        }
    } else {
        if (path.length !== 0 && !VALID_FINAL_PATH.test(path)) {
            throw new Error(`Invalid path for object: ${path}`);
        }
        return attrValue as any;
    }

    return modelRef;
}

export default function <T>(baseData: T, data: { [key: string]: string }): T {
	Object.keys(data).forEach(attr => {
		baseData = updateFieldWithFormData(baseData, attr, data[attr])
	})

	return baseData;
}
