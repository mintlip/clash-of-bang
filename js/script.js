document.addEventListener('DOMContentLoaded', function () {
  var joinSound = new Audio('assets/audio/chiikawa-car-honk.mp3');
  joinSound.volume = 0.8;

  var joinBtn = document.querySelector('.btn2[type="submit"]');
  if (joinBtn) {
    joinBtn.addEventListener('click', function () {
      joinSound.currentTime = 0;
      joinSound.play().catch(function () {});
    });
  }

  // sakura petals
  var petalLayer = document.createElement('div');
  petalLayer.className = 'petalfx';
  document.body.appendChild(petalLayer);

  for (var i = 0; i < 12; i++) {
    var petal = document.createElement('span');
    petal.className = 'petal' + (i % 4 === 0 ? ' small' : '');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.setProperty('--size', (Math.random() * 6 + 10) + 'px');
    petal.style.setProperty('--drift', (Math.random() * 90 - 45) + 'px');
    petal.style.setProperty('--rot', (Math.random() * 90 - 45) + 'deg');
    petal.style.animationDuration = (Math.random() * 6 + 11) + 's';
    petal.style.animationDelay = (-Math.random() * 14) + 's';
    petalLayer.appendChild(petal);
  }
  
  // force trio float on mobile, matched with desktop floaty
  var trio = document.querySelector('.home7 img');

  if (trio) {
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile && !reduceMotion) {
      var startTime = null;

      function easeInOut(t) {
        return t * t * (3 - 2 * t);
      }

      function moveTrio(time) {
        if (!startTime) startTime = time;

        var duration = 4800;
        var half = duration / 2;
        var elapsed = (time - startTime) % duration;
        var t;
        var y;

        if (elapsed < half) {
          t = elapsed / half;
          y = -10 * easeInOut(t);
        } else {
          t = (elapsed - half) / half;
          y = -10 + (10 * easeInOut(t));
        }

        trio.style.setProperty('--trio-y', y.toFixed(2) + 'px');

        requestAnimationFrame(moveTrio);
      }

      requestAnimationFrame(moveTrio);
    }
  }

  // simple reveal animation
  var revealItems = document.querySelectorAll('.home3, .car1, .pop1, .abt2, .abt5, .yt1, .gal2, .reg2, .troop1, .troopintro');
  revealItems.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealItems.forEach(function (el) {
      el.classList.add('show');
    });
  }

  function movePage(nextPage) {
    var veil = document.querySelector('.pageveil');

    if (!veil) {
      veil = document.createElement('div');
      veil.className = 'pageveil';
      document.body.appendChild(veil);
    }

    requestAnimationFrame(function () {
      veil.classList.add('show');
    });

    setTimeout(function () {
      window.location.href = nextPage;
    }, 180);
  }

  document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (link.target === '_blank' || e.ctrlKey || e.metaKey) return;

      var nextPage = link.getAttribute('href');
      var currentPage = window.location.pathname.split('/').pop() || 'index.html';

      if (!nextPage || nextPage === currentPage) return;

      e.preventDefault();
      movePage(nextPage);
    });
  });

  var navbtn = document.getElementById('navbtn');
  var navmenu = document.getElementById('navmenu');

  if (navbtn && navmenu) {
    navbtn.addEventListener('click', function () {
      navmenu.classList.toggle('open');
    });

    navmenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navmenu.classList.remove('open');
      });
    });
  }

  var currentFile = window.location.pathname.split('/').pop();
  if (!currentFile) currentFile = 'index.html';

  document.querySelectorAll('.nav5 a').forEach(function (link) {
    if (link.getAttribute('href') === currentFile) {
      link.classList.add('active');
    }
  });

  var track = document.querySelector('.car4');
  var slides = document.querySelectorAll('.car5');
  var dots = document.querySelectorAll('.car10');
  var prevBtn = document.querySelector('.car7');
  var nextBtn = document.querySelector('.car8');

  if (track && slides.length > 0) {
    var currentIndex = 0;
    var autoInterval = null;

    function goToSlide(index) {
      if (index < 0) currentIndex = slides.length - 1;
      else if (index >= slides.length) currentIndex = 0;
      else currentIndex = index;

      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function startAuto() {
      autoInterval = setInterval(function () {
        goToSlide(currentIndex + 1);
      }, 3500);
    }

    function resetAuto() {
      clearInterval(autoInterval);
      startAuto();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
        resetAuto();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
        resetAuto();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goToSlide(i);
        resetAuto();
      });
    });

    goToSlide(0);
    startAuto();
  }

  document.querySelectorAll('.troop1').forEach(function (card) {
    var img = card.querySelector('.troop5');
    var normalSrc = card.dataset.normal;
    var hoveredSrc = card.dataset.hovered;

    if (img && hoveredSrc) {
      card.addEventListener('mouseenter', function () {
        img.src = hoveredSrc;
      });

      card.addEventListener('mouseleave', function () {
        img.src = normalSrc;
        card.classList.remove('stats-open');
      });
    }

    card.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        card.classList.toggle('stats-open');
        if (img && hoveredSrc) {
          img.src = card.classList.contains('stats-open') ? hoveredSrc : normalSrc;
        }
      }
    });
  });

  var form = document.getElementById('form1');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;

      function setError(fieldEl, errEl, show) {
        if (show) {
          if (fieldEl) fieldEl.classList.add('invalid');
          if (errEl) errEl.classList.add('visible');
          allValid = false;
        } else {
          if (fieldEl) fieldEl.classList.remove('invalid');
          if (errEl) errEl.classList.remove('visible');
        }
      }

      document.querySelectorAll('.err1').forEach(function (el) {
        el.classList.remove('visible');
      });

      document.querySelectorAll('.inp1, .inp2, .inp3').forEach(function (el) {
        el.classList.remove('invalid');
      });

      var username = document.getElementById('username');
      var usernameErr = document.getElementById('errUsername');
      var usernameVal = username ? username.value.trim() : '';
      setError(username, usernameErr, !usernameVal || usernameVal.length < 3);

      var email = document.getElementById('email');
      var emailErr = document.getElementById('errEmail');
      var emailVal = email ? email.value.trim() : '';
      var emailBad = !emailVal || emailVal.indexOf('@') === -1 || emailVal.indexOf('.') === -1;
      setError(email, emailErr, emailBad);

      var age = document.getElementById('age');
      var ageErr = document.getElementById('errAge');
      var ageNum = age ? parseInt(age.value, 10) : NaN;
      var ageBad = !age || !age.value || isNaN(ageNum) || ageNum < 13 || ageNum > 60;
      setError(age, ageErr, ageBad);

      var genderInputs = document.querySelectorAll('input[name="gender"]');
      var genderErr = document.getElementById('errGender');
      var genderChecked = false;

      genderInputs.forEach(function (input) {
        if (input.checked) genderChecked = true;
      });

      setError(null, genderErr, !genderChecked);

      var troop = document.getElementById('troop');
      var troopErr = document.getElementById('errTroop');
      setError(troop, troopErr, !troop || !troop.value);

      var reason = document.getElementById('reason');
      var reasonErr = document.getElementById('errReason');
      var reasonVal = reason ? reason.value.trim() : '';
      setError(reason, reasonErr, !reasonVal || reasonVal.length < 10);

      var successMsg = document.getElementById('okMsg');

      if (allValid) {
        if (successMsg) successMsg.classList.add('visible');
        form.reset();
        if (successMsg) successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        if (successMsg) successMsg.classList.remove('visible');
        var firstErr = form.querySelector('.err1.visible');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
});
