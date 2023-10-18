
let intro =document.querySelector(".intro");
let logo = document.querySelector(".project-title");
let logoSpan = document.querySelectorAll(".title-1");
let subHeader = document.querySelectorAll(".sub");

let imgBox = document.querySelectorAll('.intro-image-box')

window.addEventListener("DOMContentLoaded",()=>{
   setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            },(idx + 1) * 400)
        });

        subHeader.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            },(idx +1) * 500)
        });

        imgBox.forEach((div,idx)=>{
            setTimeout(()=>{
                div.classList.add('active');
            },(idx + 1) * 400)
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                },(idx +1) * 50)
            });
            
            subHeader.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                },(idx +1) * 50)
            });

            imgBox.forEach((div, idx)=>{
                setTimeout(()=>{
                    div.classList.remove('active');
                    div.classList.add('fade');
                })
            })

        },2000);

        setTimeout(()=>{
            intro.style.top ='-100vh';
        },2300)
   })
})