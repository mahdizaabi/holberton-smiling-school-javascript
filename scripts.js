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
    function fetchPosts(){
        $.get('https://smileschool-api.hbtn.info/quotes', $("#smileschoolcarousel").hide()).done(data => {
            $(".loader").hide()
            $("#smileschoolcarousel").show()    
        displayCarousels(data)})
      }

      fetchPosts()

      $('#recipeCarousel').carousel({
        interval: 10000
      })
      
      $('.videocarousel .carousel-item').each(function(){
          var minPerSlide = 3;
          var next = $(this).next();
          if (!next.length) {
          next = $(this).siblings(':first');
          }
          next.children(':first-child').clone().appendTo($(this));
          
          for (var i=0;i<minPerSlide;i++) {
              next=next.next();
              if (!next.length) {
                  next = $(this).siblings(':first');
                }
              
              next.children(':first-child').clone().appendTo($(this));
            }
      });
      
      
      
});

     
    


