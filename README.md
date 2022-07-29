# 

## style-loader, MiniCssExtractPlugin.loader, css-loader, post-css
style-loader는 HTML 문서의 style태그로 css적용, MiniCssExtractPlugin은 청크별 css파일로 번들링.
   
css-loader는 import 'global.css' 처럼 css를 하나의 모듈로서 취급하기위해 사용
실제로 css-loader없이 css를 import하고 빌드하면 에러가 발생한다.
  
https://velog.io/@jay/css-loader-config  
https://fourwingsy.medium.com/postcss-%EC%86%8C%EA%B0%9C-727310aa6505

## ts-loader
ts-loader를 이용하면 아래 명시된 바벨 프로젝트들이 필요없어지는게 아닌가 하는 의문이 듬  
실제로 제거했을때 정상적으로 돌아감
.babelrc파일을 삭제했을때도 문제없음  
```
npm uninstall @babel/cli @babel/core @babel/preset-env @babel/preset-react babel-loader
```

## swr 적용

---


# 사용 패키지  

## AutoPrefixer: PostCSS 플러그인, 자동으로 벤더 prefix를 채워주는 기능  
처리전  
```
::placeholder {
  color: gray;
}
```
  
처리후  
```
::-moz-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}
```

##


---

# 🚀 trouble

## .tsx에서 JSX 구문에 에러 표시
```
'--jsx' 플래그를 제공하지 않으면 JSX를 사용할 수 없습니다.ts(17004)
```
## png파일 import를 해석하지 못하는 케이스
```
TS2792: Cannot find module './images/screenshot.png'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?
```
아래 구문을
```json
{
  "files": ["src/index.tsx"]
}
```
아래로 바꾸니까 해결됨
```json
{
    "include": [
        "src"
    ]
}
```
## css 파일을 해석하지 못하는 문제

PostCss가 의존하는 autoprefixer 설치로 해결

## swr 설치후 module not found 에러 

tsconfig.json에 "moduleResolution": "node" 추가로 해결

---

# 참고
https://velog.io/@_uchanlee/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9B%B9%ED%8C%A9%EC%9C%BC%EB%A1%9C-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0without-CRA
