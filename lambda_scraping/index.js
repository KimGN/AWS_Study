/*
    axios 모듈로 html 파일 긁어오기 - http 통신 
    cheerio 모듈로 필요한 부분 정리해서 배열에 담기 - jquery 문법 사용 가눙
    lambda 에 node 모듈 블러올려면 로컬에서 zip 파일로 압축해서 올려야함
    로컬 환경에서 테스트 하고 올리는걸 권장
*/

const axios = require("axios");
const cheerio = require("cheerio");
let url = "https://www.yna.co.kr/theme/hotnews-history?site=hot_news_btn_more";
exports.handler = async (event) => {
    // axios
    const htmlGet = await axios.get(url);
    const scrapimgData = [];
    // cheerio
    const $ = cheerio.load(htmlGet.data);
    const $newsBlockList = $("section.box-hotnews-list01 > div.style01 > ul.list > li");

    $newsBlockList.each(function (index, item){
        scrapimgData[index] = {
            date: $(this).find('div span.txt-time').text(),
            url: "https:" + $(this).find('.news-con a').attr('href'),
            title: $(this).find(".news-con a strong.tit-news").text(),
            image_url: "https:" + $(this).find('.img-con a img').attr('src'),
            image_alt: $(this).find('.img-con a img').attr('alt'),
            summary: $(this).find('.news-con p').text()
        }
    });
    // title chk
    const data =  scrapimgData.filter(n => n.title);
    // haeder 
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type:utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(data)
    };
    return response;
};