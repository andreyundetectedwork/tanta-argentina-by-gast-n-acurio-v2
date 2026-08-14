/**
 * TANTA ARGENTINA - Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {

  // Set current year in footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Toggle
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeNavBtn = document.getElementById('closeNavBtn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileNav() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burgerBtn) burgerBtn.addEventListener('click', openMobileNav);
  if (closeNavBtn) closeNavBtn.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Sticky Header Effect on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      header.style.backgroundColor = 'rgba(18, 13, 10, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'rgba(18, 13, 10, 0.85)';
    }
  });

  // Menu Filter Tabs & Search Functionality
  const tabBtns = document.querySelectorAll('.tab-btn');
  const categoryBlocks = document.querySelectorAll('.menu-category-block');
  const searchInput = document.getElementById('menuSearch');

  function filterMenu() {
    const activeCategory = document.querySelector('.tab-btn.active')?.dataset.category || 'all';
    const searchQuery = searchInput?.value.toLowerCase().trim() || '';

    categoryBlocks.forEach(block => {
      const blockCat = block.dataset.cat;
      const matchesCategory = (activeCategory === 'all' || activeCategory === blockCat);

      const items = block.querySelectorAll('.menu-item-card');
      let visibleItemsCount = 0;

      items.forEach(item => {
        const title = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
        const desc = item.querySelector('.item-desc')?.textContent.toLowerCase() || '';
        const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          item.style.display = 'flex';
          visibleItemsCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (visibleItemsCount > 0) {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterMenu();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterMenu);
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});