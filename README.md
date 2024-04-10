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

### Initial setup steps

See [google doc](https://docs.google.com/document/d/14j7817psXXKBa9vGuP0nd6bKcxYuDeeCdYWES7kQ65Y/edit?usp=sharing)

### Govpay / FINET / DTS Billing

- This app sends order number, item name and description to GovPay
- The user makes a payment to GovPay
- GovPay sends export to DTS billing
- DTS billing reconciles the item name or description to a vendor in FINET
  - FINET State Warehouse "Vendor_Customer" table, Legal_Name or Company_Name
- This app/trimble has an organization and login name
- The "Customer Name" DTS billing refers to is the organization name not login name

### Run locally

1. `npm install`
1. `firebase login`
1. `npm run dev`
1. Once everything is loaded, navigate to `http://localhost:5173/`
