// Data Source
const allData = [
  {
    id: 1,
    title: "Industry & Manufacturing",
    description:
      "Ion Exchange provides complete water and wastewater treatment solutions, including desalination, reuse, and waste-to-energy, for industries, institutions, and municipalities.",
    image: "./assets/images/industry/ind-manu.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Power & Energy",
    description:
      "Ion Exchange provides complete water and wastewater treatment solutions, including desalination, reuse, and waste-to-energy, for industries, institutions, and municipalities.",
    image: "./assets/images/industry/ind-power.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Food & Beverage",
    description:
      "Ion Exchange provides complete water and wastewater treatment solutions, including desalination, reuse, and waste-to-energy, for industries, institutions, and municipalities.",
    image: "./assets/images/industry/ind-food.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Hospitality & Institutions",
    description:
      "Ion Exchange provides complete water and wastewater treatment solutions, including desalination, reuse, and waste-to-energy, for industries, institutions, and municipalities.",
    image: "./assets/images/industry/ind-Municipal.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Pharma & Life Sciences",
    description:
      "Ion Exchange provides complete water and wastewater treatment solutions, including desalination, reuse, and waste-to-energy, for industries, institutions, and municipalities.",
    image: "./assets/images/industry/ind-food.jpg",
    link: "#",
  },
];

let currentCards = [...allData];
let isPaused = false;
let isAnimating = false;
let autoPlayInterval;
const container = document.getElementById("slider-container");
const statusIndicator = document.getElementById("status-indicator");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function getVisibleCount() {
  const width = window.innerWidth;
  if (width < 768) return 1; // Mobile
  if (width < 1024) return 2; // Tablet
  return 4; // Desktop
}

function render() {
  const visibleCount = getVisibleCount();
  const visibleCards = currentCards.slice(0, visibleCount);
  container.innerHTML = "";
  visibleCards.forEach((card, index) => {
    const isActive = index === 0;
    const cardEl = document.createElement("div");
    cardEl.id = `card-${card.id}`;
    // Semantic Class Names
    cardEl.className = isActive ? "card active" : "card";
    // Inline View Transition Name (Required for API)
    cardEl.style.viewTransitionName = `card-${card.id}`;
    cardEl.onclick = () => {
      if (!isActive && !isAnimating) {
        rotateForward();
      }
    };
    // The gradient overlay class depends on active state
    const overlayClass = isActive ? "active-gradient" : "inactive-gradient";
    cardEl.innerHTML = `
                    <div class="card-bg-wrap">
                        <img 
                            src="${card.image}" 
                            alt="${card.title}" 
                            class="card-img"
                            loading="lazy"
                        />
                        <div class="card-overlay ${overlayClass}"></div>
                    </div>

                    <div class="card-content">
                        <div class="content-wrapper">
                            
                            <h2 class="card-title">
                                ${card.title}
                            </h2>

                            <div class="expanded-content">
                                <div class="text-anim delay-100">
                                    <p class="card-desc">
                                        ${card.description}
                                    </p>
                                </div>
                                <div class="text-anim delay-200">
                                    <a href="${card.link}" class="card-link">
                                        Learn More <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
                                    </a>
                                </div>
                            </div>

                            <div class="collapsed-indicator"></div>
                        </div>
                    </div>
                `;
    container.appendChild(cardEl);
  });
  lucide.createIcons();
//   updateStatus();
}
// View Transition Logic
function updateView(updateFn) {
  if (isAnimating) return;
  isAnimating = true;
  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      updateFn();
      render();
    });
    transition.finished.then(() => {
      isAnimating = false;
    });
  } else {
    updateFn();
    render();
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }
}

function rotateForward() {
  updateView(() => {
    const first = currentCards.shift();
    currentCards.push(first);
  });
  resetAutoPlay();
}

function rotateBackward() {
  updateView(() => {
    const last = currentCards.pop();
    currentCards.unshift(last);
  });
  resetAutoPlay();
}

// function updateStatus() {
//   if (isPaused) {
//     statusIndicator.innerHTML = `
//                     <span class="status-paused">
//                         <i data-lucide="pause" style="width: 12px; height: 12px; vertical-align: middle;"></i> Paused
//                     </span>`;
//   } else {
//     statusIndicator.innerHTML = `
//                     <span class="status-active">
//                         <span class="ping-dot">
//                             <span class="ping-animate"></span>
//                             <span class="ping-static"></span>
//                         </span>
//                         Live
//                     </span>`;
//   }
//   lucide.createIcons();
// }

function resetAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  startAutoPlay();
}

function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => {
    if (!isPaused) rotateForward();
  }, 3500);
}
nextBtn.addEventListener("click", rotateForward);
prevBtn.addEventListener("click", rotateBackward);
container.addEventListener("mouseenter", () => {
  isPaused = true;
//   updateStatus();
});
container.addEventListener("mouseleave", () => {
  isPaused = false;
//   updateStatus();
});
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    render();
  }, 100);
});
document.addEventListener("DOMContentLoaded", () => {
  render();
  startAutoPlay();
});
