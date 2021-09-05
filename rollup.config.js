import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import rollupScss from "rollup-plugin-scss";
import css from "rollup-plugin-css-only";
import autoPreprocess from "svelte-preprocess";
import rollupCopy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "dist/js/app.js",
  },
  plugins: [
    rollupCopy({
      targets: [
        {
          src: "public/index.html",
          dest: "dist",
        },
        {
          src: "public/images",
          dest: "dist",
        },
      ],
    }),
    svelte({
      preprocess: autoPreprocess(),
      // preprocess: autoPreprocess({
      //   scss: {
      //     outputStyle: "compressed",
      //   },
      //   sourceMap: true,
      // }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    rollupScss({
      output: "dist/css/app.css",
      outputStyle: "compressed",
      outFile: "app.css",
      sourceMap: "app.css.map",
    }),
    // css({ output: "app.css" }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("dist"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
