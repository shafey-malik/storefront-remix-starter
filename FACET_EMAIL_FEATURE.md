# Facet Selection Email Feature - Setup & Implementation Guide

## Overview

This feature allows users to select ring customization facets (shape, setting, metal, size, carat) and submit their selections via email.

## Features Implemented

### 1. **Custom Form Component** (`app/routes/custom.tsx`)

- Dynamic facet selection dropdowns
- Email input field with validation
- Real-time form state management
- Success/error message alerts
- Loading state handling
- "Send My Selection" button to email preferences
- "Search Rings" button to search products
- Reset button to clear all selections

### 2. **API Endpoint** (`app/routes/api.facet-email.tsx`)

- POST endpoint at `/api/facet-email`
- Validates email and facet selections
- Generates HTML email template
- Ready for email service integration
- Structured error handling

## What Was Added

### Files Created:

- `app/routes/api.facet-email.tsx` - Email submission API endpoint

### Files Modified:

- `app/routes/custom.tsx` - Added email form, submission logic, and UI feedback

## Next Steps: Email Service Integration

### Option 1: **Resend** (Recommended - Easiest)

```bash
npm install resend
```

Update `api.facet-email.tsx`:

```typescript
import { Resend } from 'resend';

export const action: ActionFunction = async ({ request, context }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = (await request.json()) as FacetEmailRequest;
    const { email, facetDetails } = body;

    // Validation...
    const emailHTML = generateEmailHTML(email, facetDetails);

    const resend = new Resend(context.cloudflare.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'noreply@yourstore.com',
      to: email,
      subject: 'Your Ring Customization Selections',
      html: emailHTML,
    });

    return json({
      success: true,
      message: 'Your selections have been sent to your email!',
    });
  } catch (error) {
    console.error('Error:', error);
    return json({ error: 'Failed to send email' }, { status: 500 });
  }
};
```

### Option 2: **Nodemailer** (For SMTP)

```bash
npm install nodemailer
```

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: context.cloudflare.env.SMTP_HOST,
  port: context.cloudflare.env.SMTP_PORT,
  secure: true,
  auth: {
    user: context.cloudflare.env.SMTP_USER,
    pass: context.cloudflare.env.SMTP_PASSWORD,
  },
});

await transporter.sendMail({
  from: context.cloudflare.env.FROM_EMAIL,
  to: email,
  subject: 'Your Ring Customization Selections',
  html: emailHTML,
});
```

### Option 3: **SendGrid**

```bash
npm install @sendgrid/mail
```

### Option 4: **Mailgun**

```bash
npm install mailgun.js
```

## Environment Variables

Add to your `.env` / environment configuration:

```env
# For Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# For SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
FROM_EMAIL=noreply@yourstore.com

# For SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
```

## API Endpoint Details

### Request Format

```json
{
  "email": "user@example.com",
  "selectedFacets": {
    "shape": "facet-id-1",
    "setting": "facet-id-2",
    "metal": "facet-id-3",
    "size": "facet-id-4"
  },
  "facetDetails": [
    {
      "facetName": "Shape",
      "selectedValue": "Round"
    },
    {
      "facetName": "Setting",
      "selectedValue": "Solitaire"
    }
  ]
}
```

### Response Format

**Success (200):**

```json
{
  "success": true,
  "message": "Your selections have been sent to your email!"
}
```

**Error (400/500):**

```json
{
  "error": "Invalid email address"
}
```

## Validation Rules

The form validates:

1. **Email**: Must be valid email format (contains @ and .)
2. **Facets**: At least one facet must be selected
3. **Server-side**: Additional validation on API endpoint

## Email Template

The generated email includes:

- Professional HTML layout with gradient header
- Table showing all selected facets
- Next steps information
- Footer with email recipient confirmation

Customize the template in `generateEmailHTML()` function in `api.facet-email.tsx`.

## Frontend Flow

1. User selects facets from dropdowns
2. User enters their email address
3. User clicks "Send My Selection"
4. Form validates input
5. Data sent to `/api/facet-email`
6. Success/error message displayed
7. Form auto-clears after 3 seconds on success

## Testing

### Manual Testing:

1. Fill in facet selections
2. Enter valid email (e.g., test@example.com)
3. Click "Send My Selection"
4. Verify network request in DevTools
5. Check API response

### With Email Service:

1. Configure email service credentials
2. Test with real email address
3. Verify email is received
4. Check email formatting

## Troubleshooting

**Email not sending:**

- Check API key is valid and active
- Verify environment variables are set
- Check email service rate limits
- Review console logs for errors

**Validation errors:**

- Ensure email format is valid
- Select at least one facet
- Check for typos in form data

**CORS issues:**

- The endpoint is same-origin, should not have CORS issues
- Check that fetch is going to `/api/facet-email`

## Future Enhancements

1. **Database Integration**: Store selections in database for admin review
2. **Email Notifications**: Send admin notification when selections received
3. **Order Integration**: Create draft order from selections
4. **PDF Generation**: Attach PDF with selections to email
5. **Wishlist**: Allow users to save selections to account
6. **Tracking**: Add email tracking/engagement metrics
7. **Multi-language**: Localize email content based on user preference
8. **Admin Dashboard**: View received selections and customer interactions

## Code Organization

```
app/
├── routes/
│   ├── custom.tsx                 # Main custom selector page
│   └── api.facet-email.tsx        # Email submission endpoint
└── ...
```

## Performance Considerations

- Client-side validation prevents unnecessary API calls
- Email generation is synchronous, consider async for high volume
- Consider implementing rate limiting on API endpoint
- Store submissions in database for scalability
