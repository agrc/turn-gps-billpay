# TURN GPS Bill Pay

[![Push Events](https://github.com/agrc/turn-gps-billpay/actions/workflows/push.yml/badge.svg)](https://github.com/agrc/turn-gps-billpay/actions/workflows/push.yml)

## What is TURN GPS Bill Pay

Runs on the Trimble Pivot Platform

TURN GPS is a statewide network of permanently located GPS receivers, which provides both real time corrections and data for post processing to those that have an active subscription.

This site allows users to pay for their annual subscription.

## What is this repo

Website and endpoints for TURN GPS Bill Pay

## Database

SQLServer

## Development

### .env and .secret

#### Root directory
Add .env using [.env.template](.env.template) as a template

#### functions directory
Add .env.local using [.env.local.template](functions/.env.local.template) as a template

Add .secret.local file with this template
SECRETS='{"govpay": {"apiKey": "xxx", "url":"xxx"}, 
"trimble": {"url": "xxx"}, 
"database": {"server": "xxx", "user": "xxx", "password": "xxx" , "name": "xxx"}}'

### Run locally

1. `npm install`
1. `firebase login`
1. `npm run dev`
1. Once everything is loaded, navigate to `http://localhost:5173/`
