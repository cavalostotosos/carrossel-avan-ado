class ReflectionCarousel {
	constructor() {
		this.currentIndex = 0;
		this.images = document.querySelectorAll(".image-container");
		this.dots = document.querySelectorAll(".dot");
		this.totalImages = this.images.length;
		this.autoPlayInterval = null;

		this.init();
	}

	init() {
		this.dots.forEach((dot, index) => {
			dot.addEventListener("click", () => {
				this.goToSlide(index);
			});
		});

		this.startAutoPlay();

		const container = document.querySelector(".carousel-container");
		container.addEventListener("mouseenter", () => this.stopAutoPlay());
		container.addEventListener("mouseleave", () => this.startAutoPlay());
	}

	goToSlide(index) {
		if (index === this.currentIndex) return;

		this.currentIndex = index;
		this.updateCarousel();
		this.updateDots();
	}

	updateCarousel() {
		this.images.forEach((img, index) => {
			img.className = "image-container";

			if (index === this.currentIndex) {
				img.classList.add("center");
			} else if (index === this.getPrevIndex()) {
				img.classList.add("left");
			} else if (index === this.getNextIndex()) {
				img.classList.add("right");
			} else {
				img.classList.add("hidden");
			}
		});
	}

	updateDots() {
		this.dots.forEach((dot, index) => {
			dot.classList.toggle("active", index === this.currentIndex);
		});
	}

	getPrevIndex() {
		return (this.currentIndex - 1 + this.totalImages) % this.totalImages;
	}

	getNextIndex() {
		return (this.currentIndex + 1) % this.totalImages;
	}

	nextSlide() {
		const nextIndex = this.getNextIndex();
		this.goToSlide(nextIndex);
	}

	startAutoPlay() {
		this.stopAutoPlay();
		this.autoPlayInterval = setInterval(() => {
			this.nextSlide();
		}, 4000);
	}

	stopAutoPlay() {
		if (this.autoPlayInterval) {
			clearInterval(this.autoPlayInterval);
			this.autoPlayInterval = null;
		}
	}
}

