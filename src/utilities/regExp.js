// 한글 영어만
const regexKeyword = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;

//Img_url
const regexImg = /^[A-Z]+-+[0-9]+$/;

// 숫자만
const regexCode = /^[0-9]+$/;

export { regexKeyword, regexCode, regexImg };
