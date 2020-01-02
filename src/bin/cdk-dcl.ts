#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { CdkDCLStack } from "../lib/cdk-dcl-stack";

const app = new cdk.App();
new CdkDCLStack(app, "CdkDCLStack", { env: { region: "eu-west-1" } });

app.synth();
