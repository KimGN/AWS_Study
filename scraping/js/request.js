function newsScraping(){
    const $news_list = $("#newList");

    const newsSwiper = new Swiper(".news_wrap", {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });

    const url = "https://tcol27bj2h.execute-api.ap-northeast-2.amazonaws.com/default/hello"
    const config = {
        method: "get"
    }
    fetch(url, config)
        .then(response => response.json())
        .then(data => {
            // 로딩중 아이콘 넣기 높이갚 조절 해야함
            // CROS node? api gateway ?
            // scss 컴파일 스타일 조절
            const data_length = data.length;
            for(let i = 0 ; i < data_length ; i++){
                newsSwiper.appendSlide(
                    '<div class="swiper-slide">' +
                        '<a href=' + data[i].url + ' target="_blank">' +
                            '<span class="date-txt">' + data[i].date + '</span>' +
                            '<strong class="news-tit">'+ data[i].title +'</strong>' +
                            '<div class="thum_img">' +
                                '<img src='+data[i].image_url+' alt=' + data[i].image_alt +'>' +
                            '</div>' +
                            '<p class="news-summ">'+ data[i].summary +'</p>' +
                        '</a>' +
                    '</div>'
                )
            }
        })
        .then( () =>{
            $(".loding_dimm").fadeOut(500);
            console.log("success");

        })
        .catch(error => console.log(error));

}
newsScraping();


