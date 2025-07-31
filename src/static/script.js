document.querySelectorAll('.module-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.module).classList.add('active');
      });
    });