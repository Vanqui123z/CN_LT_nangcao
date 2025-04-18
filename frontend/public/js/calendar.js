let overall = null;

function openEventModal() {
  const el = overall;
  const date = el.getAttribute('data-date');
  console.log("Ngày được chọn:", date);

  // Gán giá trị cho cả 2 input ngày (1 cái hidden, 1 cái hiển thị nhưng disabled)
  document.getElementById('eventDate').value = date;

  // Đóng modal danh sách nếu đang mở
  const listModalEl = document.getElementById('eventListModal');
  const listModal = bootstrap.Modal.getInstance(listModalEl);
  if (listModal) {
    listModal.hide();
  }

  // Đợi modal danh sách đóng rồi mới mở modal tạo mới
  setTimeout(() => {
    const createModal = new bootstrap.Modal(document.getElementById('eventModal'));
    createModal.show();
  }, 300); // Delay để tránh xung đột modal
}


function openEventListModal(el, eventList) {
  console.log(eventList)
  overall = el;
  const modalTitle = document.querySelector('.modal-title');
  const dateStr = el.getAttribute('data-date'); // yyyy-mm-dd
  modalTitle.textContent = `Sự kiện trong ngày ${dateStr}`;

  const eventListContainer = document.getElementById("eventListContainer");
  eventListContainer.innerHTML = ""; // reset

  // Parse ngày đang chọn để so sánh
  const selectedDate = new Date(dateStr);
  // Lọc lại các sự kiện đúng ngày
  const events = eventList.filter(event => {
    const evDate = new Date(event.startTime);
    return (
      evDate.getFullYear() === selectedDate.getFullYear() &&
      evDate.getMonth() === selectedDate.getMonth() &&
      evDate.getDate() === selectedDate.getDate()
    );
  });

  // Hiển thị kết quả
  if (events.length === 0) {
    eventListContainer.innerHTML = "<p>Không có sự kiện nào trong ngày này.</p>";
  } else {
    events.forEach(event => {
      const eventEl = document.createElement("div");
      eventEl.classList.add("mb-2", "p-2", "border", "rounded");
      eventEl.setAttribute("data-event-id", event.id);
      const eventStr = JSON.stringify(event).replace(/"/g, '&quot;');

      // Phần hiển thị nội dung chính (title, time, buttons)
      const titleEl = document.createElement("div");
      titleEl.innerHTML = `
          <div><strong>${event.title}</strong></div>
          <div>${new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div class="mt-1">
              <button class="btn btn-sm btn-warning me-2" onclick="editEvent('${event.id}',${eventStr})">Sửa</button>
              <button class="btn btn-sm btn-danger" onclick="deleteEvent('${event.id}')">Xoá</button>
          </div>
        `;

      // Phần mô tả (ẩn ban đầu)
      const descriptionEl = document.createElement("div");
      descriptionEl.style.display = "none";
      descriptionEl.style.minWidth = "200px";
      descriptionEl.style.marginLeft = "1rem";
      descriptionEl.textContent = event.description;

      // Tạo wrapper chứa cả title + description theo hàng ngang
      const contentWrapper = document.createElement("div");
      contentWrapper.classList.add("d-flex", "justify-content-between", "align-items-start");
      contentWrapper.appendChild(titleEl);
      contentWrapper.appendChild(descriptionEl);

      // Toggle mô tả khi click (trừ khi click vào nút)
      eventEl.addEventListener("click", (e) => {
        if (e.target.tagName !== 'BUTTON') {
          descriptionEl.style.display = descriptionEl.style.display === "none" ? "block" : "none";
        }
      });

      // Thêm vào event box
      eventEl.appendChild(contentWrapper);
      eventListContainer.appendChild(eventEl);
    });

  }

  new bootstrap.Modal(document.getElementById("eventListModal")).show();
}




function deleteEvent(id) {
  if (confirm("Bạn thật sự muốn xóa!")) {
    fetch(`/event/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Cập nhật thất bại!");
        return res.json();
      })
      .then(data => {
        alert("Đã xóa sự kiện");
        // Xoá phần tử tương ứng trên giao diện
        const eventEl = document.querySelector(`[data-event-id="${id}"]`);
        if (eventEl) eventEl.remove();
      })
      .catch(err => {
        console.error(err);
        alert("Có lỗi xảy ra");
      });
  }
}



function editEvent(id, event) {
  console.log(event)
  // Đổi nội dung modal
  document.querySelector('#eventModal .modal-title').textContent = "Chỉnh sửa sự kiện";
  document.getElementById('submitButton').textContent = "Lưu thay đổi";
  // Điền dữ liệu vào form
  document.getElementById('titleInput').value = event.title;
  document.getElementById('descriptionInput').value = event.description;
  document.getElementById('eventDate').value = event.startTime.slice(0, 10);
   document.getElementById('startTimeInput').value = event.startTime.slice(11, 16);
  document.getElementById('endTimeInput').value = event.endTime.slice(11, 16);
  // Cập nhật action cho form
  const form = document.getElementById('eventForm');
  form.action = `/event/update/${event.id}`;
  form.setAttribute('data-mode', 'edit');
  new bootstrap.Modal(document.getElementById("eventModal")).show();




  document.getElementById("eventForm").addEventListener("submit", e => {
    e.preventDefault();
    // fetch api
    if (confirm("Bạn muốn sửa dữ liệu ?")) {


      const updatedEvent = {
        title: document.getElementById('titleInput').value,
        description: document.getElementById('descriptionInput').value,
        startTime: `${document.getElementById('eventDate').value}T${document.getElementById('startTimeInput').value}:00.000Z`,
        endTime: `${document.getElementById('eventDate').value}T${document.getElementById('endTimeInput').value}:00.000Z`
      };


      fetch(`/event/update/${id}`, {
        method: "PUT", headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEvent)

      })
        .then(res => {
          if (!res.ok) { throw new Error("Cập nhật thất bại!") }
          return res.json()
        })
        .then(data => {
          alert("Đã cập nhật thành công!");
          location.reload();
        })
        .catch(err => {
          console.log("có bug");
          alert("error")
        })
    }
  })


  // Reset modal sau khi đóng
  document.getElementById('eventModal').addEventListener('hidden.bs.modal', () => {
    const form = document.getElementById('eventForm');
    form.reset();
    form.action = "/event/create";
    form.setAttribute('data-mode', 'create');
    document.querySelector('#eventModal .modal-title').textContent = "Tạo sự kiện";
    document.getElementById('submitButton').textContent = "Xác nhận";

  });


}



// Loại bỏ backdrop nếu còn sót lại
document.addEventListener('hidden.bs.modal', function (event) {

  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach((backdrop) => backdrop.remove());

  // Xoá lớp mở modal trên body nếu còn
  document.body.classList.remove('modal-open');
  document.body.style = ''; // reset overflow: hidden
}, true);
