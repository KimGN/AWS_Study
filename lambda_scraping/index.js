const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

async function getHtml(){
    try {
        return await axios.get("https://www.yna.co.kr/theme/hotnews-history?site=hot_news_btn_more");
    } catch (error){
        console.error(error);
    }
}


getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data)
        const $bodyList = $("section.box-hotnews-list01 > div.style01 > ul.list > li");

        $bodyList.each(function(i, elem) {
            ulList[i] = {
                date: $(this).find('div span.txt-time').text(),
                url: "https:" + $(this).find('.news-con a').attr('href'),
                title: $(this).find(".news-con a strong.tit-news").text(),
                image_url: "https:" + $(this).find('.img-con a img').attr('src'),
                image_alt: $(this).find('.img-con a img').attr('alt'),
                summary: $(this).find('.news-con p').text(),
                KGN : "Aaa"
            };
        });
        console.log(ulList);
        // 동작 원리
        // title 이 있는 요소만 다시 넣는다.
        const data = ulList.filter(n => n.title);
        const data2 = ulList.filter(n => n.KGN);
        console.log("@@@@@@@AAAAAaa44444444$$$$$$$$$$$");
        console.log(data2);
        return data;
    })
    // .then(res => log(res));






