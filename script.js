/*Menu*/

const menuElement = document.querySelector('.menu');
const burgerButtonElement = document.querySelector('.burger');

burgerButtonElement.addEventListener('click', () => {
  menuElement.classList.toggle('menu--open');
});

/*Slider*/

const sliderElement = document.querySelector('.slider');
const slideElements = document.querySelectorAll('.slider__item');
const buttonPrevElement = document.querySelector('.slider__btn--prev');
const buttonNextElement = document.querySelector('.slider__btn--next');

let counter = 0;
const maxStep = slideElements.length - 1;
slideElements[counter].classList.add('slider__item--current');

const isFirst = (counter) => {
  if (counter === 0) {
    buttonPrevElement.setAttribute('disabled', true);
  } else {
    buttonPrevElement.removeAttribute('disabled');
  }
};

const isLast = (counter) => {
  if (counter === maxStep) {
    buttonNextElement.setAttribute('disabled', true);
  } else {
    buttonNextElement.removeAttribute('disabled');
  }
};

const handleButtonNextClick = () => {
  slideElements[counter].classList.remove('slider__item--current');
  slideElements[counter].setAttribute('style', 'transform: translateX(0)');

  counter++;

  isFirst(counter);
  isLast(counter);

  slideElements[counter].classList.add('slider__item--current');
};

const handleButtonPrevClick = () => {
  slideElements[counter].classList.remove('slider__item--current');

  counter--;

  isFirst(counter);
  isLast(counter);
  
  slideElements[counter].classList.add('slider__item--current');
  slideElements[counter].removeAttribute('style');
}

buttonNextElement.addEventListener('click', handleButtonNextClick);
buttonPrevElement.addEventListener('click', handleButtonPrevClick);

/*Modal*/

const modalElement = document.querySelector('.modal');
const modalWindowElement = document.querySelector('.modal__wrap');

const buttonCloseModalElement = document.querySelector('.modal__close-btn');
const buttonOpenModalElement = document.querySelector('.slider__modal-btn');

const animateIn = () => {
  modalWindowElement.removeEventListener('animationend', animateIn);
  modalWindowElement.classList.remove('modal-in');
}

const handleButtonOpenModalClick = () => {
  modalWindowElement.addEventListener('animationend', animateIn);
  modalElement.classList.add('modal--open');
  modalWindowElement.classList.add('modal-in');
};

const animationOut = () => {
  modalWindowElement.removeEventListener('animationend', animationOut);
  modalElement.classList.remove('modal--open');
  modalWindowElement.classList.remove('modal-out');
}

const handleButtonCloseModalClick = () => {
  modalWindowElement.addEventListener('animationend', animationOut);
  modalWindowElement.classList.add('modal-out');
}

buttonOpenModalElement.addEventListener('click', handleButtonOpenModalClick);
buttonCloseModalElement.addEventListener('click', handleButtonCloseModalClick);

/*Progress*/

const progressBarElement = document.querySelector('.progress-bar__value');
const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener('scroll', () => {
  const windowScroll = window.pageYOffset;
  const progressBarWidth = (windowScroll / windowHeight).toFixed(2);
  progressBarElement.setAttribute('style', `transform: scaleX(${progressBarWidth});`);
});

/*Fixed header and backscrolled header*/

const headerElement = document.querySelector('.header');
const scrolledHeaderStart = 400;
const backscrolledHeaderElement = document.querySelector('.header__backscrolled');

let scrollStarted = 0;

const handleHeaderScroll = () => {
  const scrollTop = window.pageYOffset;
  const delta = scrollTop - scrollStarted;
  if (scrollTop >= scrolledHeaderStart) {
    headerElement.classList.add('header--fixed');
    document.body.style.paddingTop = `${headerElement.offsetHeight}px`;
  } else {
    headerElement.classList.remove('header--fixed');
    document.body.style.paddinTop = `0px`;
  }

  if ((delta < 0) && (scrollTop >= scrolledHeaderStart)) {
    backscrolledHeaderElement.classList.add('header__backscrolled--show');
  } else {
    backscrolledHeaderElement.classList.remove('header__backscrolled--show');
  }

  scrollStarted = scrollTop;
};

window.addEventListener('scroll', handleHeaderScroll);

/*Elements*/

const blocks = document.querySelectorAll('.content__block');
const screenHeight = document.documentElement.clientHeight;

const isHalfVisible = (element) => {
  const elementBoundary = element.getBoundingClientRect();
  const bottom = elementBoundary.bottom;
  const height = elementBoundary.height;
  
  return (height / 2 + screenHeight) > bottom;
}

const handleBlocksScroll = () => {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (isHalfVisible(block)) {
      block.classList.add('content__block--active');
    }
  }
};

window.addEventListener('scroll', handleBlocksScroll);

/*Horizontal scroll*/

const reviewsElement = document.querySelector('.reviews');
const listElement = reviewsElement.querySelector('.reviews__list');

const reviewsElementWidth = reviewsElement.clientWidth;
const listElementWidth = listElement.scrollWidth;

let distance = 0;
const step = 50;

const maxDistance = listElementWidth - reviewsElementWidth + step;

const handleReviewsWheel = (evt) => {
  evt.preventDefault();

  if (distance <= 0 && evt.deltaY > 0 && listElementWidth + distance > reviewsElementWidth - step * 2) {
    distance -= step;
  } else if (distance < 0) {
    distance += step;
  }

  listElement.setAttribute('style', `transform: translateX(${distance}px);`);
};

reviewsElement.addEventListener('wheel', handleReviewsWheel);

/*Tabs*/

const tabLinkElements = document.querySelectorAll('.tabs__link');
const tabContentElements = document.querySelectorAll('.tab-content__item');

const openTabs = (evt) => {
  const buttonTarget = evt.currentTarget;
  const work = buttonTarget.dataset.work;

  tabLinkElements.forEach((tablinkElement) => {
    tablinkElement.classList.remove('tabs__link--active');
  });

  tabContentElements.forEach((tabContentElement) => {
    tabContentElement.classList.remove('tab-content__item--active');
  });

  buttonTarget.classList.add('tabs__link--active');
  document.querySelector(`#${work}`).classList.add('tab-content__item--active');
};

tabLinkElements.forEach((tabLinkElement) => tabLinkElement.addEventListener('click', openTabs));

/*Accordeon*/

const faqQuestionElements = document.querySelectorAll('.faq__question');

faqQuestionElements.forEach.call(faqQuestionElements, (faqQuestionElement) => {
  faqQuestionElement.addEventListener('click', () => {
    const checkedElement = faqQuestionElement.parentElement;
    const checkedAnswer = checkedElement.querySelector('.faq__answer');
    checkedElement.classList.toggle('faq__item--open');

    if (checkedElement.classList.contains('faq__item--open')) {
      checkedAnswer.style.maxHeight = `${checkedAnswer.scrollHeight}px`;
    } else {
      checkedAnswer.style.maxHeight = null;
    }
  });
});