#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CdkFargateDemoStack } from '../lib/cdk-app-base-stack';

const app = new cdk.App();
new CdkFargateDemoStack(app, 'AppBase');
