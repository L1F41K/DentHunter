document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.header')
	const triggerOffset = 50

	function updateHeader() {
		if (window.pageYOffset > triggerOffset) {
			header.classList.add('scrolled')
		} else {
			header.classList.remove('scrolled')
		}
	}

	// Проверка при загрузке и скролле
	updateHeader()
	window.addEventListener('scroll', updateHeader)
})

// Плавный скролл для всех ссылок с href="#..."
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()

		const targetId = this.getAttribute('href')
		const targetElement = document.querySelector(targetId)

		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	})
})

document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.service-btn')
	const images = document.querySelectorAll('.service-image')

	buttons.forEach(button => {
		button.addEventListener('click', function () {
			const tabId = this.getAttribute('data-tab')

			// Убираем активный класс у всех кнопок и изображений
			buttons.forEach(btn => btn.classList.remove('active'))
			images.forEach(img => img.classList.remove('active'))

			// Добавляем активный класс текущей кнопке и соответствующему изображению
			this.classList.add('active')
			document.getElementById(tabId).classList.add('active')
		})
	})
})

document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.menu-burger')
	const mobileMenu = document.querySelector('.mobile-menu')

	burger?.addEventListener('click', e => {
		e.stopPropagation()
		const isOpen = burger.getAttribute('aria-expanded') === 'true'
		burger.setAttribute('aria-expanded', !isOpen)
		mobileMenu.classList.toggle('open')
		document.body.style.overflow = isOpen ? '' : 'hidden'
	})

	document.addEventListener('click', () => {
		if (mobileMenu.classList.contains('open')) {
			burger.setAttribute('aria-expanded', 'false')
			mobileMenu.classList.remove('open')
			document.body.style.overflow = ''
		}
	})

	mobileMenu?.addEventListener('click', e => e.stopPropagation())

	// Scrolled эффект (если у тебя его не было — добавь)
	window.addEventListener('scroll', () => {
		document
			.querySelector('.header')
			?.classList.toggle('scrolled', window.scrollY > 50)
	})
})

document.querySelectorAll('.faq-question').forEach(button => {
	button.addEventListener('click', () => {
		const faqItem = button.parentElement
		const answer = faqItem.querySelector('.faq-answer')
		const isActive = faqItem.classList.contains('active')

		// Находим текущий открытый элемент
		const currentlyActive = document.querySelector('.faq-item.active')

		if (isActive) {
			// === КЛИК ПО УЖЕ ОТКРЫТОМУ → ЗАКРЫВАЕМ ПЛАВНО ===
			closeItem(faqItem, button)
		} else {
			// === ОТКРЫВАЕМ НОВЫЙ ===
			if (currentlyActive && currentlyActive !== faqItem) {
				// Сначала плавно закрываем старый
				closeItem(
					currentlyActive,
					currentlyActive.querySelector('.faq-question')
				).then(() => {
					// Только после закрытия — открываем новый
					openItem(faqItem, button)
				})
			} else {
				// Если ничего не открыто — сразу открываем
				openItem(faqItem, button)
			}
		}
	})
})

// === ФУНКЦИЯ ПЛАВНОГО ЗАКРЫТИЯ ===
function closeItem(item, button) {
	return new Promise(resolve => {
		item.classList.remove('active')
		button.setAttribute('aria-expanded', 'false')

		const answer = item.querySelector('.faq-answer')
		const currentHeight = answer.scrollHeight

		// Устанавливаем текущую высоту → плавно к 0
		answer.style.height = currentHeight + 'px'
		void answer.offsetHeight // reflow
		answer.style.height = '0px'

		// После анимации — убираем высоту
		answer.addEventListener(
			'transitionend',
			function onEnd() {
				answer.style.height = ''
				answer.removeEventListener('transitionend', onEnd)
				resolve()
			},
			{ once: true }
		)
	})
}

// === ФУНКЦИЯ ПЛАВНОГО ОТКРЫТИЯ ===
function openItem(item, button) {
	item.classList.add('active')
	button.setAttribute('aria-expanded', 'true')

	const answer = item.querySelector('.faq-answer')
	answer.style.height = '0px'

	// Получаем целевую высоту
	const targetHeight = answer.scrollHeight + 'px'

	void answer.offsetHeight // reflow
	answer.style.height = targetHeight

	// После открытия → height: auto
	answer.addEventListener(
		'transitionend',
		function onEnd() {
			if (item.classList.contains('active')) {
				answer.style.height = 'auto'
			}
			answer.removeEventListener('transitionend', onEnd)
		},
		{ once: true }
	)
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.slides-container')
	const slides = document.querySelectorAll('.slide')
	const prevBtn = document.querySelector('.prev')
	const nextBtn = document.querySelector('.next')

	let current = 0
	const total = slides.length

	// Проверка: если нет слайдов — выходим
	if (total === 0) return

	function goTo(index) {
		current = index
		container.style.transform = `translateX(-${current * 100}%)`
	}

	function next() {
		current = (current + 1) % total
		goTo(current)
	}

	function prev() {
		current = (current - 1 + total) % total
		goTo(current)
	}

	// Стрелки
	nextBtn.addEventListener('click', next)
	prevBtn.addEventListener('click', prev)

	// Свайп на мобильных
	let startX = 0
	container.addEventListener(
		'touchstart',
		e => {
			startX = e.touches[0].clientX
		},
		{ passive: true }
	)

	container.addEventListener(
		'touchend',
		e => {
			if (!startX) return
			const endX = e.changedTouches[0].clientX
			const diff = startX - endX

			if (Math.abs(diff) > 50) {
				if (diff > 0) next()
				else prev()
			}
			startX = 0
		},
		{ passive: true }
	)

	// Инициализация
	goTo(0)
})
document.addEventListener('DOMContentLoaded', function () {
	const accordionHeaders = document.querySelectorAll('.accordion-header')

	accordionHeaders.forEach(header => {
		header.addEventListener('click', function () {
			const accordionItem = this.parentElement
			accordionItem.classList.toggle('active')
		})
	})
})
// Открытие модалки
document.querySelectorAll('.button').forEach(btn => {
	btn.addEventListener('click', function (e) {
		e.preventDefault()
		document.getElementById('contactModal').style.display = 'flex'
	})
})

// Закрытие
document.querySelector('.modal-close').addEventListener('click', () => {
	document.getElementById('contactModal').style.display = 'none'
})

// Закрытие по клику вне формы
window.addEventListener('click', e => {
	const modal = document.getElementById('contactModal')
	if (e.target === modal) {
		modal.style.display = 'none'
	}
})

// Отправка формы (пример с alert)
document.getElementById('contactForm').addEventListener('submit', function (e) {
	e.preventDefault()
	alert('Заявка отправлена! Скоро перезвоним.')
	document.getElementById('contactModal').style.display = 'none'
	this.reset()
})
// Инициализация маски
const phoneInput = document.getElementById('phone')
const phoneMask = IMask(phoneInput, {
	mask: '+{7} (000) 000-00-00',
	lazy: false, // всегда показывать маску
	placeholderChar: '_',
})

// Валидация при отправке
document.getElementById('contactForm').addEventListener('submit', function (e) {
	e.preventDefault()

	if (!phoneMask.unmaskedValue || phoneMask.unmaskedValue.length !== 11) {
		alert('Введите полный номер телефона')
		return
	}

	alert('Заявка отправлена!\nНомер: ' + phoneMask.value)
	document.getElementById('contactModal').style.display = 'none'
	this.reset()
	phoneMask.updateValue() // сброс маски
})
