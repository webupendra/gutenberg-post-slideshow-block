import "slick-carousel";

const { postsPerSlide, responsive } = sliderSettings;

$(".wp-block-postslider-gutenberg-post-slider-block").slick({
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: postsPerSlide,
	slidesToScroll: 1,
	rows: 1,
	responsive: responsive,
});
