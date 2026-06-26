<?php

/**
 * theme functions and description
 *
 * @package 909itacademy
 */

/*
============================
Theme Support
============================
*/
function nonit_theme_support()
{
    add_theme_support('menus');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_post_type_support('post', 'excerpt');
}

add_action('after_setup_theme', 'nonit_theme_support');

function nonit_theme_scripts()
{
    $version = wp_get_theme()->get('Version');

    // Enqueue theme styles
    wp_enqueue_style('nonit-style', get_template_directory_uri() . '/assets/css/style.css', array(), $version);

    // Enqueue Magnific Popup CSS
    wp_enqueue_style('magnific-popup-css', 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.2.0/magnific-popup.min.css', array(), '1.2.0');

    // Enqueue vendor scripts
    wp_enqueue_script('lucide', get_template_directory_uri() . '/assets/js/lucide.min.js', array(), '0.479.0', true);

    // Enqueue Magnific Popup JS
    wp_enqueue_script('magnific-popup-js', 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.2.0/jquery.magnific-popup.min.js', array('jquery'), '1.2.0', true);

    // Enqueue theme scripts
    wp_enqueue_script('nonit-scripts', get_template_directory_uri() . '/assets/js/scripts.js', array('jquery', 'lucide'), $version, true);
}

add_action('wp_enqueue_scripts', 'nonit_theme_scripts');
