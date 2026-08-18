<?php
/**
 * Theme bootstrap for Tracing the Path.
 *
 * @package TracingThePath
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ttp_enqueue_assets() {
	$theme = wp_get_theme();

	wp_enqueue_style(
		'tracing-the-path',
		get_stylesheet_uri(),
		array(),
		$theme->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'ttp_enqueue_assets' );
