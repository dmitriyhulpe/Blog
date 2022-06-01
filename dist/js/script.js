const body = document.body;

let typeWrite = function(item, toRotate, period) {
    this.toRotate = toRotate;
    this.item = item;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

typeWrite.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullText = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullText.substring(0, this.txt.length + 1);
    }

    this.item.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullText) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    let elements = document.querySelectorAll('.typewrite');

    elements.forEach(function(item) {
        let toRotate = item.getAttribute('data-rotate');
        let period = item.getAttribute('data-period');

        if (toRotate) {
            new typeWrite(item, JSON.parse(toRotate), period);
        }
    });
};

const header = document.getElementById('header');

header.addEventListener('mousemove', parallax);
function parallax(event) {
	this.querySelectorAll('.layer').forEach(function(layer) {
		const speed = layer.getAttribute('data-temp');
		const x = (window.innerWidth - event.pageX * speed) / 100;
		const y = (window.innerHeight - event.pageY * speed) / 100;

		layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
	});
}

const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');

burger.addEventListener('click', function() {
	this.classList.toggle('active');
	sidebar.classList.toggle('active');
	body.classList.toggle('lock');
});

function linkDisable() {
	burger.classList.remove('active');
	sidebar.classList.remove('active');
	body.classList.remove('lock');
}

const link = document.querySelectorAll('header nav a');

link.forEach(function(item) {
	item.addEventListener('click', linkDisable);
});
const overlay = document.querySelectorAll('.overlay');
const overlayActive = document.querySelectorAll('[data-modal]');
const overlayClose = document.querySelectorAll('.close');

overlayActive.forEach(function(item) {
	item.addEventListener('click', function(event) {
		let overlayIdentifier = event.target.getAttribute('data-modal');
		let overlay = document.getElementById(overlayIdentifier);

		let modal = overlay.querySelector('.modal');
		modal.addEventListener('click', function(event) {
			event.stopPropagation();
		});

		overlay.classList.add('show');
		body.classList.add('lock');
	});
});

overlayClose.forEach(function(item) {
	item.addEventListener('click', function(event) {
		let current = event.target.closest('.overlay');

		overlayDisable(current);
	});
});

overlay.forEach(function(item) {
	item.addEventListener('click', function(event) {
		let current = event.target;

		overlayDisable(current);
	});
});

function overlayDisable(item) {
	item.classList.remove('show');
	body.classList.remove('lock');
}

const button = document.querySelectorAll('.button');

button.forEach(function(index) {
	index.addEventListener('click', function(event) {
		
		let x = event.clientX - event.target.offsetLeft;
		let y = event.clientY - event.target.offsetTop;

		let ripples = document.createElement('span');
		ripples.style.left = x + 'px';
		ripples.style.top = y + 'px';
		this.appendChild(ripples);

		setTimeout(function() {
			ripples.remove()
		}, 1000);
	});
});