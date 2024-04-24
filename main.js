document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('#header-menu nav ul li a');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('#header-menu nav');
    const Links = document.querySelector('.nav-links');
    const rows = document.querySelectorAll('.year-row');
    const paragraphs = document.querySelectorAll('section:first-child p');

    // Funkce pro zpracování skrolování
    window.addEventListener('scroll', function() {
        if (window.scrollY === 0) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }

        updateActiveLink();
    });

    // Funkce pro aktualizaci aktivního odkazu
    function updateActiveLink() {
        let fromTop = window.scrollY;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);

            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Nastavení kliknutí na navigační odkazy
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let targetId = this.getAttribute('href').substring(1);
            let targetSection = document.getElementById(targetId);
            let targetOffsetTop = targetSection.offsetTop;

            window.scrollTo({
                top: targetOffsetTop,
                behavior: 'smooth'
            });

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Nastavení kliknutí na hamburger menu
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('change');
        navMenu.classList.toggle('active');
        Links.classList.toggle('active');
    });

    // Nastavení kliknutí na řádky s roky
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const description = row.querySelector('.description');
            description.classList.toggle('show-description');
        });
    });

    // Funkce pro kontrolu počtu řádků v odstavcích
    function checkParagraphLines() {
        paragraphs.forEach(paragraph => {
            const range = document.createRange();
            range.selectNodeContents(paragraph);

            const rects = range.getClientRects();

            const firstChild = paragraph.firstChild;
            
            const beforeNode = document.createTextNode('OO');
            const afterNode = document.createTextNode('OO');

            paragraph.insertBefore(beforeNode, firstChild);
            paragraph.appendChild(afterNode);

            range.setStartBefore(beforeNode);
            range.setEndAfter(afterNode);

            const newRects = range.getClientRects();

            const combinedRects = [...rects, ...newRects];

            const uniqueYValues = new Set([...combinedRects].map(rect => rect.top));
            const numberOfLines = uniqueYValues.size;

            paragraph.removeChild(beforeNode);
            paragraph.removeChild(afterNode);

            if (numberOfLines > 1) {
                paragraph.classList.add('multiline');
            } else {
                paragraph.classList.remove('multiline');
            }
        });
    }

    // Aktualizace počtu řádků při změně velikosti okna
    window.addEventListener('resize', checkParagraphLines);
});
