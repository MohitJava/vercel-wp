# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-01-01

### Added

- Initial release of Vercel WP plugin
- Unified settings page with tabbed interface
- Deploy tab (default) with full deployment functionality
- Preview tab with comprehensive preview features
- **Automatic permalink rewriting** - All permalinks use production URL
- **Smart permalink filters** - Works with posts, pages, and custom post types
- **Admin bar integration** - "Visit Site" links use production URL
- **Public route redirection** - All public pages redirect to production
- Real-time deployment status tracking
- Split-screen preview interface with device simulation
- Preview buttons in post editor and admin bar
- URL mapping between WordPress and Vercel
- Headless WordPress functionality
- URL replacement tool for migrations
- Cache management with Vercel API integration
- ACF support for serialized data
- Connection diagnostics and testing tools
- Comprehensive documentation and configuration guides

### Technical Features

- One-click deployment to Vercel
- Real-time deployment status monitoring
- Deployment history with detailed information
- Admin bar deploy button for quick access
- Vercel services status monitoring
- Complete API integration with Vercel
- Device simulation (Desktop, Tablet, Mobile)
- Preview from post editor
- Smart cache clearing via Vercel API
- Automatic permalink rewriting for all post types
- Custom post type support with URL validation
- AJAX endpoints for all functionality
- Secure nonce verification for all requests
- Multi-language support (English/French)

### Security

- Secure AJAX implementation with nonce verification
- User capability checks for all admin functions
- Input sanitization and validation
- Error logging without exposing sensitive data

### Performance

- Efficient cache management
- Optimized API calls with proper error handling
- Smart polling with adaptive intervals
- Background processing for deployments

---

## [1.0.1] - 2024-01-15

### Fixed

- Fixed AJAX action name mismatch causing 400 error when clearing cache
- Resolved cache clearing functionality not working

### Added

- **Real Vercel cache clearing** via API integration
- **Custom post type support** for preview functionality
- **Preview metabox display in custom post type editors**
- Smart post type filtering based on URL availability
- Preview buttons in custom post type publish boxes

### Enhanced

- Cache clearing now works with Vercel API instead of just timestamp updates
- Preview metabox appears on all public custom post types with URLs
- Better error handling and user feedback for cache operations

---

## [Unreleased]

### Planned Features

- Enhanced cache statistics and monitoring
- Selective cache clearing by path
- Advanced deployment options
- Additional language support

### Known Issues

- Cache clearing requires Vercel API credentials
- Preview functionality depends on Vercel preview deployments

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
