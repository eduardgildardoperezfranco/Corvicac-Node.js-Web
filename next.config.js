const configModule = await import("./695ee9f1ef7a3.next.config.js");
const config = configModule.default ?? configModule;

config.output = "standalone";

export default config;