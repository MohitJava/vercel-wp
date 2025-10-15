<?php
/**
 * Vercel WP - Main Settings Page with Tabs
 * 
 * Combines Deploy and Preview settings in one unified interface
 * 
 * @package VercelWP
 * @since 2.0.0
 */

defined('ABSPATH') or die('Access denied');

class VercelWP_Settings {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'handle_settings_save'));
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        $capability = apply_filters('vercel_wp_settings_capability', 'manage_options');
        
        if (current_user_can($capability)) {
            // Main menu page
            add_menu_page(
                __('Vercel WP', 'vercel-wp'),
                __('Vercel WP', 'vercel-wp'),
                $capability,
                'vercel-wp',
                array($this, 'render_settings_page'),
                VERCEL_WP_PLUGIN_URL . 'assets/vercel-logo.svg',
                100
            );
            
            // Add submenu to avoid duplicate menu title
            add_submenu_page(
                'vercel-wp',
                __('Settings', 'vercel-wp'),
                __('Settings', 'vercel-wp'),
                $capability,
                'vercel-wp',
                array($this, 'render_settings_page')
            );
        }
    }
    
    /**
     * Handle settings save
     */
    public function handle_settings_save() {
        // This will be handled by WordPress settings API
        // Individual tabs will register their own settings
    }
    
    /**
     * Render main settings page with tabs
     */
    public function render_settings_page() {
        // Get current tab
        $active_tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'deploy';
        
        ?>
        <div class="wrap vercel-wp-settings">
            <h1><?php _e('Vercel WP Settings', 'vercel-wp'); ?></h1>
            <p class="description"><?php _e('Configure your Vercel deployment and preview settings', 'vercel-wp'); ?></p>
            
            <!-- Tab Navigation -->
            <h2 class="nav-tab-wrapper">
                <a href="?page=vercel-wp&tab=deploy" 
                   class="nav-tab <?php echo $active_tab === 'deploy' ? 'nav-tab-active' : ''; ?>">
                    <span class="dashicons dashicons-hammer" style="font-size: 16px; line-height: 1.3;"></span>
                    <?php _e('Deploy', 'vercel-wp'); ?>
                </a>
                <a href="?page=vercel-wp&tab=preview" 
                   class="nav-tab <?php echo $active_tab === 'preview' ? 'nav-tab-active' : ''; ?>">
                    <?php _e('Preview', 'vercel-wp'); ?>
                </a>
            </h2>
            
            <!-- Tab Content -->
            <div class="vercel-wp-tab-content">
                <?php
                switch ($active_tab) {
                    case 'preview':
                        $this->render_preview_tab();
                        break;
                    case 'deploy':
                    default:
                        $this->render_deploy_tab();
                        break;
                }
                ?>
            </div>
        </div>
        
        <style>
            .vercel-wp-settings .nav-tab-wrapper {
                margin-bottom: 20px;
            }
            .vercel-wp-tab-content {
                background: #fff;
                padding: 20px;
                border: 1px solid #ccd0d4;
                border-top: none;
                box-shadow: 0 1px 1px rgba(0,0,0,.04);
            }
        </style>
        <?php
    }
    
    /**
     * Render Deploy tab content
     */
    private function render_deploy_tab() {
        // from wp-webhook-vercel-deploy
        include VERCEL_WP_PLUGIN_DIR . 'admin/views/tab-deploy.php';
    }
    
    /**
     * Render Preview tab content
     */
    private function render_preview_tab() {
        // from plugin-headless-preview
        include VERCEL_WP_PLUGIN_DIR . 'admin/views/tab-preview.php';
    }
}

// Initialize settings page
VercelWP_Settings::get_instance();

