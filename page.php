<?php
get_header();
?>

<!-- WHITE SECTION: Body Content -->
<main class="flex-grow pt-20">
    <?php
    if (have_rows('flexible_section')):
        while (have_rows('flexible_section')):
            the_row();
            get_template_part('partials/flexible-content/' . get_row_layout());
        endwhile;
    endif;
    ?>
</main>

<?php
get_footer();
?>