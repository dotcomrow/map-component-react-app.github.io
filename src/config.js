const env = window && window.__env;

const envConfig = {
    TEST: env.TEST,
    OL_LAYER_URL: env.OL_LAYER_URL,
    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID
};

Object.freeze(envConfig);

export {envConfig}