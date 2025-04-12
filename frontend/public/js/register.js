$(document).ready(function () {
  // Bắt sự kiện submit form
  $('#registrationForm').on('submit', function (e) {
    e.preventDefault(); // Chặn submit mặc định

    const formData = {
      email: $('#email').val(),
      name: $('#name').val(),
      age: $('#age').val(),
      password: $('#password').val(),
      passwordAgain: $('#passwordAgain').val()
    };

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.passwordAgain) {
      showNotification('Mật khẩu xác nhận không trùng khớp.', false);
      return;
    }

    // Gửi form bằng AJAX
    $.ajax({
      type: 'POST',
      url: '/auth/register',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(formData),
      success: function (response) {
        if (response.success) {
          // Redirect nếu đăng ký thành công
          window.location.href = '/auth/login';
        } else {
          showNotification(response.message || 'Có lỗi xảy ra!', false);
        }
      },
      error: function (xhr) {
        const msg = xhr.responseJSON?.message || 'Lỗi server. Vui lòng thử lại.';
        showNotification(msg, false);
      }
    });
  });

  // Hàm hiển thị notification
  function showNotification(message, isSuccess) {
    const icon = isSuccess ? '*' : '!';
    const timerClass = isSuccess ? 'timerSuccess' : 'timer';

    // Xóa notification cũ nếu có
    $('.notification-container').remove();

    const notificationHTML = `
      <div class="notification-container">
        <div class="notification">
          <div class="icon">${icon}</div>
          <div class="message">${message}</div>
          <div class="close-btn">×</div>
          <div class="${timerClass}"></div>
        </div>
      </div>
    `;

    $('body').append(notificationHTML);

    const $container = $('.notification-container');
    $container.css('animation', 'none');

    setTimeout(() => {
      $container.css('animation', 'slideIn 0.5s forwards, slideOut 0.5s 4.5s forwards');

      const $timer = $('.' + timerClass);
      $timer.css('animation', 'none');

      setTimeout(() => {
        $timer.css('animation', 'timer 33s linear forwards');
      }, 10);
    }, 10);

    // Bắt sự kiện nút đóng
    $('.close-btn').on('click', function (e) {
      e.stopPropagation();
      $('.notification-container').css('animation', 'slideOut 0.5s forwards');
    });
  }
});
