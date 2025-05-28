import { selectActiveSubscriptions } from '../db/service/databaseService.js';
import { validate } from 'email-validator';
import client from '@sendgrid/client';
import { debug, info } from 'firebase-functions/logger';

const SECRETS = process.env.secrets
  ? JSON.parse(process.env.secrets)
  : { sendgrid: '' };

client.setApiKey(SECRETS.sendgrid);

export const syncTrimbleUsers = async () => {
  const allContacts = await selectActiveSubscriptions();
  // [{"Email":"", "AdditionalEmail":""}]
  const uniqueContacts = new Set();

  allContacts.forEach((contact) => {
    if (contact.Email) {
      uniqueContacts.add(contact.Email.trim().toLowerCase());
    }

    if (contact.AdditionalEmail) {
      contact.AdditionalEmail.split(',').forEach((email) => {
        uniqueContacts.add(email.trim().toLowerCase());
      });
    }
  });

  const contacts = Array.from(uniqueContacts.values())
    .filter(validate)
    .map((email) => ({
      email,
    }));

  upsertContacts(contacts);

  return contacts;
};

const upsertContacts = async (contacts) => {
  info(`upsert ${contacts.length} contacts`);

  const options = {
    url: `/v3/marketing/contacts`,
    method: 'PUT',
    body: {
      list_ids: ['e3148ee6-8ba7-488f-9c8c-cc882efba35a'],
      contacts,
    },
  };

  const request = await client.request(options);

  debug(
    'SendGrid response',
    {
      status: request[0].statusCode,
      body: request[0].body,
    },
    { structuredData: true },
  );
};
