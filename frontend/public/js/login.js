$(document).ready(function () {
    const $container = $('.notification-container');
    const $timer = $('.timer');

    function resetAnimation() {
        $container.css('animation', 'none');
        $timer.css('animation', 'none');

        setTimeout(() => {
            $container.css('animation', 'slideIn 0.5s forwards, slideOut 0.5s 4.5s forwards');
            $timer.css('animation', 'timer 5s linear forwards');
        }, 10);
    }

    // Khởi tạo animation khi trang tải
    resetAnimation();

    // Click vào body để khởi động lại animation
    $('body').on('click', function () {
        resetAnimation();
    });

    // Đóng thông báo
    $('.close-btn').on('click', function (e) {
        e.stopPropagation();
        $container.css('animation', 'slideOut 0.5s forwards');
    });

    // Hàm hiển thị thông báo với nội dung tùy chỉnh
    window.showNotification = function (message) {
        $container.find('span').first().text(message);
        resetAnimation();
    };
});
