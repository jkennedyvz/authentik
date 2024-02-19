import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import path from "path";
import copy from "rollup-plugin-copy";
import cssimport from "rollup-plugin-cssimport";

import { DIST, defaultOptions, isProdBuild, manualChunks, resources } from "../../rollup.base.mjs";

export const POLY = {
    input: "./src/polyfill/poly.ts",
    output: [
        {
            format: "iife",
            file: path.join(DIST, "poly.js"),
            sourcemap: true,
        },
    ],
    cache: true,
    plugins: [
        cssimport(),
        nodeResolve({ browser: true }),
        commonjs(),
        isProdBuild && terser(),
        copy({
            targets: [...resources],
            copyOnce: false,
        }),
    ].filter((p) => p),
};

export const standalone = ["api-browser", "loading"].map((input) => {
    return {
        input: `./src/standalone/${input}`,
        output: [
            {
                format: "es",
                dir: path.join(DIST, "standalone", input),
                sourcemap: true,
                manualChunks: manualChunks,
            },
        ],
        ...defaultOptions,
    };
});

export const enterprise = ["rac"].map((input) => {
    return {
        input: `./src/enterprise/${input}`,
        output: [
            {
                format: "es",
                dir: path.join(DIST, "enterprise", input),
                sourcemap: true,
                manualChunks: manualChunks,
            },
        ],
        ...defaultOptions,
    };
});

export default [
    POLY,
    // Standalone
    ...standalone,
    // Flow interface
    {
        input: "./src/flow/FlowInterface.ts",
        output: [
            {
                format: "es",
                dir: path.join(DIST, "flow"),
                sourcemap: true,
                manualChunks: manualChunks,
            },
        ],
        ...defaultOptions,
    },
    // Admin interface
    {
        input: "./src/admin/AdminInterface/AdminInterface.ts",
        output: [
            {
                format: "es",
                dir: path.join(DIST, "admin"),
                sourcemap: true,
                manualChunks: manualChunks,
            },
        ],
        ...defaultOptions,
    },
    // User interface
    {
        input: "./src/user/UserInterface.ts",
        output: [
            {
                format: "es",
                dir: path.join(DIST, "user"),
                sourcemap: true,
                manualChunks: manualChunks,
            },
        ],
        ...defaultOptions,
    },
    // Enterprise
    ...enterprise,
];