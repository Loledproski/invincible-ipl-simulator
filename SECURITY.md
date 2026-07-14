# Security Policy

## Supported Versions

The following versions of Invincible are currently supported with security updates.

| Version | Supported |
| :------ | :-------: |
| Latest Release | ✅ |
| Older Versions | ❌ |

---

## Reporting a Vulnerability

If you discover a security vulnerability in **Invincible – IPL Strategy Simulator**, please report it responsibly.

Instead of opening a public GitHub issue, please contact the maintainer directly so the issue can be investigated and resolved before public disclosure.

**Contact**
- GitHub: https://github.com/Loledproski
- Email: harshkumarmishra10@gmai.com

Please include:
- Description of the vulnerability
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and operating system information

Every report will be reviewed as quickly as possible.

---

## Scope

This project is a **client-side React application** and does **not** include:

- User authentication
- User accounts
- Payment processing
- Server-side APIs
- Database storage
- Personal data collection

Security reports should therefore focus on:

- Client-side vulnerabilities
- Dependency vulnerabilities
- Build process vulnerabilities
- Cross-site scripting (XSS)
- Supply-chain or package-related issues
- Local storage or data persistence issues

---

## Disclosure Policy

Security vulnerabilities will be handled responsibly.

1. The report will be acknowledged.
2. The issue will be investigated.
3. A fix will be developed.
4. The patch will be released.
5. The vulnerability may be publicly disclosed after a fix becomes available.

---

## Dependency Security

This project relies on modern open-source packages including:

- React
- TypeScript
- Vite

Dependencies should be kept up to date to reduce exposure to known vulnerabilities.

---

## Best Practices

If you are running this project locally:

- Install dependencies only from trusted sources.
- Keep Node.js updated.
- Regularly update project dependencies.
- Do not expose API keys in public repositories.
- Never commit `.env` files containing secrets.

---

## Acknowledgements

We appreciate everyone who helps improve the security and reliability of this project through responsible disclosure.
