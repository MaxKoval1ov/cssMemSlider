// const text = document.querySelector(".content_text");
// const btns = document.querySelectorAll(".button_wrapper");
// const imgs = document.querySelectorAll(".slide");


// let viewport = document.getElementById("wrapper").offsetWidth;

const memTextMas = [
    "I had fun once. It was awful",
    "What if this planet is a reality TV show for other planets",
    "There is nothing to eat in this damn house!",
    "Me getting ready in this morning.",
    "That moment you make eye contact whith another cowoker while walking down the hall.",
]

class SliderCarousel {
    constructor({
      main,
      wrap,
      text,
      prev,
      next,
      pagination,
      infinity = false,
      position = 0,
      slidesToShow = 3
    }) {
      if (!main || !wrap) {
        console.warn(
          'Slider carousel: Necessary to add 2 options, "main" and "wrap" !'
        );
      }
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.text = document.querySelector(text);
      this.slides = document.querySelector(wrap).children;
      this.prev = document.querySelector(prev);
      this.next = document.querySelector(next);
      this.pagination = document.querySelector(pagination);
      this.slidesToShow = slidesToShow;
      this.options = {
        position,
        infinity,
        widthSlide: 100,
        maxPosition: this.slides.length - this.slidesToShow,
        firstSlide:this.slides[0],
        lastSlide:this.slides[this.slides.length-1],
      };
    }
  
    init() {
      this.addGloClass();
      this.addStyle();
      if (this.prev && this.next) {
        this.dots();
        this.controlSlider();
      } else {
        this.dots();
        this.addArrow();
        this.controlSlider();
      }
    }
  
    addGloClass() {
      this.main.classList.add("glo-slider");
      this.wrap.classList.add("glo-slider__wrap");
      for (const item of this.slides) {
        item.classList.add("glo-slider__item");
      }
    }
  
    addStyle() {
      const style = document.createElement("style");/////////////////////
      style.id = "sliderCarousel-style";
      style.textContent = `
              .glo-slider {
                  overflow: hidden;
                  
              }
              .glo-slider__wrap {
                  transition: transform 0.5s;
                 
              }
              .glo-slider__item {
                  
                  
              }
          `;
      document.head.appendChild(style);
    }
  
    dots() {
      if (this.pagination) {
        this.dotArray = [];
        for (let i = 0; i < this.slides.length; i++) {
          const dot = document.createElement("div");
          dot.classList.add("button_wrapper");
          dot.innerHTML = '<div class="slider_btn"></div>';
          this.pagination.appendChild(dot);
  
          if (i == 0) {
            dot.className += " active";
          }
          this.dotArray.push(dot);
        }
  
        this.dotArray.forEach((item, indexDot) => {
          item.addEventListener("click", () => {
            this.options.position = indexDot;
            console.log(indexDot);
            this.currentSlide(this.options.position);
          });
        });
      }
    }
  
    controlSlider() {
      this.prev.addEventListener("click", this.prevSlider.bind(this));
      this.next.addEventListener("click", this.nextSlider.bind(this));
    }
  
    currentSlide(index) {
        this.text.innerHTML = memTextMas[this.options.position];
        this.text.classList.remove("run-animation");
        void this.text.offsetWidth;
        this.text.classList.add("run-animation");
      this.wrap.style.transform = `translateX(-${
        (index) * this.options.widthSlide
      }%)`;
      this.currentDot(index);
    }
  
    currentDot(index) {
      for (let dot of this.dotArray) {
        dot.classList.remove("active");
      }
      this.dotArray[index].classList.add("active");
    }
  
    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
          --this.options.position;
    
          if (this.options.position < 0) {
            this.options.position = this.options.maxPosition;
          }
    
          console.log(this.options.position);
          if (this.dotArray) {
            this.currentDot(this.options.position);
          }
          this.text.innerHTML = memTextMas[this.options.position];
            this.text.classList.remove("run-animation");
            void this.text.offsetWidth;
            this.text.classList.add("run-animation");
          this.wrap.style.transform = `translateX(-${
            this.options.position * this.options.widthSlide
          }%)`;
        }
    }

        // --this.options.position;
        // this.wrap.style.transform = `translateX(-${
        //     -(this.options.position + 1) * this.options.widthSlide
        //     }%)`;    
        //     console.log(-(this.options.position + 1) * this.options.widthSlide);
        //     console.log(this.options.position);

        // if (this.options.position < 0) {
        //     this.wrap.style.transition = "transform 0s";
        //     this.slides[0].offsetParent;
        //     console.log(this.options.maxPosition)
            
        //     this.wrap.style.transform = `translateX(-500%)`;
        //     console.log(-(this.options.maxPosition) * this.options.widthSlide);
        //         this.wrap.style.transition = "transform 0.5s";
        //     this.options.position = this.options.maxPosition;           
        //   }
            // this.wrap.style.transition = "transform 0.5s;";
            // this.wrap.style.transform = `translateX(-${
            // this.options.position * this.options.widthSlide
            // }%)`;                

    //   if (this.options.infinity || this.options.position > 0) {
        
  
        
  
    //     console.log(this.options.position);
    //     if (this.dotArray) {
    //       this.currentDot(this.options.position);
    //     }
  
    //     this.wrap.style.transform = `translateX(-${
    //       this.options.position * this.options.widthSlide
    //     }%)`;
    //   }
  
    nextSlider() {
      if (
        this.options.infinity ||
        this.options.position < this.options.maxPosition
      ) {
        ++this.options.position;
  
        if (this.options.position > this.options.maxPosition) {
          this.options.position = 0;
        }
        console.log(this.options.position);
        if (this.dotArray) {
          this.currentDot(this.options.position);
        }
        this.text.innerHTML = memTextMas[this.options.position];
        this.text.classList.remove("run-animation");
        void this.text.offsetWidth;
        this.text.classList.add("run-animation");
        this.wrap.style.transform = `translateX(-${
          this.options.position * this.options.widthSlide
        }%)`;
      }
    }
  
    addArrow() {
      this.prev = document.createElement("button");
      this.next = document.createElement("button");
  
      this.prev.className = "glo-slider__prev";
      this.next.className = "glo-slider__next";
  
      this.main.appendChild(this.prev);
      this.main.appendChild(this.next);
  
      const style = document.createElement("style");
      style.textContent = `
              .glo-slider__prev,
              .glo-slider__next {
                  cursor: pointer;
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  border: 20px solid transparent;
                  background: transparent;
              }
              .glo-slider__prev {
                  left: 20px;
                  border-right-color:  #19b5fe;
              }
              .glo-slider__next {
                  right: 20px;
                  border-left-color:  #19b5fe;
              }
  
              .glo-slider__prev:hover,
              .glo-slider__next:hover,
              .glo-slider__prev:focus,
              .glo-slider__next:focus {
                  background: transparent;
                  outline: none;
              }
              
          `;
      document.head.appendChild(style);
    }
  }
  
  const carousel = new SliderCarousel(
      {
          main:".slider",
          wrap:".slider_track",
          text:".content_text",
          prev:".prev_arrow",
          next:".next_arrow",
          pagination:".slider_btns",
          slidesToShow:1,
          infinity:true
      }
  )

  carousel.init();