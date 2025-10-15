# Vercel WP

**Complete Vercel integration for WordPress** - Deploy & Preview functionality combined in one powerful plugin.

**Important**: This is NOT an official Vercel plugin. This is a third-party plugin developed independently to provide WordPress-Vercel integration functionality.

Version: 1.0.0  
Author: Dorey Benjamin  
License: GPLv3 or later

---

## Description

Vercel WP is an unofficial third-party plugin that provides comprehensive integration between WordPress and Vercel. This plugin combines two essential modules to give you complete control over your Vercel deployments and previews directly from your WordPress admin.

## Why This Plugin?

This plugin was created to solve real-world problems faced by WordPress developers and content creators working with Vercel:

### Simplified Deployment

This plugin enables **one-click deployment** directly from WordPress admin, eliminating the need to switch between platforms. It provides a **streamlined workflow** for content creators who don't need to learn Git or Vercel's interface, while **reducing complexity** for teams with mixed technical skills.

### Accessibility for Non-Technical Users

The plugin offers a **WordPress-native experience** where users can deploy and preview without leaving their familiar interface. **No Vercel account is required** for content creators since developers handle the technical setup, and the **intuitive controls** make Vercel's power accessible to everyone.

### Static Site Generation (SSG) Preview

**The SSG problem**: With static sites, you can't see changes immediately - you need to rebuild and redeploy. This plugin provides a **real-time preview solution** that lets you see changes instantly without waiting for full deployment by utilizing **Vercel's preview branches in SSR mode**. The **split-screen interface** allows you to compare WordPress content with static site output, while **device simulation** helps test responsive design before going live. You can even **preview from the post editor** to see how content will look on the static site, leveraging Vercel's preview deployment system for instant feedback.

### Reduced Confusion

The plugin creates a **unified interface** where all Vercel operations happen in one place, with **clear status indicators** so you know exactly what's happening with deployments. **Automatic permalink rewriting** ensures URLs work correctly without manual configuration, and the **integrated workflow** eliminates the need for switching between WordPress and Vercel dashboards.

### Additional Benefits

The plugin enables **team collaboration** by allowing content creators to preview changes without developer intervention. It provides **quality assurance** by letting you preview changes before they go live, resulting in **time savings** by eliminating the back-and-forth between platforms. This leads to **error prevention** by catching issues before deployment and **client satisfaction** as clients can see changes in real-time during development.

### Deploy Module

- One-click deployment to Vercel
- Real-time deployment status tracking
- Deployment history with detailed information
- Admin bar deploy button for quick access
- Vercel services status monitoring
- Complete API integration

### Preview Module

- Real-time preview of Vercel changes from WordPress
- Split-screen preview interface with device simulation
- Preview buttons in post editor and admin bar
- URL mapping between WordPress and Vercel
- **Automatic permalink rewriting** - All permalinks automatically use production URL
- Headless WordPress functionality
- URL replacement tool for migrations
- Cache management
- ACF support for serialized data
- **Smart permalink filters** - Works with posts, pages, and custom post types

---

## Installation

1. Upload the `vercel-wp` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to **Vercel WP** → **Settings** in your WordPress admin
4. Configure both Deploy and Preview modules in their respective tabs

---

## Configuration

### Deploy Tab (Default)

Configure your Vercel deployment settings:

1. **Webhook Build URL**: Get it from Vercel Project Settings → Git → Deploy Hooks
2. **Vercel Project ID**: Find it in Vercel Project Settings → General
3. **Vercel API Key**: Create one in Vercel Account Settings → Tokens

### Preview Tab

Configure your Vercel preview settings:

1. **Vercel Preview URL**: Your preview deployment URL (e.g., `https://your-site-git-branch.vercel.app`)
2. **Production URL**: Your production site URL for path mapping and **automatic permalink rewriting**
3. **Display Options**: Enable/disable preview buttons in various locations
4. **Headless Options**: Configure headless WordPress behavior

#### Permalink Rewriting

When you set a **Production URL**, the plugin automatically:

- Rewrites all permalinks to use your production URL instead of WordPress admin URL
- Works with posts, pages, and custom post types
- Updates "Visit Site" links in admin bar
- Redirects public routes to production URL
- Requires WordPress permalinks to be configured (not using `?p=` structure)

---

## Structure

```
vercel-wp/
├── vercel-wp.php              # Main plugin file
├── includes/
│   ├── deploy/
│   │   ├── class-deploy-plugin.php
│   │   ├── class-deploy-admin.php
│   │   └── class-deploy-api.php
│   └── preview/               # Preview module
│       └── class-preview-manager.php
├── admin/
│   ├── settings.php           # Main settings page with tabs
│   └── views/
│       ├── tab-deploy.php     # Deploy tab view
│       └── tab-preview.php    # Preview tab view
├── assets/
│   ├── css/
│   │   ├── deploy.css         # Deploy module styles
│   │   ├── preview-admin.css  # Preview admin styles
│   │   ├── preview-frontend.css
│   │   └── preview-interface.css
│   ├── js/
│   │   ├── deploy.js          # Deploy module scripts
│   │   ├── preview-admin.js   # Preview admin scripts
│   │   ├── preview-frontend.js
│   │   └── preview-interface.js
│   └── *.svg                  # Vercel status icons
├── languages/                 # Translation files
└── uninstall.php             # Clean uninstall script
```

---

## Features

### Deploy Features

- Trigger deployments with one click
- Monitor deployment status in real-time
- View deployment history
- Admin bar integration
- Vercel services health monitoring

### Preview Features

- Split-screen preview interface
- Device simulation (Desktop, Tablet, Mobile)
- Preview from post editor
- Admin bar preview button
- **Automatic permalink rewriting** - All URLs use production URL
- URL replacement tool (Better Search Replace methodology)
- Connection diagnostics
- ACF-safe URL replacement
- Headless WordPress support
- **Smart permalink filters** - Works with all post types

---

## Technical Details

### Database Options

**Deploy Module:**

- `webhook_address` - Vercel webhook URL
- `vercel_api_key` - Vercel API key
- `vercel_site_id` - Vercel project ID

**Preview Module:**

- `vercel_wp_preview_settings` - All preview settings (array)
  - `production_url` - Production URL for permalink rewriting
  - `vercel_preview_url` - Vercel preview URL
  - `display_options` - Preview button display settings

### AJAX Endpoints

**Deploy:**

- `wp_ajax_vercel_deploy` - Trigger deployment
- `wp_ajax_vercel_status` - Check deployment status
- `wp_ajax_vercel_deployments` - Get deployment history
- `wp_ajax_vercel_services_status` - Check Vercel services

**Preview:**

- `wp_ajax_vercel_wp_preview_get_url` - Get preview URL
- `wp_ajax_vercel_wp_preview_clear_cache` - Clear cache
- `wp_ajax_vercel_wp_preview_test_connection` - Test connection
- `wp_ajax_vercel_wp_preview_replace_urls` - Replace URLs
- And more...

---

## Changelog

### 1.0.0 - Initial Release

- Unified settings page with tabbed interface
- All original functionality preserved
- Deploy tab (default)
- Preview tab with full features
- **Automatic permalink rewriting** - All permalinks use production URL
- **Smart permalink filters** - Works with posts, pages, custom post types
- **Admin bar integration** - "Visit Site" links use production URL
- **Public route redirection** - All public pages redirect to production
- Clean code architecture
- Comprehensive documentation

---

## Credits

**Disclaimer**: This plugin is not affiliated with, endorsed by, or officially supported by Vercel Inc. Vercel is a trademark of Vercel Inc. This plugin uses Vercel's public APIs and webhook functionality as documented in their official documentation.

---

## License

GPLv3 or later

---

## Support

For issues, feature requests, or questions:

- Check the configuration guide in each tab
- Review the Vercel documentation links provided
- Ensure your Vercel credentials are correct
- Use the connection test tools in the Preview tab
- **For permalink issues**: Ensure WordPress permalinks are configured (not using `?p=` structure)

### Troubleshooting Permalinks

If permalinks are not being rewritten:

1. **Check WordPress permalinks**: Go to `Settings > Permalinks` and ensure you're not using the default `?p=` structure
2. **Recommended structures**: `/%postname%/`, `/%year%/%monthnum%/%postname%/`, or `/%category%/%postname%/`
3. **Verify Production URL**: Make sure it's correctly set in the Preview tab
4. **Clear cache**: Use WordPress cache clearing tools if you have caching plugins

---

## Requirements

- WordPress 5.0+
- PHP 8.0+
- Active Vercel account
- Vercel project with deploy hooks configured

---

## Important Disclaimers

### Official Status

- **This is NOT an official Vercel plugin**
- **This is a third-party plugin** developed independently
- **Not affiliated with, endorsed by, or officially supported by Vercel Inc.**
- Vercel is a trademark of Vercel Inc.

### Technical Disclaimer

- This plugin uses Vercel's public APIs and webhook functionality
- All integrations are based on Vercel's official documentation
- Plugin functionality depends on Vercel's API availability and changes
- Users are responsible for ensuring compliance with Vercel's Terms of Service

### Support Disclaimer

- Support is provided by the plugin author, not by Vercel
- Issues should be reported to the plugin's GitHub repository
- For Vercel-specific issues, consult Vercel's official support channels
