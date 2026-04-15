// ============================================================
// PLAYLISTS.JS — Melodiq
// All interactive behaviour for playlists.html
// ============================================================

'use strict';

// ============================================================
// 1. MOOD FILTER
// ============================================================
function initMoodFilter() {
  const filterBtns = document.querySelectorAll('.filter-bar__btn');
  const cards = document.querySelectorAll('#playlist-grid .playlist-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mood = btn.dataset.mood;
      let visible = 0;

      cards.forEach(card => {
        const matches = mood === 'all' || card.dataset.mood === mood;
        if (matches) {
          card.classList.remove('fade-out', 'hidden');
          card.classList.add('fade-in');
          visible++;
        } else {
          card.classList.add('fade-out');
          card.classList.remove('fade-in');
          setTimeout(() => {
            if (card.classList.contains('fade-out')) {
              card.classList.add('hidden');
            }
          }, 250);
        }
      });

      updateCount(visible);
    });
  });
}

// ============================================================
// 2. SEARCH FILTER
// ============================================================
function initSearch() {
  const searchInput = document.getElementById('playlist-search');
  if (!searchInput) return;

  searchInput.addEventListener('keyup', () => {
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll('#playlist-grid .playlist-card');
    let visible = 0;

    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const matches = name.includes(query);
      if (matches) {
        card.classList.remove('fade-out', 'hidden');
        card.classList.add('fade-in');
        visible++;
      } else {
        card.classList.add('fade-out');
        card.classList.remove('fade-in');
        setTimeout(() => {
          if (card.classList.contains('fade-out')) {
            card.classList.add('hidden');
          }
        }, 250);
      }
    });

    updateCount(visible);
  });
}

// ============================================================
// 3. SORT
// ============================================================
function initSort() {
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', () => {
    const grid = document.getElementById('playlist-grid');
    const cards = Array.from(grid.querySelectorAll('.playlist-card'));

    cards.sort((a, b) => {
      const val = sortSelect.value;
      if (val === 'az') {
        return (a.dataset.name || '').localeCompare(b.dataset.name || '');
      }
      if (val === 'popular') {
        return parseInt(b.dataset.songs || 0) - parseInt(a.dataset.songs || 0);
      }
      if (val === 'duration') {
        return parseInt(b.dataset.duration || 0) - parseInt(a.dataset.duration || 0);
      }
      return 0;
    });

    // Re-append in sorted order
    cards.forEach(card => grid.appendChild(card));
  });
}

// ============================================================
// 4. DRAG TO REORDER
// ============================================================
function initDragReorder() {
  const grid = document.getElementById('playlist-grid');
  if (!grid) return;

  let dragSrc = null;

  function onDragStart(e) {
    dragSrc = this;
    this.classList.add('is-dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
  }

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
  }

  function onDragLeave() {
    this.classList.remove('drag-over');
  }

  function onDrop(e) {
    e.stopPropagation();
    if (dragSrc !== this) {
      // Swap positions
      const allCards = Array.from(grid.querySelectorAll('.playlist-card'));
      const srcIdx = allCards.indexOf(dragSrc);
      const tgtIdx = allCards.indexOf(this);

      if (srcIdx < tgtIdx) {
        grid.insertBefore(dragSrc, this.nextSibling);
      } else {
        grid.insertBefore(dragSrc, this);
      }
    }
    this.classList.remove('drag-over');
    return false;
  }

  function onDragEnd() {
    grid.querySelectorAll('.playlist-card').forEach(card => {
      card.classList.remove('is-dragging', 'drag-over');
    });
    dragSrc = null;
  }

  function attachDragListeners() {
    grid.querySelectorAll('.playlist-card').forEach(card => {
      card.setAttribute('draggable', 'true');
      card.addEventListener('dragstart', onDragStart);
      card.addEventListener('dragover', onDragOver);
      card.addEventListener('dragleave', onDragLeave);
      card.addEventListener('drop', onDrop);
      card.addEventListener('dragend', onDragEnd);
    });
  }

  attachDragListeners();
}

// ============================================================
// 5. MODAL
// ============================================================
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay) return;

  function openModal(card) {
    // Populate modal from card data attributes
    const name = card.dataset.name || 'Untitled';
    const mood = card.dataset.mood || 'chill';
    const songs = card.dataset.songs || '0';
    const duration = card.dataset.duration || '0';

    const modalName = document.getElementById('modal-name');
    const modalMood = document.getElementById('modal-mood');
    const modalSongs = document.getElementById('modal-songs');
    const modalDuration = document.getElementById('modal-duration');
    const modalArt = document.getElementById('modal-art');

    if (modalName) modalName.textContent = name;
    if (modalMood) {
      modalMood.textContent = mood;
      modalMood.dataset.mood = mood;
    }
    if (modalSongs) modalSongs.textContent = songs;
    if (modalDuration) {
      const mins = parseInt(duration);
      modalDuration.textContent = `${Math.floor(mins / 60)}h ${mins % 60}m`;
    }

    // Copy art grid from card into modal
    if (modalArt) {
      const cardArt = card.querySelector('.playlist-card__art-grid');
      if (cardArt) {
        const clone = cardArt.cloneNode(true);
        clone.className = '';
        clone.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;width:100%;height:100%;';
        const artOverlay = clone.querySelector('.playlist-card__art-overlay');
        if (artOverlay) artOverlay.remove();
        modalArt.innerHTML = '';
        modalArt.appendChild(clone);
      }
    }

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Open on card click (not on action buttons)
  document.getElementById('playlist-grid').addEventListener('click', e => {
    const card = e.target.closest('.playlist-card');
    if (!card) return;
    // Skip if clicked on action buttons
    if (e.target.closest('.playlist-card__actions')) return;
    openModal(card);
  });

  // Close on X button
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on overlay click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Modal play all button
  const playAllBtn = document.getElementById('modal-play-all');
  if (playAllBtn) {
    playAllBtn.addEventListener('click', () => {
      playAllBtn.textContent = 'Playing...';
      setTimeout(() => { playAllBtn.textContent = 'Play All'; }, 2000);
    });
  }
}

// ============================================================
// 6. LIVE PREVIEW
// ============================================================
const MOOD_GRADIENTS = {
  happy:    'linear-gradient(135deg, #ff006e, #ff8c00)',
  chill:    'linear-gradient(135deg, #3a86ff, #00d4aa)',
  focus:    'linear-gradient(135deg, #8338ec, #3a86ff)',
  sad:      'linear-gradient(135deg, #2c3e7d, #3a86ff)',
  energy:   'linear-gradient(135deg, #ff006e, #8338ec)',
  romantic: 'linear-gradient(135deg, #c2185b, #ff006e)',
  party:    'linear-gradient(135deg, #ff8c00, #ff006e)',
  sleep:    'linear-gradient(135deg, #0d1b2a, #1a1a2e)',
};

function initLivePreview() {
  const nameInput = document.getElementById('playlist-name-input');
  const moodSelect = document.getElementById('playlist-mood-select');
  const previewName = document.getElementById('preview-name');
  const previewMood = document.getElementById('preview-mood');
  const previewArt = document.getElementById('preview-art');
  const coverOptions = document.querySelectorAll('.cover-option');

  if (!nameInput || !previewName) return;

  nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim();
    previewName.textContent = val || 'Untitled Playlist';
  });

  if (moodSelect) {
    moodSelect.addEventListener('change', () => {
      const mood = moodSelect.value;
      if (previewMood) previewMood.textContent = mood || 'Select mood';
      if (previewArt && mood && MOOD_GRADIENTS[mood]) {
        previewArt.style.background = MOOD_GRADIENTS[mood];
      }
    });
  }

  // Cover art selection
  coverOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      coverOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');

      if (previewArt) {
        const bg = window.getComputedStyle(opt).background;
        previewArt.style.background = bg;
      }
    });
  });
}

// ============================================================
// 7. VIEW TOGGLE (grid / list)
// ============================================================
function initViewToggle() {
  const gridBtn = document.getElementById('view-grid');
  const listBtn = document.getElementById('view-list');
  const grid = document.getElementById('playlist-grid');

  if (!gridBtn || !listBtn || !grid) return;

  gridBtn.addEventListener('click', () => {
    grid.classList.remove('list-view');
    grid.querySelectorAll('.playlist-card').forEach(c => c.classList.remove('playlist-card--list'));
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });

  listBtn.addEventListener('click', () => {
    grid.classList.add('list-view');
    grid.querySelectorAll('.playlist-card').forEach(c => c.classList.add('playlist-card--list'));
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });
}

// ============================================================
// HELPER — update visible count label
// ============================================================
function updateCount(n) {
  const el = document.getElementById('visible-count');
  if (el) el.textContent = n;
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initMoodFilter();
  initSearch();
  initSort();
  initDragReorder();
  initModal();
  initLivePreview();
  initViewToggle();

  // Set initial count
  const allCards = document.querySelectorAll('#playlist-grid .playlist-card');
  updateCount(allCards.length);
});
