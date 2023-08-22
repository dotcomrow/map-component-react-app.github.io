const env = window && window.__env;

const envConfig = {
    TEST: env.TEST
};

Object.freeze(envConfig);

export {envConfig}