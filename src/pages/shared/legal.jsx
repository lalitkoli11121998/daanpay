/* ============================================================
   Shared legal modals (Privacy Policy + Refund Policy)
   Include this on every page, then mark any trigger element with:
     data-modal="privacy"   or   data-modal="refund"
   e.g. <a href="#" data-modal="privacy">Privacy policy</a>
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var DRAFT_NOTICE =
    '<div class="legal-draft-notice">' +
      '<svg viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01M10.3 3.9L2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="#7A5A1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<p><strong>Draft for review.</strong> This is placeholder policy text to help you launch — have it reviewed by a lawyer familiar with Indian data protection (DPDP Act) and payment regulations before this goes live to real donors.</p>' +
    '</div>';

  var LEGAL_CONTENT = {
    terms: {
      title: 'Terms of Service',
      updated: 'Last updated: —',
      body:
        DRAFT_NOTICE +
        '<h3>Using Daanpay</h3>' +
        '<p>By using Daanpay, you agree to use the platform lawfully and provide accurate information when making a donation.</p>' +
        '<h3>Donations</h3>' +
        '<p>Donations are voluntary offerings made to the selected temple. You are responsible for checking the temple and donation details before confirming payment.</p>' +
        '<h3>Accounts and security</h3>' +
        '<p>Keep your account and payment information secure. Do not share passwords, one-time passwords, or UPI PINs with anyone.</p>' +
        '<h3>Platform availability</h3>' +
        '<p>We work to keep Daanpay available and accurate, but services may occasionally be interrupted for maintenance, updates, or reasons outside our control.</p>' +
        '<h3>Contact</h3>' +
        '<div class="legal-contact-box"><p>Questions about these terms? Contact us at <strong>lalitkoli11121998@gmail.com</strong>.</p></div>'
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: —',
      body:
        DRAFT_NOTICE +
        '<h3>Overview</h3>' +
        '<p>Daanpay ("we", "us") respects your privacy. This policy explains what information we collect when you use our platform to donate to temples, how we use it, and the choices you have.</p>' +

        '<h3>Information we collect</h3>' +
        '<ul>' +
          '<li>Contact details you provide, such as your name, email, or phone number, when you make a donation or create an account.</li>' +
          '<li>Donation details, such as the temple, amount, and purpose of your offering.</li>' +
          '<li>Technical information, such as your device and browser type, used to keep the platform secure and working correctly.</li>' +
        '</ul>' +

        '<h3>Payment information</h3>' +
        '<p>We do not collect or store your card number, CVV, or UPI PIN. Payments are processed directly by our licensed payment gateway partner(s), who handle that information under their own security and compliance standards.</p>' +

        '<h3>How we use your information</h3>' +
        '<ul>' +
          '<li>To process your donation and send you a receipt.</li>' +
          '<li>To communicate with you about your donation, such as confirming a payment or resolving an issue.</li>' +
          '<li>To improve and secure the platform.</li>' +
        '</ul>' +

        '<h3>Sharing of information</h3>' +
        '<p>We share the minimum information necessary with: the temple you\'re donating to (for receipt and record-keeping purposes), our payment gateway partner(s) (to process the transaction), and legal or government authorities where required by law.</p>' +
        '<p>We do not sell your personal information to third parties.</p>' +

        '<h3>Cookies</h3>' +
        '<p>We use basic cookies to keep you logged in and to understand how the platform is used, so we can improve it over time.</p>' +

        '<h3>Data security</h3>' +
        '<p>We use industry-standard measures, including encryption in transit, to protect your information. No system is completely secure, but we work to keep your data as safe as possible.</p>' +

        '<h3>Your rights</h3>' +
        '<p>You can request access to, correction of, or deletion of your personal information by contacting us using the details below.</p>' +

        '<h3>Children\'s privacy</h3>' +
        '<p>Daanpay is not directed at children under 18, and we do not knowingly collect information from them.</p>' +

        '<h3>Changes to this policy</h3>' +
        '<p>We may update this policy from time to time. Significant changes will be noted on this page.</p>' +

        '<div class="legal-contact-box"><p>Questions about this policy? Contact us at <strong>lalitkoli11121998@gmail.com</strong> (placeholder — update with your real support email).</p></div>'
    },

    refund: {
      title: 'Refund & Cancellation Policy',
      updated: 'Last updated: —',
      body:
        DRAFT_NOTICE +
        '<h3>Nature of donations</h3>' +
        '<p>Donations made through Daanpay are voluntary religious offerings made directly to a temple. As such, donations are generally <strong>non-refundable</strong> once successfully processed, except in the specific situations below.</p>' +

        '<h3>When a refund may apply</h3>' +
        '<ul>' +
          '<li>You were charged more than once for the same donation due to a technical error.</li>' +
          '<li>A payment was deducted from your account but the donation was not recorded as successful on our platform.</li>' +
          '<li>The transaction was unauthorized (for example, your payment method was used without your permission).</li>' +
        '</ul>' +

        '<h3>Failed or pending payments</h3>' +
        '<p>If a payment shows as <strong>failed</strong>, no amount was deducted from your account — no refund is needed in this case. If a payment shows as <strong>pending</strong>, please wait for it to resolve before assuming a refund is required; most pending payments confirm automatically within a short time.</p>' +

        '<h3>How to request a refund</h3>' +
        '<p>Contact our support team with your transaction ID within 7 days of the donation. We\'ll investigate and respond within a reasonable timeframe.</p>' +

        '<h3>Refund processing time</h3>' +
        '<p>Approved refunds are returned to your original payment method and may take 5–10 business days to reflect, depending on your bank or payment provider.</p>' +

        '<div class="legal-contact-box"><p>To report a payment issue, contact <strong>lalitkoli11121998@gmail.com</strong> with your transaction ID (placeholder — update with your real support email).</p></div>'
    }
  };

  /* ---------- Inject modal markup once ---------- */
  var overlay = document.createElement('div');
  overlay.className = 'legal-modal-overlay';
  overlay.innerHTML =
    '<div class="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legalModalTitle">' +
      '<div class="legal-modal-head">' +
        '<div>' +
          '<h2 id="legalModalTitle"></h2>' +
          '<div class="legal-modal-updated" id="legalModalUpdated"></div>' +
        '</div>' +
        '<button class="legal-modal-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="legal-modal-body" id="legalModalBody"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var titleEl = overlay.querySelector('#legalModalTitle');
  var updatedEl = overlay.querySelector('#legalModalUpdated');
  var bodyEl = overlay.querySelector('#legalModalBody');
  var closeBtn = overlay.querySelector('.legal-modal-close');
  var lastFocusedEl = null;

  function openModal(key) {
    var content = LEGAL_CONTENT[key];
    if (!content) return;
    lastFocusedEl = document.activeElement;
    titleEl.textContent = content.title;
    updatedEl.textContent = content.updated;
    bodyEl.innerHTML = content.body;
    bodyEl.scrollTop = 0;
    overlay.classList.add('is-open');
    document.body.classList.add('legal-modal-open');
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('legal-modal-open');
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  /* ---------- Triggers: any element with data-modal="privacy" or "refund" ---------- */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      openModal(trigger.getAttribute('data-modal'));
      return;
    }
    if (e.target === overlay) {
      closeModal();
    }
  });

  closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });
});