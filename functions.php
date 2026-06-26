<?php

/**
 * theme functions and description
 *
 * @package 909itacademy
 */

$include_file = [
    "inc/helper.php",
    "inc/setup.php",
    "inc/menus.php"
];

array_walk($include_file, function ($file) {
    if (!locate_template($file, true, true)) {
        trigger_error(sprintf('Could not find %s', $file), E_USER_ERROR);
    }
});

// unset($include_file);

/*** Footer Logo Customize ***/
function footer_logo($wp_customize)
{
    //Settings
    $wp_customize->add_setting('footer_logo'); //Setting for logo uploader

    //Controls
    $wp_customize->add_control(
        new WP_Customize_Image_Control(
            $wp_customize,
            'footer_logo',
            array(
                'label' => 'Footer Logo',
                'section' => 'title_tagline',
                'settings' => 'footer_logo'
            )
        )
    );
}
add_action('customize_register', 'footer_logo');

// Disable support for comments and trackbacks in post types
function disable_comments_post_types_support()
{
    $post_types = get_post_types();
    foreach ($post_types as $post_type) {
        remove_post_type_support($post_type, 'comments');
        remove_post_type_support($post_type, 'trackbacks');
    }
}
add_action('admin_init', 'disable_comments_post_types_support');

// Close comments on the front-end
function disable_comments_status()
{
    return false;
}
add_filter('comments_open', 'disable_comments_status', 20, 2);
add_filter('pings_open', 'disable_comments_status', 20, 2);

// Hide existing comments
function disable_comments_hide_existing_comments($comments)
{
    return array();
}
add_filter('comments_array', 'disable_comments_hide_existing_comments', 10, 2);

// Remove comments page in menu
function disable_comments_admin_menu()
{
    remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'disable_comments_admin_menu');

// Redirect any user trying to access comments page
function disable_comments_admin_menu_redirect()
{
    global $pagenow;
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url());
        exit;
    }
}
add_action('admin_init', 'disable_comments_admin_menu_redirect');

// Remove comments metabox from dashboard
function disable_comments_dashboard()
{
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
}
add_action('admin_init', 'disable_comments_dashboard');

// Remove comments links from admin bar
function disable_comments_admin_bar()
{
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
}
add_action('init', 'disable_comments_admin_bar');

// Disable the comments widget
function disable_comments_widgets()
{
    unregister_widget('WP_Widget_Recent_Comments');
}
add_action('widgets_init', 'disable_comments_widgets');

//Search Functionality for News
// function search_only_news_cpt($query)
// {
//     if ($query->is_search && !is_admin()) {
//         // Ensure the search is limited to the 'news' post type
//         $query->set('post_type', 'news');
//     }
//     return $query;
// }
// add_filter('pre_get_posts', 'search_only_news_cpt');

// Theme support functions
function theme_slug_setup()
{
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
}
add_action('after_setup_theme', 'theme_slug_setup');

/**
 * Shortcode to display Iconify icons safely.
 * Usage: [icon name="lucide:shield-check"]
 */
function custom_iconify_shortcode($atts)
{
    // Set default attributes
    $args = shortcode_atts(array(
        'name' => 'lucide:shield-check', // Default icon
        'width' => '24',
        'class' => 'text-emerald-700 mb-4'
    ), $atts);

    // Return the HTML (Clean and safe from WYSIWYG stripping)
    return sprintf(
        '<iconify-icon icon="%s" width="%s" class="%s"></iconify-icon>',
        esc_attr($args['name']),
        esc_attr($args['width']),
        esc_attr($args['class'])
    );
}
add_shortcode('icon', 'custom_iconify_shortcode');
