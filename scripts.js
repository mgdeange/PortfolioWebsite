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

function showContent() {
  const container = document.getElementById("gallery-content");
  const caption = document.getElementById("caption");
  const currentItem = images[index];
  
  // Clear the container
  container.innerHTML = '';
  
  if (currentItem.type === "img") {
    const img = document.createElement("img");
    img.src = currentItem.src;
    img.alt = "Project Image";
    img.onclick = openModal;
    container.appendChild(img);
  } else if (currentItem.type === "iframe") {
    const iframe = document.createElement("iframe");
    iframe.src = currentItem.src;
    iframe.allowFullscreen = true;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    container.appendChild(iframe);
  }
  
  caption.textContent = currentItem.caption;
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showContent();
}

function nextImage() {
  index = (index + 1) % images.length;
  showContent();
}

function openModal() {
  const currentItem = images[index];
  if (currentItem.type !== "img") return; // Only allow modal for images

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = currentItem.src;
  modal.style.display = "flex";
}

function closeModal(event) {
  if (event.target.id === "modal" || event.target.className === "modal-close") {
    document.getElementById("modal").style.display = "none";
  }
}