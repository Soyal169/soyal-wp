<?php

/*
========================================
Additional class in li
========================================
*/
function add_classes_on_li($classes, $item, $args)
{
    $classes[] = 'dropdown-full-color';
    return $classes;
}

add_filter('nav_menu_css_class', 'add_classes_on_li', 1, 3);

function add_additional_class_on_a($classes, $item, $args)
{
    if (isset($args->add_a_class)) {
        $classes['class'] = $args->add_a_class;
    }
    return $classes;
}

add_filter('nav_menu_link_attributes', 'add_additional_class_on_a', 1, 3);

function enable_svg_upload($upload_mimes)
{
    $upload_mimes['svg'] = 'image/svg+xml';
    $upload_mimes['svgz'] = 'image/svg+xml';
    return $upload_mimes;
}

add_filter('upload_mimes', 'enable_svg_upload', 10, 1);

if (function_exists('acf_add_options_page')) {

    acf_add_options_page(array(
        'page_title' => 'Theme Settings',
        'menu_title' => 'Theme Settings',
        'menu_slug' => 'theme-settings',
        'capability' => 'edit_posts',
        'redirect' => false
    ));
}

function limit_blog_posts_per_page($query)
{
    if (!is_admin() && $query->is_main_query() && is_home()) {
        $query->set('posts_per_page', 9);
    }
}
add_action('pre_get_posts', 'limit_blog_posts_per_page');
