import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: Object.entries(env)
                        .filter(([key]) => key.startsWith("VITE_"))
                        .map(([key, value]) => `$ENV_${key}: ${value};`)
                        .join("\n"),
                },
            },
        },
    };
});
