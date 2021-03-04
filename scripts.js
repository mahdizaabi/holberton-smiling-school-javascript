$(document ).ready(function() {
  /* InnerCarousel component*/
  function innerCarouselComponent(name, title, text, url, active){
      return ($.parseHTML(`<div class="carousel-item ${active}">
      <div class="row w-75 mx-auto d-flex flex-sm-row flex-column justify-content-center align-items-center">
        <div class="col-6 col-lg-3 d-flex justify-content-sm-end justify-content-lg-end justify-content-center">
          <img class="rounded-circle carousel__img" src=${url}>
        </div>
        <div class="col-lg-8 ml-sm-0 carousel-item__text px-lg-5 mr-5 pt-3">
          <p class="mr-lg-5">&laquo; ${text}</p>
          <p class="font-weight-bold">${name}</p>
          <p class="font-italic">${title}</p>
        </div>
      </div>
    </div>`))
  }
  /* Loop through the Array-data and display each slide */
  function displayCarousels(data) {
  const firstCarousel = $(".carousel-inner")[0];
  for(let i = 0; i <data.length; i++){
      const {pic_url, name, title, text} = data[i]
      $(firstCarousel).append(function(){
          const active = i === 0 ? "active" : ""
          return innerCarouselComponent(name, title, text, pic_url, active)
      });
  }  
  }
  /* fetch data and invoke displayCarousel*/
  function fetchPosts(url, parent){
      $.get('https://smileschool-api.hbtn.info/quotes', $("#smileschoolcarousel").hide()).done(data => {
          $(".loader.testim").hide()
          $("#smileschoolcarousel").show()    
      displayCarousels(data)})
    }

    fecthCarouselVideos();
    /* INVOKE */
    fetchPosts()
    /*  MOST POPULAR TUTORIALS Carousel   */
function joinCards(id){
  $(`#${id} .carousel-item`).each(function(){
    if($('#videoCarousel .carousel-item')){
  
      console.log("ok selector match")
    }
  
    let minPerSlide = 4;
    let next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }
    next.children(":first-child").clone().appendTo($(this));
  
    for (let i = 0; i < minPerSlide; i++) {
      next = next.next();
      if (!next.length) {
        next = $(this).siblings(":first");
      }
  
      next.children(":first-child").clone().appendTo($(this));
    }
  });}

    function carouselVideoItem(title, subtitle, author, stars, active, author_pic_url, thumb_url) {
      let starImage = '<img src="./images/star_on.png" alt=""/>'

      let CxSuper = $(`<div class='carousel-item ${active}'></div>`);
      let CardtoAppend = $.parseHTML(`
      <div class="col-md-3">
          <div class="card">
            <div class=" d-flex align-items-center justify-content-center">
              <img src=${thumb_url} alt="Video thumbnail" class="card-img-top" />
              <img src="./images/play.png" alt="Play icon" class="position-absolute play__icon" />
            </div>
            <div class="card-body">
              <h4 class="card-title font-weight-bold text-left">${title}</h4>
              <p class="card-text text-muted text-left">${subtitle}</p>
              <div class="d-flex align-items-center">
                <div class="mr-3">
                  <img src=${author_pic_url} alt="Profile thumbnail" width="30px" class="rounded-circle">
                </div>
                <span class="user__name">${author}</span>
              </div>
              <div class="d-flex mt-2 justify-content-between">
                <div class="rating__stars">
                  ${starImage.repeat(stars)}
                </div>
                <span class="duration__video">8 min</span>
              </div>
            </div>
          </div>
    </div>`)

      let item = $(CxSuper).append(CardtoAppend);
      return item;
    };

    function fecthCarouselVideos(){
      $.get('https://smileschool-api.hbtn.info/popular-tutorials', ).done(data => {
        $('.loader.mpt').hide()
        $('#popular_tutorials-lg .carousel-inner').show()
      displayCarouselVideos(data)})
    }

    function displayCarouselVideos(data){
      let x = data.length
      const SecondCarousel = $(".carousel-inner")[1];
      for(let i = 0; i < x; i++){
        const {title,author, star, author_pic_url, thumb_url} = data[i]
        $(SecondCarousel).prepend(function(){
            let active = i === 0 ? "active" : ""
            return carouselVideoItem(title, data[i].sub-title, author, star, active, author_pic_url, thumb_url)
        });
    }

    joinCards("videoCarousel");
    }


/* CAROUSEL ITEMS IMPLEMENTATIONS */


});


  


