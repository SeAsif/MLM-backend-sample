const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SMTPSettingsSchema = new Schema({
  status: {
    type: Boolean,
    default: false,
  },
  mail: String,
  hostname: String,
  password: String,
  port: String,
});

const PaymentGatewaySettingsSchema = new Schema({
  client_key: String,
  secret_key: String,
});

const SiteSocialLinksSchema = new Schema({
  facebook: String,
  linkedIn: String,
  instagram: String,
  tiktok: String,
  twitter: String,
  youtube: String,
});

const SiteRelatedSettingsSchema = new Schema({
  site_title: String,
  site_description: String,
  site_address: String,
  site_phone_number: String,
  site_support_email: String,
  site_copyright_footer: String,
  social_links: SiteSocialLinksSchema,
});

const SiteSettingsSchema = new Schema({
  smtp_settings: SMTPSettingsSchema,
  payment_gateway_settings: PaymentGatewaySettingsSchema,
  site_settings: SiteRelatedSettingsSchema,
});

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
