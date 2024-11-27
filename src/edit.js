/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import {
	Button,
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
	TextControl,
	RangeControl,
	ColorPicker,
	__experimentalBorderControl as BorderControl,
	__experimentalBoxControl as BoxControl,
} from "@wordpress/components";

import { Icon, desktop, tablet, mobile, link, linkOff } from "@wordpress/icons";

import { useEffect } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

import Block from "./block";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	const {
		display,
		postsPerSlide,
		totalPostsToShow,
		breakpoints,
		carouselPadding,
		carouselMargin,
		itemPadding,
		itemMargin,
		linkSlideItemBorder,
		flatSlideItemBorder,
		splittedSlideItemBorder,
		slideItemBorderRadius,
		slideItemShadow,
	} = attributes;
	const {
		displayFeaturedImage,
		displayCategory,
		displayMeta,
		displayExcerpt,
		displayReverseOrder,
	} = display;
	const { offsetX, offsetY, blurRadius, spreadRadius, shadowColor } =
		slideItemShadow;

	useEffect(() => {
		if (totalPostsToShow > 0 && totalPostsToShow < postsPerSlide) {
			setAttributes({ postsPerSlide: parseInt(totalPostsToShow) });
		}
	}, [postsPerSlide, totalPostsToShow]);

	const desktopBreakpointSettings = breakpoints.filter(
		(breakpoint) => breakpoint.device === "desktop"
	)[0].breakpointSettings;

	const { breakpoint: desktopBreakPoint, settings: desktopResponsiveSettings } =
		desktopBreakpointSettings;

	const tabletBreakpointSettings = breakpoints.filter(
		(breakpoint) => breakpoint.device === "tablet"
	)[0].breakpointSettings;

	const { breakpoint: tabletBreakPoint, settings: tabletResponsiveSettings } =
		tabletBreakpointSettings;

	const mobileBreakpointSettings = breakpoints.filter(
		(breakpoint) => breakpoint.device === "mobile"
	)[0].breakpointSettings;

	const { breakpoint: mobileBreakPoint, settings: mobileResponsiveSettings } =
		mobileBreakpointSettings;

	const slidesToShowSelectOpts = [
		{
			label: __("1", "gutenberg-post-slider-block"),
			value: 1,
		},
		{
			label: __("2", "gutenberg-post-slider-block"),
			value: 2,
		},
		{
			label: __("3", "gutenberg-post-slider-block"),
			value: 3,
		},
		{
			label: __("4", "gutenberg-post-slider-block"),
			value: 4,
		},
	];

	const setBreakpointOrSlidesToShowAttr = (
		device,
		breakpointSettings = {},
		responsiveSettings = {},
		property,
		value
	) => {
		switch (property) {
			case "breakpoint":
				return setAttributes({
					breakpoints: [
						...breakpoints.filter((breakpoint) => breakpoint.device !== device),
						{
							device: device,
							breakpointSettings: {
								...breakpointSettings,
								breakpoint: value ? parseInt(value) : 0,
							},
						},
					],
				});
			case "slidesToShow":
				return setAttributes({
					breakpoints: [
						...breakpoints.filter((breakpoint) => breakpoint.device !== device),
						{
							device: device,
							breakpointSettings: {
								...breakpointSettings,
								settings: {
									...responsiveSettings,
									slidesToShow: parseInt(value),
								},
							},
						},
					],
				});
			default:
				return setAttributes({ breakpoints: [...breakpoints] });
		}
	};

	return (
		<div
			{...blockProps}
			style={{
				...blockProps.style,
				padding: `${carouselPadding.top ?? "0"} ${
					carouselPadding.right ?? "0"
				} ${carouselPadding.bottom ?? "0"} ${carouselPadding.left ?? "0"}`,
				margin: `${carouselMargin.top ?? "0"} auto ${
					carouselMargin.bottom ?? "0"
				}`,
			}}
		>
			<InspectorControls>
				<PanelBody title={__("Display", "gutenberg-post-slider-block")}>
					<ToggleControl
						label={__("Display category", "gutenberg-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: { ...display, displayCategory: !displayCategory },
							});
						}}
						checked={displayCategory}
					/>

					<ToggleControl
						label={__("Display featured image", "gutenberg-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayFeaturedImage: !displayFeaturedImage,
								},
							});
						}}
						checked={displayFeaturedImage}
					/>

					<ToggleControl
						label={__("Display meta info", "gutenberg-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayMeta: !displayMeta,
								},
							});
						}}
						checked={displayMeta}
					/>

					<ToggleControl
						label={__("Display excerpt", "gutenberg-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayExcerpt: !displayExcerpt,
								},
							});
						}}
						checked={displayExcerpt}
					/>
					<ToggleControl
						label={__("Reverse order", "gutenberg-post-slider-block")}
						onChange={() => {
							setAttributes({
								display: {
									...display,
									displayReverseOrder: !displayReverseOrder,
								},
							});
						}}
						checked={displayReverseOrder}
					/>
					<TextControl
						label={__("Total posts", "gutenberg-post-slider-block")}
						value={totalPostsToShow}
						onChange={(newValue) => {
							setAttributes({
								totalPostsToShow: newValue ? parseInt(newValue) : 0,
							});
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "gutenberg-post-slider-block")}
						labelPosition={"side"}
						value={postsPerSlide}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setAttributes({ postsPerSlide: parseInt(newValue) });
						}}
						__nextHasNorMarginBottom
					/>
				</PanelBody>

				<PanelBody title={__("Responsive", "gutenberg-post-slider-block")}>
					<PanelRow className="responsive-breakpoint">
						<Icon icon={desktop} />
						<span style={{ marginLeft: "5px" }}>
							{__("Desktop", "gutenberg-post-slider-block")}
						</span>
					</PanelRow>
					<TextControl
						className="responsive-breakpoint__input"
						label={__("Breakpoint", "gutenberg-post-slider-block")}
						value={desktopBreakPoint}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"desktop",
								desktopBreakpointSettings,
								undefined,
								"breakpoint",
								newValue
							);
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "gutenberg-post-slider-block")}
						labelPosition={"side"}
						value={postsPerSlide}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"desktop",
								desktopBreakpointSettings,
								desktopResponsiveSettings,
								"slidesToShow",
								newValue
							);

							setAttributes({ postsPerSlide: parseInt(newValue) });
						}}
						__nextHasNorMarginBottom
					/>
					<PanelRow className="responsive-breakpoint">
						<Icon icon={tablet} />
						<span style={{ marginLeft: "5px" }}>
							{__("Tablet", "gutenberg-post-slider-block")}
						</span>
					</PanelRow>
					<TextControl
						className="responsive-breakpoint__input"
						label={__("Breakpoint", "gutenberg-post-slider-block")}
						value={tabletBreakPoint}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"tablet",
								tabletBreakpointSettings,
								undefined,
								"breakpoint",
								newValue
							);
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "gutenberg-post-slider-block")}
						labelPosition={"side"}
						value={tabletResponsiveSettings.slidesToShow}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"tablet",
								tabletBreakpointSettings,
								tabletResponsiveSettings,
								"slidesToShow",
								newValue
							);
						}}
						__nextHasNorMarginBottom
					/>
					<PanelRow className="responsive-breakpoint">
						<Icon icon={mobile} />
						<span style={{ marginLeft: "5px" }}>
							{__("Mobile", "gutenberg-post-slider-block")}
						</span>
					</PanelRow>
					<TextControl
						className="responsive-breakpoint__input"
						label={__("Breakpoint", "gutenberg-post-slider-block")}
						value={mobileBreakPoint}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"mobile",
								mobileBreakpointSettings,
								undefined,
								"breakpoint",
								newValue
							);
						}}
					/>
					<SelectControl
						label={__("Posts per slide", "gutenberg-post-slider-block")}
						labelPosition={"side"}
						value={mobileResponsiveSettings.slidesToShow}
						options={slidesToShowSelectOpts}
						onChange={(newValue) => {
							setBreakpointOrSlidesToShowAttr(
								"mobile",
								mobileBreakpointSettings,
								mobileResponsiveSettings,
								"slidesToShow",
								newValue
							);
						}}
						__nextHasNorMarginBottom
					/>
				</PanelBody>

				<PanelBody title={__("Dimensions", "gutenberg-post-slider-block")}>
					<BoxControl
						label={__("Carousel padding", "gutenberg-post-slider-block")}
						values={carouselPadding}
						onChange={(newValues) => {
							setAttributes({ carouselPadding: newValues });
						}}
					/>
					<BoxControl
						label={__("Carousel margin", "gutenberg-post-slider-block")}
						sides={["top", "bottom"]}
						values={carouselMargin}
						onChange={(newValues) => {
							setAttributes({ carouselMargin: newValues });
						}}
					/>
					<BoxControl
						label={__("Slide item padding", "gutenberg-post-slider-block")}
						values={itemPadding}
						onChange={(newValues) => {
							setAttributes({ itemPadding: newValues });
						}}
					/>
					<BoxControl
						label={__("Slide item margin", "gutenberg-post-slider-block")}
						values={itemMargin}
						onChange={(newValues) => {
							setAttributes({ itemMargin: newValues });
						}}
					/>
				</PanelBody>


				<PanelBody title={__("Items Styles", "gutenberg-post-slider-block")}>
					<PanelRow>{__("Heading Color", "gutenberg-post-slider-block")}</PanelRow>
						<ColorPicker
							onClick={() => {
								setAttributes({ slideItemTextColor: !slideItemTextColor });
							}}
						/>					
				</PanelBody>

				<PanelBody title={__("Styles", "gutenberg-post-slider-block")}>
					<PanelRow>
						{__("Slide item border", "gutenberg-post-slider-block")}
						<Button
							icon={linkSlideItemBorder ? link : linkOff}
							label={__(
								linkSlideItemBorder ? "Unlink borders" : "Link borders",
								"gutenberg-post-slider-block"
							)}
							onClick={() => {
								setAttributes({ linkSlideItemBorder: !linkSlideItemBorder });
							}}
						/>
					</PanelRow>
					{linkSlideItemBorder ? (
						<BorderControl
							label={__("Border", "gutenberg-post-slider-block")}
							withSlider={true}
							value={flatSlideItemBorder}
							onChange={(newSlideItemBorder) => {
								setAttributes({ flatSlideItemBorder: newSlideItemBorder });
							}}
						/>
					) : (
						<>
							<BorderControl
								label={__("Border top", "gutenberg-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.top}
								onChange={(newBorderTop) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											top: newBorderTop,
										},
									});
								}}
							/>
							<BorderControl
								style={{ marginTop: "10px" }}
								label={__("Border right", "gutenberg-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.right}
								onChange={(newBorderRight) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											right: newBorderRight,
										},
									});
								}}
							/>
							<BorderControl
								style={{ marginTop: "10px" }}
								label={__("Border bottom", "gutenberg-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.bottom}
								onChange={(newBorderBottom) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											bottom: newBorderBottom,
										},
									});
								}}
							/>
							<BorderControl
								style={{ marginTop: "10px" }}
								label={__("Border left", "gutenberg-post-slider-block")}
								withSlider={true}
								value={splittedSlideItemBorder.left}
								onChange={(newBorderLeft) => {
									setAttributes({
										splittedSlideItemBorder: {
											...splittedSlideItemBorder,
											left: newBorderLeft,
										},
									});
								}}
							/>
						</>
					)}
					<br />
					<BoxControl
						label={__("Border radius", "gutenberg-post-slider-block")}
						values={slideItemBorderRadius}
						onChange={(newValues) => {
							setAttributes({
								slideItemBorderRadius: newValues,
							});
						}}
					/>
					<PanelRow>
						{__("Slide item shadow", "gutenberg-post-slider-block")}
					</PanelRow>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Offset X", "gutenberg-post-slider-block")}
						max={100}
						min={-100}
						allowReset={true}
						resetFallbackValue={0}
						value={offsetX}
						onChange={(newOffsetX) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									offsetX: newOffsetX,
								},
							});
						}}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Offset Y", "gutenberg-post-slider-block")}
						max={100}
						min={-100}
						allowReset={true}
						resetFallbackValue={0}
						value={offsetY}
						onChange={(newOffsetY) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									offsetY: newOffsetY,
								},
							});
						}}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Blur radius", "gutenberg-post-slider-block")}
						max={100}
						min={0}
						allowReset={true}
						resetFallbackValue={0}
						value={blurRadius}
						onChange={(newBlurRadius) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									blurRadius: newBlurRadius,
								},
							});
						}}
					/>
					<RangeControl
						__nextHasNoMarginBottom
						label={__("Spread radius", "gutenberg-post-slider-block")}
						max={100}
						min={-100}
						allowReset={true}
						resetFallbackValue={0}
						value={spreadRadius}
						onChange={(newSpreadRadius) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									spreadRadius: newSpreadRadius,
								},
							});
						}}
					/>
					<PanelRow>{__("Shadow color", "gutenberg-post-slider-block")}</PanelRow>
					<ColorPicker
						enableAlpha={true}
						defaultValue={shadowColor}
						onChange={(newShadowColor) => {
							setAttributes({
								slideItemShadow: {
									...slideItemShadow,
									shadowColor: newShadowColor,
								},
							});
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<Block {...attributes} />
		</div>
	);
}
