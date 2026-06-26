<?php get_header(); ?>

<!-- Dynamic Brand Gradient Background -->
<div class="absolute top-0 w-full -z-10 h-[1000px] overflow-hidden pointer-events-none bg-brand-light">
    <div
        class="absolute top-[-15%] left-[-5%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px] animate-float">
    </div>
    <div
        class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-accent/10 blur-[100px] animate-pulse-slow [animation-delay:-2s]">
    </div>
    <div class="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-pattern-noise"></div>
</div>

<!-- Reading Progress Bar -->
<div class="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-100 hidden md:block">
    <div id="scroll-progress"
        class="h-full bg-brand-primary w-0 transition-all duration-75 shadow-[0_0_10px_rgba(227,30,36,0.5)]"></div>
</div>

<!-- Article Header -->
<section class="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
    <div class="max-w-4xl mx-auto px-6 relative z-10">
        <div class="flex flex-col items-center text-center">
            <!-- <div class="flex flex-wrap items-center gap-2 mb-8">
                <?php
                $terms = get_the_terms(get_the_ID(), 'category');
                if (!empty($terms) && !is_wp_error($terms)) {
                    foreach ($terms as $term) {
                ?>
                        <div
                            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[11px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span class="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
                            <?php echo esc_html($term->name); ?>
                        </div>
                <?php
                    }
                }
                ?>
            </div> -->

            <h1
                class="text-4xl md:text-6xl font-jakarta font-extrabold text-slate-900 mb-10 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                <?php the_title(); ?>
            </h1>

            <div
                class="flex flex-wrap items-center justify-center gap-8 text-sm animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <div class="flex items-center gap-4 group cursor-pointer">
                    <div class="relative">
                        <?php
                        $author_img = get_field('author_image');
                        $author_img_url = is_array($author_img) ? $author_img['url'] : $author_img;
                        ?>
                        <img src="<?php echo esc_url($author_img_url); ?>"
                            class="w-12 h-12 rounded-full ring-4 ring-white shadow-xl transition-transform duration-300 group-hover:scale-110"
                            alt="Author">
                        <div
                            class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full">
                        </div>
                    </div>
                    <div class="text-left">
                        <div class="font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                            <?php echo get_field('author_name'); ?>
                        </div>
                        <div class="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                            <?php echo get_field('author_role'); ?>
                        </div>
                    </div>
                </div>

                <div class="hidden sm:block w-px h-10 bg-slate-200"></div>

                <div class="flex items-center gap-6">
                    <div class="text-left">
                        <div class="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Published</div>
                        <div class="text-slate-700 font-semibold font-geist"><?php echo get_field('published_date'); ?>
                        </div>
                    </div>
                    <!-- <div class="text-left">
                        <div class="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Read Time</div>
                        <div class="flex items-center gap-1.5 text-slate-700 font-semibold font-geist">
                            <i data-lucide="clock" class="w-3.5 h-3.5 text-brand-primary"></i>
                            <?php echo get_field('read_time'); ?> minutes
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Image with Floating Effect -->
<div class="max-w-6xl mx-auto px-6 -mt-10 lg:-mt-16 relative z-20 mb-20 group">
    <div
        class="relative rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white group-hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.25)] transition-all duration-700">
        <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10">
        </div>
        <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="Featured Article Image"
            class="w-full aspect-[21/9] object-cover transition-transform duration-[1.5s] group-hover:scale-105">
    </div>
</div>

<?php if (has_excerpt()): ?>
    <div class="max-w-6xl mx-auto px-6 mb-20">
        <div class="text-lg md:text-xl font-geist text-slate-500 leading-relaxed text-center italic">
            <?php the_excerpt(); ?>
        </div>
    </div>
<?php endif; ?>

<!-- Main Content Layout -->
<div class="max-w-6xl mx-auto px-8 pb-24 md:pb-32 relative">
    <?php
    $url = urlencode(get_permalink());
    $title = urlencode(get_the_title());
    ?>

    <!-- Left Sidebar: Social Sharing (Sticky) -->
    <aside class="hidden xl:block absolute -left-20 top-0 h-full">
        <div class="sticky top-32 flex flex-col gap-4">

            <div class="text-[10px] font-extrabold text-slate-300 uppercase vertical-rl tracking-[0.2em] mb-4">
                SHARE
            </div>

            <!-- Twitter -->
            <a href="https://twitter.com/intent/tweet?url=<?php echo $url; ?>&text=<?php echo $title; ?>"
                target="_blank"
                class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300 hover:-translate-y-1">

                <i data-lucide="x" class="w-5 h-5"></i>
            </a>

            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo $url; ?>" target="_blank"
                class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 hover:-translate-y-1">

                <i data-lucide="linkedin" class="w-5 h-5"></i>
            </a>

            <!-- Copy Link -->
            <button onclick="copyToClipboard('<?php echo get_permalink(); ?>')"
                class="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 hover:-translate-y-1">

                <i data-lucide="link" class="w-5 h-5"></i>
            </button>

        </div>
    </aside>

    <!-- Main Content -->
    <article class="overflow-visible">
        <div class="blog-content-area">
            <?php the_content(); ?>
        </div>

        <!-- In-article CTA -->
        <div
            class="not-prose mt-16 p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-primary/20 rounded-[3rem] text-white relative overflow-hidden group">
            <div
                class="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-brand-primary/20 transition-all duration-1000">
            </div>
            <div class="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div class="flex-1 text-center md:text-left">
                    <h3 class="text-3xl font-jakarta font-extrabold mb-4 leading-tight">
                        <?php echo get_field('cta_title'); ?>
                    </h3>
                    <p class="text-slate-300 mb-8 text-lg"><?php echo get_field('cta_description'); ?></p>
                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        <a href="<?php echo get_field('cta_primary_button_url'); ?>"
                            class="px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-xl shadow-brand-primary/40 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105">
                            <?php echo get_field('cta_primary_button'); ?>
                        </a>
                        <a href="tel:<?php echo esc_html(get_field('phone', 'options')); ?>"
                            class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300">
                            Talk to an Advisor
                        </a>
                    </div>
                </div>
                <?php
                $cta_img = get_field('cta_image');
                $cta_img_url = is_array($cta_img) ? $cta_img['url'] : $cta_img;
                ?>
                <div class="w-48 h-48 bg-cover bg-center rounded-[2rem] border-4 border-white/50 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700 hidden lg:block"
                    style="background-image: url('<?php echo esc_url($cta_img_url); ?>');">
                </div>
            </div>
        </div>
        <!-- Footer Tags & Share (Mobile & Tablet) -->
        <div
            class="mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-8 xl:hidden">

            <div class="flex items-center gap-4">
                <span class="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Share Article</span>
                <div class="flex gap-2">
                    <!-- Twitter -->
                    <a href="https://twitter.com/intent/tweet?url=<?php echo $url; ?>&text=<?php echo $title; ?>"
                        target="_blank"
                        class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all">
                        <i data-lucide="x" class="w-4 h-4"></i>
                    </a>
                    <!-- LinkedIn -->
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo $url; ?>" target="_blank"
                        class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                        <i data-lucide="linkedin" class="w-4 h-4"></i>
                    </a>
                    <!-- Copy Link -->
                    <button onclick="copyToClipboard('<?php echo get_permalink(); ?>')"
                        class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all">
                        <i data-lucide="link" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
        </div>
    </article>
</div>

<!-- Related Articles -->
<section class="bg-slate-50 py-32 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div class="max-w-xl">
                <h3 class="text-4xl font-jakarta font-extrabold text-slate-900 mb-4 tracking-tight">Keep Reading</h3>
                <p class="text-slate-500 text-lg">Explore more guides and success stories from our community.</p>
            </div>
            <a href="<?php echo get_permalink(get_page_by_path('blog')); ?>"
                class="flex items-center gap-2 font-bold text-brand-primary hover:text-slate-900 transition-colors group">
                Back to Blog Feed
                <i data-lucide="arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1"></i>
            </a>
        </div>

        <div class="grid md:grid-cols-3 gap-10">

            <?php
            $current_id = get_the_ID();

            /* Use default WP categories */
            $terms = wp_get_post_terms($current_id, 'category', ['fields' => 'ids']);

            $related_args = [
                'post_type' => 'post',   // changed from blogs
                'posts_per_page' => 3,
                'post__not_in' => [$current_id],
            ];

            if (!empty($terms)) {
                $related_args['tax_query'] = [
                    [
                        'taxonomy' => 'category', // changed from blog-category
                        'field' => 'term_id',
                        'terms' => $terms,
                    ],
                ];
            }

            $related_query = new WP_Query($related_args);

            if ($related_query->have_posts()):
                while ($related_query->have_posts()):
                    $related_query->the_post();

                    $post_terms = get_the_terms(get_the_ID(), 'category');
                    $category_name = !empty($post_terms) && !is_wp_error($post_terms)
                        ? $post_terms[0]->name
                        : 'Uncategorized';

                    $featured_img = get_the_post_thumbnail_url() ?: get_template_directory_uri() . '/assets/images/fallback.jpg';
                    // $read_time = get_field('read_time') ?: '5';

            ?>
                    <a href="<?php the_permalink(); ?>"
                        class="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">

                        <div class="relative aspect-video overflow-hidden">
                            <img src="<?php echo esc_url($featured_img); ?>"
                                class="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                alt="<?php the_title(); ?>">

                            <div
                                class="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-extrabold text-brand-primary uppercase tracking-widest shadow-sm">
                                <?php echo esc_html($category_name); ?>
                            </div>
                        </div>

                        <div class="p-8 flex flex-col flex-grow">
                            <h4
                                class="text-xl font-jakarta font-bold text-slate-900 group-hover:text-brand-primary transition-colors leading-tight mb-4 line-clamp-2">
                                <?php the_title(); ?>
                            </h4>

                            <div
                                class="mt-auto flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <span><?php echo get_field('published_date'); ?></span>
                                <!-- <span class="w-1 h-1 rounded-full bg-slate-300"></span> -->
                                <!-- <span><?php echo esc_html($read_time); ?> min read</span> -->
                            </div>
                        </div>

                    </a>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>

        </div>
    </div>
</section>

<?php get_footer(); ?>

<script>
    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Code Copy Functionality (Basic)
    document.querySelectorAll('button').forEach(button => {
        if (button.innerHTML.includes('copy')) {
            button.addEventListener('click', () => {
                const pre = button.closest('.relative').querySelector('pre');
                if (pre) {
                    const code = pre.innerText;
                    navigator.clipboard.writeText(code);
                    const originalContent = button.innerHTML;
                    button.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-green-500"></i>';
                    lucide.createIcons();
                    setTimeout(() => {
                        button.innerHTML = originalContent;
                        lucide.createIcons();
                    }, 2000);
                }
            });
        }
    });
</script>
<script id="copyjs01">
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            alert("Link copied!");
        });
    }
</script>