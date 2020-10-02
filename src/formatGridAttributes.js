export function formatGridAttributes(str) {
    const res = str
        .replace(/\s/g, '')
        .split(';')
        .reduce((acc, attr) => {
            const [key, value] = attr.split(':');
            return {
                ...acc,
                [snakeToCamel(key)]: value,
            };
        }, {});

    return res;
}

const snakeToCamel = str =>
    str.replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace('-', '').replace('_', '')
    );
