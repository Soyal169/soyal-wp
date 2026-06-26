<?php
function register_menus()
{
    register_nav_menus(
        array(
            'header-menu' => __('Header Menu'),
            'footer-menu-1' => __('Footer Menu 1'),
            'footer-menu-2' => __('Footer Menu 2'),
            'footer-menu-3' => __('Footer Menu 3'),
        )
    );
}
add_action('init', 'register_menus');
class Custom_Walker_Nav_Menu extends Walker_Nav_Menu
{
    function start_lvl(&$output, $depth = 0, $args = array())
    {
    }

    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0)
    {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';
        $title = apply_filters('the_title', $item->title, $item->ID);
        $url = !empty($item->url) ? $item->url : '#';
        $is_programs = (strtolower($title) == 'job ready programs' || strtolower($title) == 'programs');
        $menu_type = isset($args->menu_type) ? $args->menu_type : 'desktop';

        if ($depth == 0) {
            if ($is_programs) {
                if ($menu_type == 'desktop') {
                    // Desktop Dropdown Wrapper
                    $output .= $indent . '<div class="relative group">';

                    // Desktop Dropdown Toggle
                    $output .= sprintf(
                        '<a href="%s" data-dropdown-toggle="list-dropdown" class="text-[15px] flex items-center gap-1.5 font-bold text-slate-800 hover:text-brand-primary transition-all duration-200 focus:outline-none cursor-pointer">%s <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down w-3 h-3 transition-transform dropdown-chevron"><path d="m6 9 6 6 6-6"></path></svg></a>',
                        esc_url($url),
                        esc_html($title)
                    );

                    // Re-implementing two-column layout with w-[600px]
                    $output .= '<div id="list-dropdown" class="absolute top-full -left-1/2 mt-4 w-[600px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100/50 p-4 transition-all duration-300 origin-top opacity-0 scale-95 pointer-events-none z-[100] group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto before:content-[\'\'] before:absolute before:-top-4 before:left-0 before:w-full before:h-4">';

                    $output .= '<div class="grid grid-cols-2 gap-2">';

                    // Dynamic Programs
                    $programs = new WP_Query(array(
                        'post_type' => 'programs',
                        'posts_per_page' => 6,
                        'post_status' => 'publish'
                    ));

                    if ($programs->have_posts()) {
                        while ($programs->have_posts()) {
                            $programs->the_post();
                            $sub_info = wp_trim_words(get_the_excerpt(), 5, '...');

                            $p_title = strtolower(get_the_title());
                            $icon_name = 'terminal';
                            $color_class = 'indigo';
                            
                            if (strpos($p_title, 'cyber') !== false) {
                                $icon_name = 'shield-check';
                                $color_class = 'red';
                            } elseif (strpos($p_title, 'cloud') !== false) {
                                $icon_name = 'cloud';
                                $color_class = 'blue';
                            } elseif (strpos($p_title, 'admin') !== false) {
                                $icon_name = 'terminal';
                                $color_class = 'indigo';
                            }

                            $icon_html = sprintf('<i data-lucide="%s" class="w-[18px] h-[18px]"></i>', $icon_name);

                            $output .= sprintf(
                                '<a href="%s" class="flex items-center gap-4 px-4 py-3.5 text-[14px] font-semibold text-slate-700 rounded-xl hover:bg-slate-50 hover:text-brand-primary transition-all group/item">
                                    <div class="w-10 h-10 shrink-0 rounded-lg bg-%s-50 flex items-center justify-center text-%s-600 group-hover/item:bg-brand-primary group-hover/item:text-white transition-colors">
                                        %s
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="leading-tight">%s</span>
                                        <span class="text-[11px] text-slate-400 font-normal">%s</span>
                                    </div>
                                </a>',
                                get_permalink(),
                                $color_class,
                                $color_class,
                                $icon_html,
                                get_the_title(),
                                esc_html($sub_info)
                            );
                        }
                        wp_reset_postdata();
                    }

                    $output .= '</div>'; // End Grid

                    // Footer button
                    $output .= sprintf(
                        '<div class="pt-2 mt-2 border-t border-slate-50">
                            <a href="%s" class="flex items-center justify-center w-full px-4 py-2.5 text-[13px] font-bold text-brand-primary bg-brand-primary/5 rounded-xl hover:bg-brand-primary hover:text-white transition-all">
                                Explore All Programs
                            </a>
                        </div>',
                        get_post_type_archive_link('programs')
                    );
                    $output .= '</div></div>';
                } else {
                    // Mobile remains mostly the same for usability on small screens
                    $output .= $indent . '<div class="flex flex-col">';
                    $output .= sprintf(
                        '<button data-dropdown-toggle="mobile-programs-dropdown" class="px-2 py-3 text-[18px] font-bold text-slate-800 hover:text-brand-primary transition-colors flex items-center justify-between group cursor-pointer w-full text-left">
                            %s
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down text-slate-300 group-hover:text-brand-primary transition-transform dropdown-chevron">
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </button>',
                        esc_html($title)
                    );

                    $output .= '<div id="mobile-programs-dropdown" class="hidden flex-col gap-1 pl-4 mt-2 overflow-hidden transition-all duration-300">';

                    $programs = new WP_Query(array(
                        'post_type' => 'programs',
                        'posts_per_page' => 6, // Show more on mobile too if you wish
                        'post_status' => 'publish'
                    ));

                    if ($programs->have_posts()) {
                        while ($programs->have_posts()) {
                            $programs->the_post();
                            $output .= sprintf(
                                '<a href="%s" class="flex items-center gap-3 px-4 py-3 text-[15px] font-semibold text-slate-600 hover:text-brand-primary transition-colors">
                                    <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    %s
                                </a>',
                                get_permalink(),
                                get_the_title()
                            );
                        }
                        wp_reset_postdata();
                    }

                    $output .= sprintf(
                        '<a href="%s" class="flex items-center gap-3 px-4 py-3 text-[15px] font-bold text-brand-primary">
                            Explore All Programs
                        </a>',
                        get_post_type_archive_link('programs')
                    );
                    $output .= '</div></div>';
                }
            } else {
                // Regular Top Level Link
                if ($menu_type == 'desktop') {
                    $output .= sprintf(
                        '<a href="%s" class="text-[15px] font-bold text-slate-800 hover:text-brand-primary transition-all duration-200">%s</a>',
                        esc_url($url),
                        esc_html($title)
                    );
                } else {
                    $output .= sprintf(
                        '<a href="%s" class="px-2 py-3 text-[18px] font-bold text-slate-800 hover:text-brand-primary transition-colors">%s</a>',
                        esc_url($url),
                        esc_html($title)
                    );
                }
            }
        }
    }

    function end_el(&$output, $item, $depth = 0, $args = array())
    {
    }
}