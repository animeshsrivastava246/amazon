import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Carousel = () => {
	const swiperRef = useRef(null);
	const videoRef = useRef(null);

	useEffect(() => {
		const swiperInstance = swiperRef.current?.swiper;
		if (!swiperInstance) return;

		const handleSlideChange = async () => {
			const currentIndex = swiperInstance.realIndex;

			if (videoRef.current) {
				// Pause and reset only if video slide is not active
				if (currentIndex !== 3) {
					videoRef.current.pause();
					videoRef.current.currentTime = 0;
				}
			}

			// Handle video slide
			if (currentIndex === 3 && videoRef.current) {
				swiperInstance.autoplay.stop();
				try {
					await videoRef.current.play(); // Wait for play to settle
				} catch (error) {
					console.error("Video play failed:", error);
				}

				videoRef.current.onended = () => {
					swiperInstance.slideNext();
					swiperInstance.autoplay.start();
				};
			}
		};

		swiperInstance.on("slideChange", handleSlideChange);

		// Cleanup on unmount
		return () => {
			swiperInstance.off("slideChange", handleSlideChange);
		};
	}, []);

	return (
		<div className="h-[600px] bg-white">
			<Swiper
				ref={swiperRef}
				loop={true}
				spaceBetween={0}
				navigation={true}
				modules={[Navigation, Autoplay]}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
				className="h-[50%]"
			>
				<SwiperSlide>
					<img src={"../images/carousel_1.jpg"} alt="1" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={"../images/carousel_2.jpg"} alt="2" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={"../images/carousel_3.jpg"} alt="3" />
				</SwiperSlide>
				<SwiperSlide className="bg-black">
					<video
						ref={videoRef}
						muted
						playsInline
						autoPlay
						controls={false}
						className="w-full h-full object-cover"
					>
						<source src={"../images/carousel_vid.mp4"} type="video/mp4" />
					</video>
				</SwiperSlide>

				<SwiperSlide>
					<img src={"../images/carousel_4.jpg"} alt="4" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={"../images/carousel_5.jpg"} alt="5" />
				</SwiperSlide>
			</Swiper>
			<div className="h-[50%] bg-gradient-to-b from-stone-900" />
		</div>
	);
};

export default Carousel;
