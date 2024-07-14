Html

<main class="page-dictionary" style="padding-top:100px;">
    <!-- <h2>aaaaa</h2> -->
    <div class="spacing"></div>
    <div class="container">
        <div class="dictionary">
            <h1 class="title">Dictionary</h1>
            <div class="dictionary-col row">
                <div class="col-md-9 dictionary-item">
                    <div class="dictionary-content">
                        <div class="content-top">
                        <h5>TERM OF THE DAY</h5>
                        <h4>ADP National Employment Report</h4>
                        <p>The ADP National Employment Report is a monthly economic data release that tracks levels of nonfarm private employment in the U.S. <span><a href="#">Read more</a></span></p>
                        </div>
                        <div class="content-bottom">
                            <div class="img">
                                
                            </div>
                            <div class="desc">
                            <span>SUBSCRIBE TO 'TERM OF THE DAY'</span> and learn a new financial term every day. Stay informed and make smart financial decisions. <a href="">SIGN UP NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 dictionary-item">

                    <div class="dictionary-bar">
                        <h5>IN THE NEWS</h5>
                        <ul>
                            <li>
                                <a href="">403(b) Plan</a>
                            </li>
                            <li>
                                <a href="">403(b) Plan</a>
                            </li>
                            <li>
                                <a href="">403(b) Plan</a>
                            </li>
                            <li>
                                <a href="">403(b) Plan</a>
                            </li>
                            <li>
                                <a href="">403(b) Plan</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="terms">
            <div class="terms-bar">
                <?php
                    $dic_categories = get_terms(array(
                        'taxonomy' => 'dictionary_terms',
                        'hide_empty' => false,
                    ));
                    $processed_categories = array();
                    if (!empty($dic_categories) && !is_wp_error($dic_categories)) {

                        foreach ($dic_categories as $category) {
                            $term_name = $category->name;
                            // var_dump($category->slug);
                            if ($term_name === 'Terms Beginning With Num') {
                                $display_name = '#';
                            } else {
                                $display_name = substr($term_name, -1);
                            }
                            $term_link = get_term_link($category);
                            $processed_categories[] = array(
                                'display_name' => $display_name,
                                'term_link' => $term_link,
                                'term' => $category,
                                'slug' => $category->slug
                            );
                        }
                        // sort by alphabet
                        usort($processed_categories, function ($a, $b) {
                            return strcmp($a['display_name'], $b['display_name']);
                        });
                    }
                    if (!empty($processed_categories)) {
                        echo '<ul class="list-categories">';
                        foreach ($processed_categories as $category) {
                            // var_dump($category);
                            echo '<li class="dic-category">';
                            echo '<a href="#' . $category['slug'] . '">' . esc_html($category['display_name']) . '</a>';
                            echo '</li>';
                        }
                        echo '</ul>';
                    }
                ?>
            </div>
            <div class="terms-content">
                <?php
                    foreach ($dic_categories as $category) {
                        $term_name = $category->name;
                        $id_terms = $category->slug;



                        $spotlightLoop = new WP_Query(array(
                            'post_type'      => 'dictionary',
                            'post_status'    => 'publish',
                            'orderby'        => 'date',
                            'posts_per_page' => 16,
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'dictionary_terms',
                                    'field'    => 'slug',
                                    'terms'    => $category->slug,
                                    'include_children' => false,
                                ),
                            ),
                        ));
                        // var_dump($spotlightLoop );
                        echo '<div id="' . esc_attr($id_terms) . '" class="terms-container">';
                        echo '<h2>' . esc_html($term_name) . '</h2>';


                        while ($spotlightLoop->have_posts()) : $spotlightLoop->the_post();
                            echo '<div class="item-container">';
                            echo '<a href="' . esc_url(get_permalink()) . '" class="item-content__name">' . get_the_title() . '</a>';

                            echo '</div>';
                        endwhile;

                        echo '</div>';
                    }
                ?>
            </div>
        </div>

    </div>

</main>

CSS
.terms-bar.sticky {
position: sticky;
top: 100px;
right: 0;
left: 0;
z-index: 999;
}
.spacing {
height: 50vh;
}
.terms-bar ul {
display: flex;
flex-wrap: wrap;
width: 100%;
}
.terms-bar ul li a {
font-size: 18px;
line-height: 27px;
color: #333;
padding: 8px 16px 4px;
background-color: #f5f5f6;
}
.terms-bar ul li a.active {
background-color: #fff;
color: #2c40d0;
}
.terms-container {
height: 100vh;
}
.terms-container h2 {
font-size: 30px;
line-height: 36px;
color: #2c40d0;
margin-bottom: 12px;
}
.terms-container .item-container {
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 16px 24px;
}
.terms-container .item-container .item-content\_\_name {
font-size: 20px;
line-height: 25px;
color: #333;
}
.dictionary {
margin-bottom: 40px;
}
.dictionary .title {
font-size: 48px;
line-height: 53px;
color: #333;
position: relative;
margin-bottom: 70px !important;
}
.dictionary .title::before {
position: absolute;
content: "";
width: 30px;
height: 5px;
background-color: #2c40d0;
bottom: -15px;
left: 0;
}
.dictionary .dictionary-item {
padding: 0;
}
.dictionary .dictionary-content .content-top {
margin-bottom: 28px;
}
.dictionary .dictionary-content .content-top h5 {
font-size: 14px;
line-height: 19px;
color: #111;
}
.dictionary .dictionary-content .content-top h4 {
font-size: 30px;
line-height: 42px;
color: #111;
}
.dictionary .dictionary-content .content-bottom {
display: flex;
align-items: flex-start;
}
.dictionary .dictionary-content .content-top p {
font-size: 20px;
line-height: 28px;
}
.dictionary .dictionary-content .content-bottom .desc {
font-size: 18px;
line-height: 25px;
}
.dictionary .dictionary-content .content-bottom .desc span {
text-transform: uppercase;
color: #444;
}
.dictionary .dictionary-content .content-bottom .desc a {
color: #2c40d0;
text-transform: uppercase;
display: inline;
}
.dictionary .dictionary-content .content-top p span a {
color: #2c40d0;
text-decoration: underline;
}
.dictionary .dictionary-item .dictionary-bar {
border-left: 1px solid #4444;
height: 100%;
padding-left: 40px;
}
.dictionary .dictionary-item .dictionary-bar h5 {
color: #666;
font-size: 14px;
line-height: 21px;
}
.dictionary .dictionary-item .dictionary-bar ul li a {
font-size: 20px;
line-height: 30px;
color: #2c40d0;
margin-bottom: 8px;
display: block;
}
@media (max-width: 767px) {
.dictionary .dictionary-content .content-bottom {
padding: 40px 16px;
background-color: #f5f5f6;
}
.dictionary .dictionary-item .dictionary-bar {
padding-top: 40px;
padding-left: 0;
border-left: none;
}
}

JS

<script>
    gsap.registerPlugin(ScrollTrigger);

    $(document).ready(function() {

        //gsap
        const $termsLinks = $('.terms-bar a');

        $termsLinks.each(function() {
            const $link = $(this);
            const targetId = $link.attr('href').substring(1);
            const $targetElement = $('#' + targetId);

            if ($targetElement.length) {
                ScrollTrigger.create({
                    trigger: $targetElement[0],
                    start: 'top center',
                    end: 'bottom center',
                    markers:true,
                    onEnter: function() {
                        $termsLinks.removeClass('active');
                        $link.addClass('active');
                    },
                    onLeave: function() {
                        $link.removeClass('active');
                    },
                    onEnterBack: function() {
                        $termsLinks.removeClass('active');
                        $link.addClass('active');
                    },
                    onLeaveBack: function() {
                        $link.removeClass('active');
                    }
                });
            }
        });
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $('.terms').offset().top - 52) {
            $('.terms-bar').addClass("sticky");
        } else {
            $('.terms-bar').removeClass("sticky");
        }
    });
</script>
