# Nodejs Runtime Adapter

[![npm version](https://img.shields.io/npm/v/@discordhttps/nodejs-adapter.svg)](https://www.npmjs.com/package/@discordhttps/nodejs-adapter)
[![License](https://img.shields.io/npm/l/@discordhttps/nodejs-adapter.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@discordhttps/nodejs-adapter.svg)](https://www.npmjs.com/package/@discordhttps/nodejs-adapter)

**@discordhttps/nodejs-adapter** is an adapter for integrating [**discord.https**](https://www.npmjs.com/package/discord.https) with [Nodejs Runtime](https://nodejs.org).

## Installation

```bash
npm install @discordhttps/nodejs-adapter discord.https
```

## Usage

```typescript
import Client from "discord.https";
import NodeAdapter from "@discordhttps/nodejs-adapter";
const adapter = new NodeAdapter();

import UtilityRoute from "./command/utility/index.js";
import HelloRoute from "./command/fun/hello.js";

const client = new Client({
  token: process.env.TOKEN,
  publicKey: process.env.PUBLIC_KEY,
  httpAdapter: adapter,
  debug: true,
});

client.register(UtilityRoute, HelloRoute);

client.listen("interactions", 3000, () => {
  console.log("Server is active with the interaction webhook at /interactions");
});
```
