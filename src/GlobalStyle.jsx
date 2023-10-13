import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}


html {
  font-size: 62.5%;
  /* scroll-behavior: smooth; */
  /* 1rem = 10px */
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
   scrollbar-color: rgb(98 84 243);
    scrollbar-width: thin;
}

body::-webkit-scrollbar {
  width: 1.5rem;
}

body::-webkit-scrollbar-track {
   background-color: rgb(24 24 29);
}

body::-webkit-scrollbar-thumb {
 
  background: #fff;
    border: 5px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
}

h1,
h2,
h3,
h4 {
   font-family: "Work Sans", sans-serif;

}


h1 {
  color: ${({ theme }) => theme.colors.heading};
  font-size: 6rem;
  font-weight: 900;
}

 h2 {
   color: ${({ theme }) => theme.colors.heading};
   font-size: 4.4rem;
   font-weight: 300;
   white-space: normal;
  
  }

h3 {
  font-size: 1.8rem;
  font-weight: 400;
}

p, button {
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.65rem;
  line-height: 1.5;
  font-weight:400;
}

button{
  text-decoration: none;
  max-width: auto;
  background-color: rgb(98 84 243);
  color: rgb(255 255 255);
  padding: 1.4rem 2.4rem;
  border: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover,
  &:active {
    box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
  }
}


a {
  text-decoration: none;
}

li {
  list-style: none;
}


${"" /* resuable code section  */}

.container {
  max-width: 120rem;
  margin: 0 auto;
}

.grid {
  display: grid;
  gap: 9rem;
}

.grid-two-column {
  grid-template-columns: repeat(2, 1fr);
}

.grid-three-column {
  grid-template-columns: repeat(3, 1fr);
}

.grid-four-column{
   grid-template-columns: 1fr 1.2fr .5fr .8fr ;
}

.grid-five-column{
  grid-template-columns: repeat(5, 1fr);
}

  .common-heading {
      font-size: 3.8rem;
      font-weight: 600;
      margin-bottom: 6rem;
      text-transform: capitalize;
    }

     .intro-data {
      margin-bottom: 0;
      text-transform: uppercase;
      color: #5138ee;
    }

   .caption {
      position: absolute;
      top: 15%;
      right: 10%;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.2rem;
      border-radius: 2rem;
    }

input, textarea{
    max-width: 50rem;
    color: ${({ theme }) => theme.colors.black};
    padding: 1.6rem 2.4rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-transform: uppercase;
   box-shadow: ${({ theme }) => theme.colors.shadowSupport};
}
    input[type="submit"]{
    max-width: 16rem;
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.white};
    padding: 1.4rem 2.2rem;
    border-style: solid;
    border-width: .1rem;
    text-transform: uppercase;
    font-size: 1.8rem;
    cursor: pointer;
    }

  .row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -15px;
  }
  .md-8 {
    flex: 0 0 67%;
    max-width: 67%;
    padding: 0 15px;
}
.md-4 {
  flex: 0 0 33%;
  max-width: 33%;
  padding: 0 15px;
}
.md-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;
}
.md-12 {
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 15px;
}
.form-group {
  margin-bottom: 20px;
}
.form-control {
  max-width: 100%;
  width: 100%;
}

body{
  background: ${({ theme }) => theme.colors.white};
  color: #000;
}
input, select, textarea{
  background: ${({ theme }) => theme.colors.white};
}

.single_review {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  margin-bottom: 30px;
}
.review_per {
  display: flex;
  margin-bottom: 15px;
  gap: 10px;
}

.review_per .progress {
  flex-grow: 1;
  background: #e5e5e5;
}

.progress_per {
  background: orange;
  display: block;
  height: 100%;
}

#modal .wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0003;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_content {
  background: #fff;
  padding: 30px;
  max-width: 500px;
  position: relative;
}

.modal_header {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 10px;
  cursor: pointer;
}
.star_icon svg {
  font-size: 21px;
  color: orange;
  margin-right: 5px;
}
.star_icon input{
  position: absolute;
  opacity: 0;
}
.star_icon label{
  position: relative;
}
.star_icon {
  margin-top: 10px;
  display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
}
label{
  display: block;
  margin-bottom: 15px;
  font-size: 16px;
}
input, textarea{
  max-width:100%;
  width:100%
}
.spinner {
  animation: spin 1s ease-in-out infinite;
  margin-right: 5px;
  font-size: 18px;
  position: relative;
  top: 3px
}

@keyframes spin {
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
}
.error {
  color: #df1818;
  background: #ffbbbb;
  padding: 5px 20px;
  text-align: center;
  margin-bottom: 15px;
}

.delete{
  color: #df1818;
}
.actions{
  display: flex;
  gap:20px;
}
.actions *{
  cursor: pointer;
}
@media (max-width: ${({ theme }) => theme.media.tab}) {
    .container {
    max-width: 130rem;
    padding: 0 3.2rem;
  }
  }

   @media (max-width: ${({ theme }) => theme.media.mobile}) {
       html {
      font-size: 50%;
    }

.grid{
  gap: 3.2rem;
}
      .grid-two-column , .grid-three-column, .grid-four-column{
          grid-template-columns: 1fr;
        }
    }

`;
