$(function () {
	/*
	1. В черхней черной полосе в шапке на любой странице проекта (ориентируемся на index) есть блок с текстом "Ваш город: Москва". Прикрепляем к нему обработчик кликов.
	2. Обработчик поднимает попап (или вызывает confirm) с вопросом "Ваш город - Москва?".
	3. Варианты ответа - true, false. В попапе их присылают обработчики на кнопках попапа, сам попап при этом закрывается. В конфирме их возвращает конфирм.
	4. При ответе false в блоке пишем "Ваш город: Немосква".
	5. При ответе true ничего больше не делаем.
	*/
	/*
	// берем элемент с нужным id поиском по документу, навешиваем на него слушатель события "клик"
	document.getElementById('yourcity').addEventListener('click', function(){
		// делаем видимым блок - держатель попапа (при помощи класса active, свойства для которого у нас уже заранее прописаны). при этом мы получаем готовый скринер, уже обрабатывающий клик мимо попапа.
		document.querySelector('.popup-desk').classList.add('active');
		// кладем в держатель попапа наш попап. при этом используем заранее прописанные стили.
		document.querySelector('.popup-desk').innerHTML = '<div class="popup gorod"><p>Ваш город - Москва?</p><button type="button">ДА</button><button type="button">НЕТ</button></div>';
		// выбираем кнопки (в виде массива) и вешаем на них обработчик событий
		document.querySelectorAll('.gorod button').forEach(item => item.addEventListener('click', clickGorod));
		// выносим функцию-обработчик в отдельную функцию, чтобы было удобнее ее навешивать и код лучше читался
		function clickGorod(event) {
			if (event.target.innerHTML == 'НЕТ') {
				document.getElementById('yourcity').innerHTML = '<p>Ваш город: Немосква</p>';
			} else {
				document.getElementById('yourcity').innerHTML = '<p>Ваш город: Москва</p>';
			}
			document.querySelector('.popup-desk').dispatchEvent(new Event("click"));
		}
	});
	*/
	$('#yourcity').click(function () {
		$('.popup-desk').addClass('active').html('<div class="popup gorod"><p>Ваш город - Москва?</p><button class="yes" type="button">ДА</button><button class="no"  type="button">НЕТ</button></div>');
		$('.gorod button').click(function () {
			// if $('.gorod button').index(this) == 1
			// if $(this).html() == 'НЕТ'
			if ($(this).hasClass('no')) {
				$('#yourcity').html('<p>Ваш город: Немосква</p>');
			} else {
				$('#yourcity').html('<p>Ваш город: Москва</p>');
			}
			$('.popup-desk').click();
		})
	});


	/*
	document.getElementById('yourcity').addEventListener('click', function(){
		(confirm('Ваш город - Москва?')) ? (document.getElementById('yourcity').innerHTML = '<p>Ваш город: Москва</p>') : (document.getElementById('yourcity').innerHTML = '<p>Ваш город: Немосква</p>');
	});
	*/




	$('.submenu_mover').click(function () {
		if ($(this).parent().hasClass('open')) {
			$('.catmenu_item.open').removeClass('open').find('.submenu').animate({
				height: 0
			}, 1000);
		} else {
			$('.catmenu_item.open').removeClass('open').find('.submenu').animate({
				height: 0
			}, 1000);
			$(this).parent().addClass('open').find('.submenu').animate({
				height: ($(this).parent().find('.submenu a').length * $('.submenu a').height())
			}, 1000);
		}
	});

	$('.basket').click(function () {
		$('.popup-desk').addClass('active');
		$('.popup-desk').html('<div class="popup log"></div>');
		$('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
	});

	$('.popup-desk').click(function (e) {
		if (e.target == this) {
			$(this).removeClass('active');
			$('.popup-desk').empty();
		}
	});

	$(document).on('click', '.register', function (e) {
		e.preventDefault();
		if ($('.popup').hasClass('log')) {
			$('.popup').html('<p class="popup-header">Личный кабинет закрыт на ремонт.<br>Регистрации не будет до 1 января.</p><a href="https://yandex.ru/" class="register">Войти</a>');
			$('.popup').removeClass('log');
		} else {
			$('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
			$('.popup').addClass('log');
		}
	});

	$(document).on('click', '.order .del > div', function () {
		tovarDelete(this);
	});

	$(document).on('input', '.order .num > input', function () {
		tovarChange(this);
	});

	if ($('#date').length) {
		$('#date').click(function () {
			if ($('#date').val()) {
				selected_day = makeSelectedDate($('#date').val());
				makePopup(selected_day.getFullYear(), selected_day.getMonth());
			} else {
				makePopup(TODAY.getFullYear(), TODAY.getMonth());
			}
		});

		$('#date').mask('00-00-0000');
	}


	$('#orderdata').on('submit', function (e) {// отправка формы
		e.preventDefault();
		orderAction();
	})

	if ($('.product').length) {
		$('.main-image').on('click', 'img', seebigimage);
		$('.small-image').on('click', 'img', changeimage);
	}

	/* if ($('.small-image > img').length) {
		$('.small-image > img').each(function () {
			$(this).css({
				'margin-top': (160 - $(this).height()) / 2,
				'margin-left': (160 - $(this).width()) / 2
			})
		});
	} */
});
