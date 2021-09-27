#!/usr/bin/env node

"use strict";

const { pipeline } = require("stream");
const { Gzip, constants: { Z_BEST_COMPRESSION } } = require("zlib");

const neon = require("..");
const native = () => new Gzip({ level: Z_BEST_COMPRESSION });

const compress = process.argv[2] === "built-in" ? native : neon;

pipeline(
    process.stdin,
    native(),
    process.stdout,
    (err) => {
        if (err) {
            console.error(err);
            process.exitCode = -1;
        }
    }
);
