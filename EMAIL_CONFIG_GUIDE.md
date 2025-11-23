# Email Configuration Guide

## Overview
KmerHosting uses multiple email addresses for different purposes. Each email can be configured independently in the `.env.local` file.

## Email Types and Their Uses

### 1. **NOREPLY** (Account Creation & Notifications)
- **Purpose**: Sending OTP verification codes and welcome emails during signup
- **Environment Variables**:
  ```
  MAILTRAP_EMAIL_NOREPLY="noreply@kmerhosting.com"
  MAILTRAP_NAME_NOREPLY="KmerHosting"
  ```
- **Used In**: `sendOTPEmail()`, `sendWelcomeEmail()`
- **Usage Example**:
  ```typescript
  import { sendOTPEmail, sendWelcomeEmail } from "@/lib/mailer";
  
  // Send OTP for account verification
  await sendOTPEmail(userEmail, userName, otp);
  
  // Send welcome email after verification
  await sendWelcomeEmail(userEmail, userName);
  ```

### 2. **BILLING** (Invoice & Payment Emails)
- **Purpose**: Sending invoices, payment reminders, and billing notifications
- **Environment Variables**:
  ```
  MAILTRAP_EMAIL_BILLING="billing@kmerhosting.com"
  MAILTRAP_NAME_BILLING="KmerHosting Billing"
  ```
- **Function**: `sendBillingEmail()`
- **Usage Example**:
  ```typescript
  import { sendBillingEmail } from "@/lib/mailer";
  
  const htmlContent = `
    <h2>Invoice #INV-001</h2>
    <p>Amount: XAF 50,000</p>
    <p>Due Date: 2025-12-31</p>
  `;
  
  await sendBillingEmail(
    customerEmail,
    customerName,
    "Your Invoice #INV-001",
    htmlContent
  );
  ```

### 3. **SALES** (Promotional & Offer Emails)
- **Purpose**: Sending promotional offers, service upgrades, and sales communications
- **Environment Variables**:
  ```
  MAILTRAP_EMAIL_SALES="sales@kmerhosting.com"
  MAILTRAP_NAME_SALES="KmerHosting Sales"
  ```
- **Function**: `sendSalesEmail()`
- **Usage Example**:
  ```typescript
  import { sendSalesEmail } from "@/lib/mailer";
  
  const htmlContent = `
    <h2>Special Offer: 50% Off VPS Hosting</h2>
    <p>Limited time offer. Upgrade your service today!</p>
  `;
  
  await sendSalesEmail(
    customerEmail,
    customerName,
    "Special Offer Just For You!",
    htmlContent
  );
  ```

### 4. **SUPPORT** (Customer Support Emails)
- **Purpose**: Support tickets, responses to customer inquiries, and technical assistance
- **Environment Variables**:
  ```
  MAILTRAP_EMAIL_SUPPORT="support@kmerhosting.com"
  MAILTRAP_NAME_SUPPORT="KmerHosting Support"
  ```
- **Function**: `sendSupportEmail()`
- **Usage Example**:
  ```typescript
  import { sendSupportEmail } from "@/lib/mailer";
  
  const htmlContent = `
    <h2>Ticket #SUP-12345</h2>
    <p>Your issue has been resolved. Here's how we fixed it...</p>
  `;
  
  await sendSupportEmail(
    customerEmail,
    customerName,
    "Your Support Ticket Has Been Resolved",
    htmlContent
  );
  ```

### 5. **ADMIN** (Internal Admin Notifications)
- **Purpose**: System alerts, admin notifications, and internal communications
- **Environment Variables**:
  ```
  MAILTRAP_EMAIL_ADMIN="admin@kmerhosting.com"
  MAILTRAP_NAME_ADMIN="KmerHosting Admin"
  ```
- **Note**: Not yet implemented in mailer.ts, but can be added following the same pattern
- **Future Usage Example**:
  ```typescript
  export async function sendAdminNotification(
    subject: string,
    htmlContent: string
  ): Promise<void> {
    // Implementation here
  }
  ```

## Configuration Steps

### Step 1: Update `.env.local`
Add or modify these variables in your `.env.local` file:

```env
# Mailtrap API Token
MAILTRAP_TOKEN="3c233769875d14686ebf797885690f2c"

# Email Configuration
MAILTRAP_EMAIL_NOREPLY="noreply@kmerhosting.com"
MAILTRAP_NAME_NOREPLY="KmerHosting"

MAILTRAP_EMAIL_BILLING="billing@kmerhosting.com"
MAILTRAP_NAME_BILLING="KmerHosting Billing"

MAILTRAP_EMAIL_SALES="sales@kmerhosting.com"
MAILTRAP_NAME_SALES="KmerHosting Sales"

MAILTRAP_EMAIL_SUPPORT="support@kmerhosting.com"
MAILTRAP_NAME_SUPPORT="KmerHosting Support"

MAILTRAP_EMAIL_ADMIN="admin@kmerhosting.com"
MAILTRAP_NAME_ADMIN="KmerHosting Admin"
```

### Step 2: Restart the Development Server
```bash
npm run dev
```

## Adding New Email Functions

To add a new email function for a different purpose:

1. **Add environment variables** in `.env.local`:
   ```env
   MAILTRAP_EMAIL_CUSTOM="custom@kmerhosting.com"
   MAILTRAP_NAME_CUSTOM="KmerHosting Custom"
   ```

2. **Add to `emailConfig` object** in `lib/mailer.ts`:
   ```typescript
   const emailConfig = {
     // ... existing configs
     custom: {
       address: process.env.MAILTRAP_EMAIL_CUSTOM || "custom@kmerhosting.com",
       name: process.env.MAILTRAP_NAME_CUSTOM || "KmerHosting Custom",
     },
   };
   ```

3. **Create the function** in `lib/mailer.ts`:
   ```typescript
   export async function sendCustomEmail(
     recipientEmail: string,
     recipientName: string,
     subject: string,
     htmlContent: string
   ): Promise<void> {
     try {
       await transport.sendMail({
         from: emailConfig.custom,
         to: recipientEmail,
         subject: subject,
         html: htmlContent,
         category: "Custom",
       });
     } catch (error) {
       console.error("Failed to send custom email:", error);
       throw new Error("Failed to send custom email");
     }
   }
   ```

4. **Use it in your code**:
   ```typescript
   import { sendCustomEmail } from "@/lib/mailer";
   
   await sendCustomEmail(email, name, "Subject", "<h2>HTML Content</h2>");
   ```

## Mailtrap Sandbox vs Production

### During Development (Sandbox)
- All emails are sent to Mailtrap inbox
- No real emails are sent to users
- Great for testing
- Current setup uses Sandbox by default

### Moving to Production
When ready to send real emails:

1. Verify your sender email addresses in Mailtrap dashboard
2. Update `.env.local` or production environment variables with real email addresses
3. Keep using the same Mailtrap token (API Token works for both sandbox and production)
4. Mailtrap will automatically send real emails based on sender configuration

## Testing Email Sending

### Test OTP Email
```typescript
// In your API or test file
import { sendOTPEmail } from "@/lib/mailer";

await sendOTPEmail("test@example.com", "Test User", "123456");
```

### Check Mailtrap Dashboard
1. Go to https://mailtrap.io
2. Login with your account
3. Navigate to "Email Delivery" → "Inbox"
4. View all test emails sent

## Troubleshooting

### Emails Not Sending
1. Check `.env.local` has `MAILTRAP_TOKEN` set
2. Ensure token is correct: `3c233769875d14686ebf797885690f2c`
3. Verify network connection
4. Check server logs for error messages

### Wrong Sender Email
1. Verify email address in `.env.local`
2. Clear environment cache: restart dev server
3. Check Mailtrap dashboard for blocked senders

### Email Not in Inbox
1. Check Mailtrap "Email Delivery" tab
2. Look in Spam/Junk filters
3. Review email logs for errors

## Security Notes

- ✅ Never commit `.env.local` to version control
- ✅ Use environment-specific email addresses
- ✅ Rotate tokens regularly in production
- ✅ Use HTTPS in production
- ✅ Keep Mailtrap token private

## Current Implementation

- **Noreply**: ✅ Fully implemented (OTP & Welcome emails)
- **Billing**: ⚠️ Function available, not yet used
- **Sales**: ⚠️ Function available, not yet used
- **Support**: ⚠️ Function available, not yet used
- **Admin**: ❌ Not yet implemented

These can be integrated as features are added to the system.
