const buttons = document.querySelectorAll('.expand-button');
let openButton = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (openButton && openButton !== button) {
      openButton.classList.add('collapsed');
    }

    if (button.classList.contains('collapsed')) {
      button.classList.remove('collapsed');
      openButton = button;
    } else {
      button.classList.add('collapsed');
      openButton = null;
    }
  });
});

function loadProject(projectPage) {
  const frame = window.parent.frames["contentFrame"];
  if (frame && projectPage) {
    frame.location.href = projectPage;
  } else {
    console.warn("Could not load project:", projectPage);
  }
}

function showImage() {
  const img = document.getElementById("gallery-img");
  const caption = document.getElementById("caption");
  img.src = images[index].src;
  caption.textContent = images[index].caption;
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function openModal() {
  if (images[index].type !== "img") return; // Only allow modal for images

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = images[index].src;
  modal.style.display = "flex";
}

function closeModal(event) {
  if (event.target.id === "modal" || event.target.className === "modal-close") {
    document.getElementById("modal").style.display = "none";
  }
}
