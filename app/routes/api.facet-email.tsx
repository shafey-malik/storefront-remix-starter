import { json, type ActionFunction } from '@remix-run/cloudflare';

interface FacetEmailRequest {
  email: string;
  selectedFacets: Record<string, string>;
  facetDetails: Array<{
    facetName: string;
    selectedValue: string;
  }>;
}

/**
 * Sends facet selections via email
 * POST /api/facet-email
 */
export const action: ActionFunction = async ({ request, context }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = (await request.json()) as FacetEmailRequest;
    const { email, facetDetails } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Validate facet selections
    if (!facetDetails || facetDetails.length === 0) {
      return json({ error: 'No facets selected' }, { status: 400 });
    }

    // Build email HTML
    const emailHTML = generateEmailHTML(email, facetDetails);

    // Send email using your preferred service
    // For now, we'll use a simple console log and return success
    // TODO: Integrate with actual email service (Resend, Nodemailer, SendGrid, etc.)
    console.log('Email sent to:', email);
    console.log('Facet selections:', facetDetails);

    // Example implementation with Resend (install: npm install resend)
    // const { Resend } = await import('resend');
    // const resend = new Resend(context.cloudflare.env.RESEND_API_KEY);
    // await resend.emails.send({
    //     from: 'noreply@yoursite.com',
    //     to: email,
    //     subject: 'Your Ring Customization Selections',
    //     html: emailHTML,
    // });

    return json(
      {
        success: true,
        message: 'Your selections have been sent to your email!',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending facet email:', error);
    return json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 },
    );
  }
};

/**
 * Generates HTML email template
 */
function generateEmailHTML(
  email: string,
  facetDetails: Array<{ facetName: string; selectedValue: string }>,
): string {
  const facetRows = facetDetails
    .map(
      (facet) =>
        `<tr style="border-bottom: 1px solid #e0e0e0;">
                    <td style="padding: 12px; font-weight: 600; color: #333;">${facet.facetName}</td>
                    <td style="padding: 12px; color: #666;">${facet.selectedValue}</td>
                </tr>`,
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 20px; background: #f9f9f9; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Your Ring Customization</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for customizing your perfect ring! Here are your selections:</p>
                
                <table>
                    <thead>
                        <tr style="background: #f0f0f0;">
                            <th style="padding: 12px; text-align: left; font-weight: 700;">Specification</th>
                            <th style="padding: 12px; text-align: left; font-weight: 700;">Your Selection</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${facetRows}
                    </tbody>
                </table>

                <p>Next steps:</p>
                <ul>
                    <li>Our team will review your selections</li>
                    <li>We'll contact you within 24 hours with pricing and availability</li>
                    <li>You can start the purchase process on your account</li>
                </ul>

                <p style="color: #666; font-size: 14px; margin-top: 30px;">
                    Questions? Reply to this email or contact our support team.
                </p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Your Store. All rights reserved.</p>
                <p>Sent to: ${email}</p>
            </div>
        </div>
    </body>
    </html>
    `;
}
