$(function () {
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

	$('button.basket').click(function () {
		$('.popup-desk').addClass('active');
		$('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
		$('.basket').html(6);
	});

	$('.popup-desk').click(function (e) {
		if (e.target == this) {
			$(this).removeClass('active');
			$('.popup').empty();
			$('.basket').html(5);
		}
	});

	$(document).on('click', '.register', function (e) {
		e.preventDefault();
		if ($('.basket').html() == 6) {
			$('.popup').html('<p class="popup-header">Личный кабинет закрыт на ремонт.<br>Регистрации не будет до 1 января.</p><a href="https://yandex.ru/" class="register">Назад</a>');
			$('.basket').html(5);
		} else {
			$('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
			$('.basket').html(6);
		}
	});

	$(document).on('click', '.order .del > div', function () {
		tovarDelete(this);
	});

	$(document).on('input', '.order .num > input', function () {
		tovarChange(this);
	});

	$('#date').click(function () {
		if ($('#date').val()) {
			selected_day = makeSelectedDate($('#date').val());
			makePopup(selected_day.getFullYear(), selected_day.getMonth());
		} else {
			makePopup(TODAY.getFullYear(), TODAY.getMonth());
		}
	});

	$('#date').mask('00-00-0000');

	$('#orderdata').on('submit', function (e) {// отправка формы
		e.preventDefault();
		orderAction();
	})
});