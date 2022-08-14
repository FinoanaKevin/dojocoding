(function(){
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const lien = document.querySelectorAll('.nav-links li');
        
        burger.addEventListener('click',() => {
            nav.classList.toggle('nav-active');
            lien.forEach((link,index) => {
                if (link.style.animation){
                    link.style.animation = ''
                }else{
                    link.style.animation = `navFade 0.7s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
    }
    navSlide();
    const ratio = 0.6 
    const spies = document.querySelectorAll('[data-spy]')
    let observeur = null
    const activate = function (elem){
        const id = elem.getAttribute('id')
        const anchor = document.querySelector(`a[href="#${id}"]`)
        if (anchor === null){
            return null
        }
        anchor.parentElement.parentElement
            .querySelectorAll('li .active')
            .forEach(node => node.classList.remove('active'))
        anchor.classList.add('active');
    }

    const callback = function (entries){
        entries.forEach(function(entry){
            if (entry.intersectionRatio > 0){
                activate(entry.target)
            }
        })
    }

    const debounce = function(callback, delay){
        let timer
        return function(){
            let args = arguments
            let context = this 
            clearTimeout(timer)
            timer = setTimeout(function(){
                callback.apply(context, args)
            },delay)
        }
    }

    const scrollSpy = function (elems){
        if (observeur !== null){
            elems.forEach(elem => observeur.unobserve(elem))
        }
        const y = Math.round(window.innerHeight * ratio)
        observeur = new IntersectionObserver(callback, {
            rootMargin: `-${window.innerHeight - y -1}px 0px -${y}px 0px`
        })
        spies.forEach(elem => observeur.observe(elem))
    }

    if (spies.length > 0){
        scrollSpy(spies)
        let windowH = window.innerHeight
        window.addEventListener('resize' ,debounce(function (){
            if(window.innerHeight !== windowH){
                scrollSpy(spies)
                windowH = window.innerHeight
            }
        },500))
    }
})()



const Ratio = 0.1
const options = {
    root:null,
    rootMargin:"0px",
    thershold: Ratio
}
const handleIntersect = function (entries, observer){
    entries.forEach(function(entry){
        if(entry.intersectionRatio > Ratio){
            entry.target.classList.remove('reveal')
            observer.unobserve(entry.target)
        }
    })
}
document.documentElement.classList.add('reveal-loaded')
window.addEventListener('DOMContentLoaded', function (){
    const observer = new IntersectionObserver(handleIntersect, options);
     document.querySelectorAll('.reveal').forEach(function(r){
        observer.observe(r)
    })
})
