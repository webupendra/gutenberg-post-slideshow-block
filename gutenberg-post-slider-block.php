<?php

/**
 * Plugin Name:       Gutenberg Post Slider Block
 * Description:       A responsive and interactive Gutenberg block for creating dynamic post carousel sliders.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Web Upendra
 * Author URI:        https://webupendra.wordpress.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-post-slider-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function postslider_related_post_slider_block_block_init(){
	register_block_type(__DIR__ . '/build', array(
		'render_callback' => 'postslider_related_post_slider_block_render_callback'
	));
}

/**
 * Enqueues the frontend script for the slider and adds inline slider settings.
 *
 * @param array $block_attributes Attributes passed to the block.
 */
function postslider_related_post_slider_block_enqueue_frontend_script($block_attributes){
	$script_path       = 'build/frontend.js';
	$script_asset_path = 'build/frontend.asset.php';
	$script_asset      = require($script_asset_path);
	$script_url = plugins_url($script_path, __FILE__);

	 // Extract slider attributes
	[
		'postsPerSlide' => $posts_per_slide,
		'breakpoints' => $breakpoints,
	] = $block_attributes;

	// Helper function to return responsive settings
	if (!function_exists('return_responsive_settings')) {
		function return_responsive_settings($breakpoint)
		{
			['breakpointSettings' => $breakpoint_settings] = $breakpoint;
			return $breakpoint_settings;
		}
	}

	// Prepare slider settings
	$slider_settings = [
		'postsPerSlide' => $posts_per_slide,
		'responsive' => array_map('return_responsive_settings', $breakpoints)
	];

	// Enqueue the slider script and inject slider settings
	wp_enqueue_script('jquery-slick', $script_url, $script_asset['dependencies'], $script_asset['version'], true);
	wp_add_inline_script('jquery-slick', 'const sliderSettings = ' . json_encode($slider_settings), 'before');
}

/**
 * Renders the block content dynamically and sets up the slider.
 *
 * @param array $block_attributes Block attributes.
 * @param string $content Block content.
 * @return string Rendered block content.
 */
function postslider_related_post_slider_block_render_callback($block_attributes, $content) {

	if (!is_admin()) {
		postslider_related_post_slider_block_enqueue_frontend_script($block_attributes);
	}

	// Extract block attributes
	[
		'totalPostsToShow' => $total_posts_to_show,
		'display' => $display,
		'carouselPadding' => $carousel_padding,
		'carouselMargin' => $carousel_margin,
		'itemPadding' => $item_padding,
		'itemMargin' => $item_margin,
		'linkSlideItemBorder' => $link_slide_item_border,
		'flatSlideItemBorder' => $flat_slide_item_border,
		'splittedSlideItemBorder' => $splitted_slide_item_border,
		'slideItemBorderRadius' => $slide_item_border_radius,
		'slideItemTextColor' => $slide_item_text_color,
		'slideItemShadow' => $slide_item_shadow,
	] = $block_attributes;

	// Extract display options
	[
		'displayFeaturedImage' => $display_featured_image,
		'displayCategory' => $display_category,
		'displayMeta' => $display_meta,
		'displayExcerpt' => $display_excerpt,
		'displayReverseOrder' => $reverse_order
	] = $display;

	// Extract paddings and margins
	[
		'top' => $carousel_padding_top,
		'right' => $carousel_padding_right,
		'bottom' => $carousel_padding_bottom,
		'left' => $carousel_padding_left,
	] = $carousel_padding;

	[
		'top' => $carousel_margin_top,
		'bottom' => $carousel_margin_bottom,
	] = $carousel_margin;

	[
		'top' => $item_padding_top,
		'right' => $item_padding_right,
		'bottom' => $item_padding_bottom,
		'left' => $item_padding_left,
	] = $item_padding;

	[
		'top' => $item_margin_top,
		'right' => $item_margin_right,
		'bottom' => $item_margin_bottom,
		'left' => $item_margin_left,
	] = $item_margin;

	// Extract slide item border and shadow properties
	[
		'top' => $splitted_slide_item_border_top,
		'right' => $splitted_slide_item_border_right,
		'bottom' => $splitted_slide_item_border_bottom,
		'left' => $splitted_slide_item_border_left
	] = $splitted_slide_item_border;

	// Extract slide item Color and space properties
	[
		'top' => $splitted_slide_item_border_top,
		'right' => $splitted_slide_item_border_right,
		'bottom' => $splitted_slide_item_border_bottom,
		'left' => $splitted_slide_item_border_left
	] = $splitted_slide_item_border;

	// Prepare inline styles
	$slide_padding_property = 'padding:' . (isset($item_padding_top) ? $item_padding_top  : '0') . ' ' . (isset($item_padding_right) ? $item_padding_right  : '0') . ' ' . (isset($item_padding_bottom) ? $item_padding_bottom  : '0') . ' ' . (isset($item_padding_left) ? $item_padding_left  : '0') . ';';

	$slide_margin_property = 'margin:' . (isset($item_margin_top) ? $item_margin_top  : '0') . ' ' . (isset($item_margin_right) ? $item_margin_right  : '0') . ' ' . (isset($item_margin_bottom) ? $item_margin_bottom  : '0') . ' ' . (isset($item_margin_left) ? $item_margin_left  : '0') . ';';

	$slide_border_property = $link_slide_item_border ? 'border:' . (isset($flat_slide_item_border['color']) ?  $flat_slide_item_border['color'] : 'transparent') . ' ' . (isset($flat_slide_item_border['style']) ?  $flat_slide_item_border['style'] : 'none') . ' ' . (isset($flat_slide_item_border['width']) ?  $flat_slide_item_border['width'] : '0') . ';' : 'border-top:' . (isset($splitted_slide_item_border_top['color']) ?  $splitted_slide_item_border_top['color'] : 'transparent') . ' ' . (isset($splitted_slide_item_border_top['style']) ?  $splitted_slide_item_border_top['style'] : 'none') . ' ' . (isset($splitted_slide_item_border_top['width']) ?  $splitted_slide_item_border_top['width'] : '0') . ';' . 'border-right:' . (isset($splitted_slide_item_border_right['color']) ?  $splitted_slide_item_border_right['color'] : 'transparent') . ' ' . (isset($splitted_slide_item_border_right['style']) ?  $splitted_slide_item_border_right['style'] : 'none') . ' ' . (isset($splitted_slide_item_border_right['width']) ?  $splitted_slide_item_border_right['width'] : '0') . ';' . 'border-bottom:' . (isset($splitted_slide_item_border_bottom['color']) ?  $splitted_slide_item_border_bottom['color'] : 'transparent') . ' ' . (isset($splitted_slide_item_border_bottom['style']) ?  $splitted_slide_item_border_bottom['style'] : 'none') . ' ' . (isset($splitted_slide_item_border_bottom['width']) ?  $splitted_slide_item_border_bottom['width'] : '0') . ';' . 'border-left:' . (isset($splitted_slide_item_border_left['color']) ?  $splitted_slide_item_border_left['color'] : 'transparent') . ' ' . (isset($splitted_slide_item_border_left['style']) ?  $splitted_slide_item_border_left['style'] : 'none') . ' ' . (isset($splitted_slide_item_border_left['width']) ?  $splitted_slide_item_border_left['width'] : '0') . ';';

	$slide_border_radius_property = 'border-radius:' . (isset($slide_item_border_radius['top']) ? $slide_item_border_radius['top'] : '0') . ' ' . (isset($slide_item_border_radius['right']) ? $slide_item_border_radius['right'] : '0') . ' ' . (isset($slide_item_border_radius['bottom']) ? $slide_item_border_radius['bottom'] : '0') . ' ' . (isset($slide_item_border_radius['left']) ? $slide_item_border_radius['left'] : '0') . ';';

	$slide_shadow_property = 'box-shadow:' . $slide_item_shadow['offsetX'] . 'px ' . $slide_item_shadow['offsetY'] . 'px ' . $slide_item_shadow['blurRadius'] . 'px ' . $slide_item_shadow['spreadRadius'] . 'px ' . $slide_item_shadow['shadowColor'] . ';';
	$slide_item_color = 'color:' . $slide_item_text_color['color'] . ';';

	if (!function_exists('postslider_return_category_id_array')) {
		function postslider_return_category_id_array($category_object)
		{
			return $category_object->term_id;
		}
	}

	if (!function_exists('postslider_get_category_badges')) {
		function postslider_get_category_badges($category_object)
		{
			return '<span class="category"><a href="' . esc_url(get_category_link($category_object)) . '">' . esc_html($category_object->name) . '</a></span>';
		}
	}

	// Fetch related posts
	$gutenberg_posts = new WP_Query(
		array(
			'posts_per_page' => $total_posts_to_show,
			'post_status' => 'publish',
			'post__not_in' => array(get_the_ID()),
			'category__in' => array_map('postslider_return_category_id_array', get_the_category(get_the_ID())),
			'order' => $reverse_order ? 'ASC' : 'DESC'
		)
	);

	$wrapper_attributes = get_block_wrapper_attributes();

	$output = '<div style="padding:' . (isset($carousel_padding_top) ? $carousel_padding_top  : '0') . ' ' . (isset($carousel_padding_right) ? $carousel_padding_right  : '0') . ' ' . (isset($carousel_padding_bottom) ? $carousel_padding_bottom  : '0') . ' ' . (isset($carousel_padding_left) ? $carousel_padding_left  : '0') . '; margin:' . (isset($carousel_margin_top) ? $carousel_margin_top  : '0') . ' auto ' . (isset($carousel_margin_bottom) ? $carousel_margin_bottom  : '0') . ' " ' . $wrapper_attributes . '>';

	// Generate output for each post
	if ($gutenberg_posts->have_posts()) {
		foreach ($gutenberg_posts->posts as $post) {
			$post_id = $post->ID;
			$featured_image = $display_featured_image ? '<a href="' . esc_url(get_permalink($post_id)) . '"> ' .
				wp_get_attachment_image(get_post_thumbnail_id($post_id), 'large', false, array(
					'class' => 'attachment-large size-large featured'
				)) . '</a>' : '';

			$category = $display_category ? '<div class="terms">
			<div class="categories">' . implode(' | ', array_map('postslider_get_category_badges', get_the_category($post_id))) . '</div></div>' : '';

			$meta = $display_meta ? '<div class="post_meta" style="display: flex;">
			<span class="bypostauthor">
			By: <a href="' . esc_url(get_author_posts_url(get_post_field('post_author', $post_id))) . '">' . esc_html(get_the_author_meta('display_name', get_post_field('post_author', $post_id))) . '</a>
			</span>
			&nbsp;
			<span class="posted-on">
			Published: ' . esc_html(get_the_date('Y-m-d', $post_id)) . '
			</span>
			</div>' : '';

			$excerpt = $display_excerpt ? '<div class="excerpt"><p>' . esc_html(substr(get_the_excerpt($post_id), 0, $block_attributes['excerptLength'])) . '...</p></div>' : '';

			$output .= '<div key="' . esc_html($post_id) . '" class="related-post-slider-item">
				<div class="related-post-slider-item-content-wrapper" style="' . $slide_padding_property . $slide_margin_property . $slide_border_property . $slide_border_radius_property . $slide_shadow_property . '">
				' . $featured_image . $category . '
					<h3 class="title"><a href="' . esc_url(get_permalink($post_id)) . '" style="' . $slide_item_color . '">' . esc_html(get_the_title($post_id)) . '</a></h3> ' . $meta . $excerpt . '
				</div>
			</div>';
		}
	}
	$output .= '</div>';

	return $output;
}

add_action('init', 'postslider_related_post_slider_block_block_init');
