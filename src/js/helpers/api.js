const apiRequestBase = async (endpoint, { method, ...config }, headers) => {
    let body;

    if (config.body) {
        body =
            config.body instanceof FormData
                ? config.body
                : JSON.stringify(config.body);
    }

    const response = await fetch(`${endpoint}`, {
        headers,
        method,
        body,
        mode: 'cors',
    });

    let data;

    if (response.status === 400) {
        data = await response.json();

        const errors = {};

        Object.keys(data?.details).forEach(key => {
            const currentErrors = data?.details[key];
            errors[key] = currentErrors[0]?.translation_key;
        });

        throw {
            status: response.status,
            details: errors,
        };
    }

    if (!response.ok) {
        data = await response.json();

        throw {
            status: response.status,
            details: data?.translation_key?.toLowerCase(),
        };
    }

    try {
        data = await response.json();
    } catch (e) {
        data = null;
    }

    // No content
    if (response.status === 204) {
        return { response, parsedBody: null };
    }

    return {
        response,
        data,
    };
};

export const apiRequest = async (
    endpoint,
    params = {},
    headers = {
        'Content-Type': 'application/json',
        // Authorization: `Basic ${btoa(`admin:654321`)}`,
    }
) => {
    const { data } = await apiRequestBase(endpoint, params, headers);
    return data;
};
